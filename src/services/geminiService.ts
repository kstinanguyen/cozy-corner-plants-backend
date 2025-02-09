import { getMotivationalPhrasesModel } from "../models/geminiModels";
import { saveMotivationalPhrases, getMotivationalPhrases } from './firebaseService';
import { getTestMotivationalPhrases } from './testData';

const PHRASE_BATCH_SIZE = 9;
const MIN_PHRASES_IN_DB = 1;

export const updateMotivationalPhrases = async () => {
  try {
    let newPhrases;

    try {
      newPhrases = await generateMotivationalPhrases();
    } catch (geminiError) {
      console.error("Error generating with Gemini:", geminiError);
      console.error("Falling back to test data.");
      newPhrases = getTestMotivationalPhrases();
    }

    await saveMotivationalPhrases(newPhrases);
  } catch (error) {
    console.error("Error updating motivational phrases:", error);
  }
};

export const generateMotivationalPhrases = async () => {
  try {
    const model = getMotivationalPhrasesModel();

    const prompt = `I am designing a browser extension called Cozy Corner Plants. Please generate ${PHRASE_BATCH_SIZE} motivational phrases a plant might say to the player when they interact with it. These phrases should be positive, uplifting, and inspiring, encouraging growth and positivity. Please return just the list of phrases in plain text format, separated by line breaks, without any numbering or extra information.`;

    const result = await model.generateContent(prompt);

    const candidates = result.response?.candidates || [];
    if (!candidates.length) {
      throw new Error("No candidates found in the response.");
    }

    const content = candidates[0]?.content?.parts?.[0]?.text || "";
    if (!content) {
      throw new Error("No content text available in the response.");
    }

    const phrases = content.split('\n').map((phrase, index) => ({
      id: index + 1,
      phrase: phrase.trim(),
    }));

    return phrases;

  } catch (error) {
    console.error("Error generating motivational phrases with Gemini:", error);
    throw error;
  };
}

const getPhrases = (phrases: { id: number; phrase: string }[], numPhrases: number) => {
  if (!phrases || phrases.length === 0) {
    return [];
  }
  const selectedPhrases = phrases.slice(0, numPhrases);
  return selectedPhrases;
};

export const getPhrasesForPlant = async (numPhrases: number) => {
  try {
    const availPhrases = await getMotivationalPhrases();

    if (!availPhrases || availPhrases.length < MIN_PHRASES_IN_DB) {
      await updateMotivationalPhrases();
      const updatedPhrases = await getMotivationalPhrases();
      if (!updatedPhrases) {
        throw new Error("Could not retrieve phrases from database after re-generation");
      }
      return getPhrases(updatedPhrases, numPhrases);
    }
    return getPhrases(availPhrases, numPhrases);
  } catch (error) {
    console.error("Error getting phrases for plant:", error);
    throw error;
  }
};

updateMotivationalPhrases();