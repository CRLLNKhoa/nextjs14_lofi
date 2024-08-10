"use client";
import db from '@/lib/fireStore';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface ChatMessage {
    id: string;
    text: string;
    sender: string;
    timestamp: any;
  }
  

 export const useChatMessages = (roomId: string): ChatMessage[] => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
  
    useEffect(() => {
      const q = query(
        collection(db, 'chats', roomId, 'messages'),
        orderBy('timestamp', 'asc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatMessage[];
        setMessages(messages);
      });
  
      return () => unsubscribe();
    }, [roomId]);
  
    return messages;
  };