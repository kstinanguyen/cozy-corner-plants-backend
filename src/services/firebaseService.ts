import admin from '../config/firebaseConfig';

export const saveMotivationalPhrases = async (phrases: { id: number; phrase: string }[]) => {
  try {
    const db = admin.database();
    const ref = db.ref('motivational_phrases');

    for (const phrase of phrases) {
      await ref.child(phrase.id.toString()).set({ phrase: phrase.phrase });
    }

    console.log("Motivational phrases saved to Firebase.");
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    throw error;
  }
};

export const getMotivationalPhrases = async () => {
  try {
    const db = admin.database();
    const ref = db.ref('motivational_phrases');
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    return snapshot.val() || [];
  } catch (error) {
    console.error("Error retrieving phrases from Firebase:", error);
    return [];
  }
};

export const deleteMotivationalPhrases = async (phraseId: string) => {
  try {
    const db = admin.database();
    const ref = db.ref(`motivational_phrases/${phraseId}`);
    await ref.remove();
    return true;
  } catch (error) {
    console.error("Error deleting phrase from Firebase:", error);
    return false;
  }
};

export const cleanupFirebase = async () => {
  try {
    await admin.app().delete();
    console.log('Firebase connection closed.');
  } catch (error) {
    console.error('Error during Firebase cleanup:', error);
  }
};
