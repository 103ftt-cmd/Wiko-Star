import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Search, PlusSquare, MessageCircle, User, Star, Shield, Play, Bell, Zap, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, onSnapshot, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';
import Profile from './pages/Profile';
import SecurityCenter from './pages/SecurityCenter';
import BlockedUsers from './pages/BlockedUsers';
import Reels from './pages/Reels';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { AppProvider, useApp } from './context/AppContext';
import StoryViewer from './components/StoryViewer';
import CommentsModal from './components/CommentsModal';

const Navigation = () => {
  const location = useLocation();
  const { notifications } = useApp();
  
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'الرئيسية' },
    { path: '/explore', icon: Search, label: 'استكشف' },
    { path: '/create', icon: PlusSquare, label: 'نشر', isCenter: true },
    { path: '/reels', icon: Play, label: 'Reels' },
    { path: '/profile', icon: User, label: 'الملف الشخصي' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-4 py-2 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        if (item.isCenter) {
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 -mt-8"
            >
              <div className="bg-primary text-black p-4 rounded-2xl shadow-lg shadow-primary/20 border-4 border-black">
                <item.icon size={28} />
              </div>
              <span className="text-[10px] font-bold text-primary mt-1">{item.label}</span>
            </Link>
          );
        }
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              isActive ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            <item.icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const Home = () => {
  const { stories, trendingPosts, user } = useApp();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const unsubscribes = trendingPosts.map(post => {
      return onSnapshot(doc(db, 'posts', post.id, 'likes', auth.currentUser!.uid), (doc) => {
        setLikedPosts(prev => ({ ...prev, [post.id]: doc.exists() }));
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [trendingPosts]);

  const toggleLike = async (postId: string) => {
    if (!auth.currentUser) return;
    const likeRef = doc(db, 'posts', postId, 'likes', auth.currentUser.uid);
    if (likedPosts[postId]) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, { userId: auth.currentUser.uid, timestamp: serverTimestamp() });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Stories */}
      <div className="flex gap-4 overflow-x-auto px-4 mb-8 no-scrollbar">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => setSelectedStoryIndex(index)}
            className="flex flex-col items-center gap-2 shrink-0"
          >
            <div className={`p-1 rounded-full border-2 ${story.viewed ? 'border-white/10' : 'border-primary'}`}>
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                {story.userAvatar ? (
                  <img src={story.userAvatar} className="w-full h-full rounded-full object-cover" alt="" />
                ) : (
                  <User size={32} className="text-white/20" />
                )}
              </div>
            </div>
            <span className="text-[10px] font-medium text-white/60">{story.userName}</span>
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-6 px-4">
        {trendingPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl overflow-hidden border border-white/10"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                  {post.user.avatar ? (
                    <img src={post.user.avatar} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <User size={20} className="text-white/20" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{post.user.name}</h3>
                  <p className="text-[10px] text-white/40">منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                <Zap size={12} className="text-primary fill-primary" />
                <span className="text-[10px] font-bold text-primary">ترند</span>
              </div>
            </div>

            <div className="px-4 pb-3">
              <p className="text-sm leading-relaxed text-white/90">{post.content}</p>
            </div>

            {post.image && (
              <div className="aspect-video bg-white/5 flex items-center justify-center">
                <img src={post.image} className="w-full aspect-video object-cover" alt="" />
              </div>
            )}

            <div className="p-4 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${likedPosts[post.id] ? 'text-red-500' : 'text-white/60 hover:text-white'}`}
                >
                  <Heart size={20} fill={likedPosts[post.id] ? "currentColor" : "none"} />
                  <span className="text-xs font-bold">{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                </button>
                <button 
                  onClick={() => setActiveCommentsPostId(post.id)}
                  className="flex items-center gap-2 text-white/60 hover:text-white"
                >
                  <MessageCircle size={20} />
                  <span className="text-xs font-bold">{post.comments}</span>
                </button>
              </div>
              <button className="text-white/60 hover:text-white">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedStoryIndex !== null && (
          <StoryViewer
            stories={stories}
            initialIndex={selectedStoryIndex}
            onClose={() => setSelectedStoryIndex(null)}
          />
        )}
        {activeCommentsPostId && (
          <CommentsModal
            postId={activeCommentsPostId}
            onClose={() => setActiveCommentsPostId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SecurityAlert = () => {
  const { security, dismissAlert } = useSecurity();
  const alert = security.suspiciousActivities.find(a => a.isSuspicious);

  if (!alert) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-20 left-4 right-4 z-[60] bg-red-500/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-red-400/50"
    >
      <div className="flex items-center gap-3">
        <Shield className="animate-pulse" />
        <div>
          <h4 className="font-bold text-sm">تنبيه أمني!</h4>
          <p className="text-xs opacity-90">محاولة دخول مشبوهة من {alert.location}</p>
        </div>
      </div>
      <button 
        onClick={() => dismissAlert(alert.id)}
        className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold"
      >
        تجاهل
      </button>
    </motion.div>
  );
};

const AppContent = () => {
  const { notifications } = useApp();
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <header className="fixed top-0 left-0 right-0 glass border-b border-white/10 px-4 py-3 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center">
            <Star size={14} className="text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter">WIKO STAR</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/security" className="p-2 hover:bg-white/10 rounded-full transition-colors text-primary">
            <Shield size={24} />
          </Link>
          <Link to="/notifications" className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
            <Bell size={24} />
            {notifications.length > 0 && notifications.some(n => !n.read) && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black flex items-center justify-center text-[6px] font-bold">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </Link>
          <Link to="/chat" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MessageCircle size={24} />
          </Link>
        </div>
      </header>

      <SecurityAlert />

      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<SecurityCenter />} />
          <Route path="/blocked-users" element={<BlockedUsers />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </main>

      <Navigation />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <SecurityProvider>
        <Router>
          <AppContent />
        </Router>
      </SecurityProvider>
    </AppProvider>
  );
};

export default App;
