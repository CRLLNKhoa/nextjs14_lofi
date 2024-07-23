// useOnlineStatus.js
import { useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import db from '@/lib/fireStore';

const getOrCreateUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substring(2, 15); // Tạo một ID ngẫu nhiên
    localStorage.setItem('userId', userId);
  }
  return userId;
};

const useOnlineStatus = () => {
  useEffect(() => {
    const userId = getOrCreateUserId(); // Lấy hoặc tạo userId
    const userStatusDoc = doc(collection(db, 'onlineUsers'), userId);

    const setUserStatusOnline = async () => {
      try {
        await setDoc(userStatusDoc, { online: true }, { merge: true });
      } catch (error) {
        console.error('Error setting online status:', error);
      }
    };

    const setUserStatusOffline = async () => {
      try {
        await deleteDoc(userStatusDoc);
      } catch (error) {
        console.error('Error setting offline status:', error);
      }
    };

    // Đánh dấu người dùng là online khi hook được khởi tạo
    setUserStatusOnline();

    // Xóa trạng thái khi người dùng đóng trang
    window.addEventListener('beforeunload', setUserStatusOffline);

    // Xóa trạng thái khi người dùng rời khỏi trang
    return () => {
      setUserStatusOffline();
      window.removeEventListener('beforeunload', setUserStatusOffline);
    };
  }, []);

  // Hook không cần trả về gì nếu không cần thiết
};

export default useOnlineStatus;
