import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Star, ChevronRight, Home as HomeIcon, User, Plus, Bell, Search, Camera } from 'lucide-react';

// 1. نظام التخزين المحلي (LocalStorage)
const storage = {
  get: (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// 2. البيانات الأولية للتطبيق
const INITIAL_DATA = {
  userProfile: {
    name: 'أحمد يامي',
    username: 'aamr1003',
    bio: 'نجم صاعد في سماء ويكو ستار ✨',
    avatar: 'https://picsum.photos/seed/me/200',
    followers: '45.2K',
    following: '124',
    likes: '1.2M',
    birthDate: '1999/8/9',
    phone: '050 47+++++'
  },
  posts: [
    { id: 1, user: 'أحمد_يامي', avatar: 'https://picsum.photos/seed/u1/100', description: 'أفضل لحظات اليوم! ✨ #ويكو_ستار', likes: 1200, comments: 45, isLiked: false, isFollowed: false },
    { id: 2, user: 'Wiko_User', avatar: 'https://picsum.photos/seed/u2/100', description: 'مرحباً بكم في عالمي 🌟', likes: 850, comments: 12, isLiked: false, isFollowed: false },
  ]
};

// 3. المكونات الفرعية (UI Components)
const Splash = () => (
  <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[5000]">
    <div className="w-32 h-32 border-4 border-yellow-500 rounded-[40px] flex items-center justify-center bg-yellow-500/10">
      <div className="text-yellow-500"><Camera size={64} fill="currentColor" /></div>
    </div>
    <div className="mt-8 text-yellow-500 font-black text-2xl uppercase tracking-widest">ويكو ستار</div>
  </div>
);

const Home = ({ posts, onLike, onFollow }) => (
  <div className="h-full overflow-y-auto snap-y snap-mandatory bg-black">
     <header className="absolute top-0 w-full z-10 p-4 flex justify-between items-center bg-transparent">
        <Search className="text-white" />
        <b className="text-yellow-500 text-xl font-black">ويكو ستار</b>
        <div className="bg-yellow-500 p-1 rounded-md text-black"><Camera size={20} /></div>
     </header>
    {posts.map((post) => (
      <div key={post.id} className="h-full w-full snap-start relative flex items-center justify-center border-b border-white/5">
        <img src={`https://picsum.photos/seed/wiko${post.id}/1080/1920`} className="w-full h-full object-cover opacity-60" alt="post" />
        <div className="absolute bottom-24 right-4 flex flex-col gap-6 items-center">
           <div className="flex flex-col items-center">
              <button onClick={() => onLike(post.id)} className={post.isLiked ? 'text-red-500' : 'text-white'}>
                <Heart size={35} fill={post.isLiked ? "currentColor" : "none"} />
              </button>
              <span className="text-xs mt-1">{post.likes}</span>
           </div>
           <MessageCircle size={35} className="text-white" />
           <button onClick={() => onFollow(post.user)} className={post.isFollowed ? 'text-yellow-500' : 'text-white'}>
              <Plus size={30} className="bg-yellow-500 text-black rounded-full p-1" />
           </button>
        </div>
        <div className="absolute bottom-24 left-4 text-right">
          <h3 className="font-bold">@{post.user}</h3>
          <p className="text-sm text-zinc-300">{post.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const Chat = () => (
  <div className="p-6 pt-12">
    <h2 className="text-2xl font-black mb-6 text-yellow-500">قسم الدردشة</h2>
    <div className="space-y-4">
      <div className="p-4 bg-zinc-900 rounded-2xl flex justify-between"><span>دردشة جديدة</span><Plus /></div>
      <div className="p-4 bg-zinc-900 rounded-2xl flex justify-between"><span>إدارة الدردشات</span><ChevronRight className="rotate-180" /></div>
      <div className="p-4 bg-zinc-900 rounded-2xl flex justify-between"><span>إدارة الصداقات</span><User /></div>
    </div>
  </div>
);

const Notifications = () => (
  <div className="p-6 pt-12">
    <h2 className="text-2xl font-black mb-6 text-yellow-500">الإشعارات</h2>
    <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl text-center">
      <Bell className="mx-auto text-yellow-500 mb-3" size={40} />
      <p className="font-bold">🔔 لا تدع أي لقطة تفوتك!</p>
      <p className="text-sm text-zinc-400 mt-2">المس لتمكين الإشعارات</p>
    </div>
  </div>
);

const Profile = ({ userProfile }) => (
  <div className="h-full overflow-y-auto pb-24">
    <div className="p-8 text-center space-y-6">
      <div className="w-32 h-32 rounded-[40px] border-4 border-yellow-500 mx-auto overflow-hidden">
        <img src={userProfile.avatar} className="w-full h-full object-cover" alt="avatar" />
      </div>
      <div>
        <h2 className="text-3xl font-black">{userProfile.name}</h2>
        <p className="text-yellow-500">@{userProfile.username}</p>
      </div>
      <div className="flex justify-center gap-8 py-4 border-y border-white/5">
        <div><div className="text-xl font-black">{userProfile.followers}</div><div className="text-xs text-zinc-500">متابع</div></div>
        <div><div className="text-xl font-black">{userProfile.likes}</div><div className="text-xs text-zinc-500">إعجاب</div></div>
      </div>
    </div>
    <div className="px-6 space-y-2">
       <div className="flex justify-between p-4 bg-zinc-900/50 rounded-xl"><span>تاريخ الميلاد</span><span className="text-zinc-500">{userProfile.birthDate}</span></div>
       <div className="flex justify-between p-4 bg-zinc-900/50 rounded-xl"><span>رقم الهاتف</span><span className="text-zinc-500">{userProfile.phone}</span></div>
       <div className="flex justify-between p-4 bg-zinc-900/50 rounded-xl text-red-500 font-bold mt-4"><span>تسجيل الخروج</span></div>
    </div>
  </div>
);

// 4. المكون الرئيسي (Main App)
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState(INITIAL_DATA.posts);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // شاشة التحميل لمدة ثانيتين
  }, []);

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleFollow = (username) => {
    setPosts(posts.map(p => p.user === username ? { ...p, isFollowed: !p.isFollowed } : p));
  };

  if (loading) return <Splash />;

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden" dir="rtl">
      
      {/* محتوى الصفحة النشطة */}
      <main className="flex-1 relative">
        {activeTab === 'home' && <Home posts={posts} onLike={handleLike} onFollow={handleFollow} />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'add' && <div className="p-10 text-center">شاشة إضافة منشور جديد</div>}
        {activeTab === 'notifications' && <Notifications />}
        {activeTab === 'profile' && <Profile userProfile={INITIAL_DATA.userProfile} />}
      </main>

      {/* شريط التنقل السفلي - 5 أزرار */}
      <nav className="h-20 bg-black border-t border-white/10 flex justify-around items-center z-50">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-yellow-500' : 'text-zinc-500'}>
          <HomeIcon size={28} />
        </button>
        <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'text-yellow-500' : 'text-zinc-500'}>
          <MessageCircle size={28} />
        </button>
        <button onClick={() => setActiveTab('add')} className="bg-yellow-500 text-black p-3 rounded-2xl mb-10 shadow-lg shadow-yellow-500/20">
          <Plus size={32} strokeWidth={3} />
        </button>
        <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'text-yellow-500' : 'text-zinc-500'}>
          <Bell size={28} />
        </button>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'text-yellow-500' : 'text-zinc-500'}>
          <User size={28} />
        </button>
      </nav>
    </div>
  );
}
