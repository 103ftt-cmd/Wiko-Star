import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Notification, Story, Reel, Post } from '../types';
import { db, auth } from '../firebase';
import { 
  collection, query, where, orderBy, onSnapshot, 
  addDoc, serverTimestamp, updateDoc, doc 
} from 'firebase/firestore';

interface AppContextType {
  user: UserProfile;
  notifications: Notification[];
  stories: Story[];
  reels: Reel[];
  trendingPosts: Post[];
  addXP: (amount: number, reason: string) => void;
  markNotificationRead: (id: string) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  isUserBlocked: (userId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    id: '1',
    name: 'أحمد النجم',
    username: 'ahmed_star',
    bio: 'مبدع رقمي وشغوف بالفن العربي 🎨✨',
    avatar: '',
    followers: 12500,
    following: 450,
    stars: 890,
    xp: 2450,
    level: 12,
    blockedUsers: [],
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
      })) as Notification[];
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, []);

  const [stories, setStories] = useState<Story[]>([
    { id: '1', userId: '1', userName: 'قصتك', userAvatar: user.avatar, media: '', type: 'image', createdAt: new Date().toISOString(), viewed: false },
    { id: '2', userId: '2', userName: 'سارة', userAvatar: '', media: '', type: 'image', createdAt: new Date().toISOString(), viewed: false },
    { id: '3', userId: '3', userName: 'محمد', userAvatar: '', media: '', type: 'image', createdAt: new Date().toISOString(), viewed: false },
    { id: '4', userId: '4', userName: 'ليلى', userAvatar: '', media: '', type: 'image', createdAt: new Date().toISOString(), viewed: false },
  ]);

  const [reels, setReels] = useState<Reel[]>([
    { id: '1', userId: '2', userName: 'سارة', userAvatar: '', videoUrl: '', caption: 'أجواء النيون الرائعة 🌈 #WikoStar', likes: 1200, comments: 45, shares: 12 },
    { id: '2', userId: '3', userName: 'محمد', userAvatar: '', videoUrl: '', caption: 'جمال الطبيعة في الخريف 🍂', likes: 890, comments: 22, shares: 5 },
  ]);

  const [trendingPosts, setTrendingPosts] = useState<Post[]>([
    { id: 't1', userId: '5', user: { name: 'ياسين', avatar: '' }, content: 'أول تجربة لي في التطبيق! مذهل جداً 😍', image: '', likes: 5400, comments: 120, createdAt: new Date().toISOString(), isTrending: true },
    { id: 't2', userId: '6', user: { name: 'نور', avatar: '' }, content: 'هل أنتم مستعدون للمسابقة القادمة؟ ✨', likes: 3200, comments: 88, createdAt: new Date().toISOString(), isTrending: true },
  ]);

  const blockUser = (userId: string) => {
    setUser(prev => ({
      ...prev,
      blockedUsers: [...prev.blockedUsers, userId]
    }));
  };

  const unblockUser = (userId: string) => {
    setUser(prev => ({
      ...prev,
      blockedUsers: prev.blockedUsers.filter(id => id !== userId)
    }));
  };

  const isUserBlocked = (userId: string) => {
    return user.blockedUsers.includes(userId);
  };

  const filteredStories = stories.filter(s => !isUserBlocked(s.userId));
  const filteredReels = reels.filter(r => !isUserBlocked(r.userId));
  const filteredTrendingPosts = trendingPosts.filter(p => !isUserBlocked(p.userId));
  const filteredNotifications = notifications.filter(n => !n.fromUser || !isUserBlocked(n.fromUser.name));

  const addXP = async (amount: number, reason: string) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });

    if (auth.currentUser) {
      await addDoc(collection(db, 'notifications'), {
        userId: auth.currentUser.uid,
        type: 'xp',
        message: `+${amount} XP: ${reason}`,
        timestamp: serverTimestamp(),
        read: false,
        xpAmount: amount,
      });
    }
  };

  const markNotificationRead = async (id: string) => {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      notifications: filteredNotifications, 
      stories: filteredStories, 
      reels: filteredReels, 
      trendingPosts: filteredTrendingPosts, 
      addXP, 
      markNotificationRead,
      blockUser,
      unblockUser,
      isUserBlocked
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
