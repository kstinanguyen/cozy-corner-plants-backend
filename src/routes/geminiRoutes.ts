import { Router } from 'express';
import { generateMotivationalPhrases } from '../services/geminiService';
import { getMotivationalPhrases, saveMotivationalPhrases, deleteMotivationalPhrases } from '../services/firebaseService';
import { getTestMotivationalPhrases } from '../services/testData';

const router = Router();

router.post('/phrases', async (req, res) => {
  try {
    const phrases = await generateMotivationalPhrases();
    await saveMotivationalPhrases(phrases);
    res.status(200).json({ message: 'Phrases saved successfully!', phrases });
  } catch (error) {
    console.log('Error saving phrases:', error);
    res.status(500).json({ error: 'Failed to save phrases.' });
  }
});

router.get('/phrases', async (req, res) => {
  try {
    const phrases = await getMotivationalPhrases();
    res.json({ phrases });
  } catch (error) {
    console.log('Error generating phrases:', error);
    res.status(500).json({ error: 'Failed to retrieve phrases.' });
  }
});

router.delete('/phrases/:id', async (req, res) => {
  const phraseId = req.params.id;

  try {
    const deleted = await deleteMotivationalPhrases(phraseId);

    if (deleted) {
      res.status(200).json({ message: 'Phrase successfully deleted' });
    } else {
      res.status(404).json({ error: 'Phrase not found' });
    }
  } catch (error) {
    console.error('Error deleting phrase:', error);
    res.status(500).json({ error: 'Failed to delete phrase' });
  }
});

router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;
