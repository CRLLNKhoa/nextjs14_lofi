// notifications.ts
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import db from "./fireStore";

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

export const listenForNotifications = (
  callback: (notifications: Notification[]) => void
) => {
  const q = collection(db, "notifications");

  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const notifications: Notification[] = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification);
    });
    callback(notifications);
  });
};
