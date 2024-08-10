import db from '@/lib/fireStore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const sendMessage = async (roomId: string, message: string, sender: string): Promise<void> => {
  await addDoc(collection(db, 'chats', roomId, 'messages'), {
    text: message,
    sender,
    timestamp: serverTimestamp(),
  });
};
