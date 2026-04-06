import React, { useState, useEffect } from 'react';
// استيراد الأيقونات من مكتبة lucide-react
import { Heart, MessageCircle, Star, ChevronRight, Home as HomeIcon, User, Plus, Bell, Search, Camera } from 'lucide-react';

// --- نظام التنسيق المباشر (Tailwind CSS) سيتم تفعيله من خلال المتصفح ---

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

const Splash = () => (
  <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[5000]">
    <div className="w-32 h-32 border-4 border-yellow-500 rounded-[40px] flex items-center justify-center bg-yellow-500/10 animate-pulse">
      <div className="text-yellow-500"><Camera size={64} fill="currentColor" /></div>
    </div>
    <div className="mt-8 text-yellow-500 font-black text-2xl uppercase tracking-widest">ويكو ستار</div>
  </div>
);

const Home = ({ posts, onLike, onFollow }) => (
  <div className="h-full overflow-y-auto snap-y snap-mandatory bg-black scrollbar-hide">
     <header className="absolute top-0 w-full z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <Search className="text-white" />
        <b className="text-yellow-500 text-xl font-black">ويكو ستار</b>
        <div className="bg-yellow-500 p-1 rounded-md text-black shadow-lg shadow-yellow-500/30"><Camera size={20} /></div>
     </header>
    {posts.map((post) => (
      <div key={post.id} className="h-full w-full snap-start relative flex items-center justify-center bg-zinc-900 border-b border-white/5">
        <img src={`https://picsum.photos/seed/wiko${post.id}/1080/1920`} className="w-full h-full object-cover opacity-70" alt="post" />
        <div className="absolute bottom-24 right-4 flex flex-col gap-6 items-center z-20">
           <div className="flex flex-col items-center group">
              <button onClick={() => onLike(post.id)} className={`transition-transform active:scale-150 ${post.isLiked ? 'text-red-500' : 'text-white'}`}>
                <Heart size={35} fill={post.isLiked ? "currentColor" : "none"} />
              </button>
              <span className="text-xs mt-1 font-bold">{post.likes}</span>
           </div>
           <MessageCircle size={35} className="text-white hover:text-yellow-500 cursor-pointer" />
           <button onClick={() => onFollow(post.user)} className="transition-all hover:scale-110">
              <Plus size={30} className={`${post.isFollowed ? 'bg-zinc-500' : 'bg-yellow-500'} text-black rounded-full p-1`} />
           </button>
        </div>
        <div className="absolute bottom-24 left-4 right-16 text-right z-10 bg-gradient-to-r from-black/60 to-transparent p-4 rounded-l-2xl">
          <h3 className="font-bold text-lg text-yellow-500">@{post.user}</h3>
          <p className="text-sm text-zinc-100 mt-1 leading-relaxed">{post.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const Chat = () => (
  <div className="p-6 pt-12 animate-in fade-in duration-500">
    <h2 className="text-3xl font-black mb-6 text-yellow-500 text-right">قسم الدردشة</h2>
    <div className="space-y-4">
      <div className="p-5 bg-zinc-900/80 border border-white/5 rounded-2xl flex justify-between items-center hover:bg-zinc-800 transition-colors">
        <Plus className="text-yellow-500" />
        <span className="font-bold">دردشة جديدة</span>
      </div>
      <div className="p-5 bg-zinc-900/80 border border-white/5 rounded-2xl flex justify-between items-center hover:bg-zinc-800 transition-colors">
        <ChevronRight className="text-zinc-500" />
        <span className="font-bold text-right">إدارة الدردشات</span>
      </div>
      <div className="p-5 bg-zinc-900/80 border border-white/5 rounded-2xl flex justify-between items-center hover:bg-zinc-800 transition-colors">
        <User className="text-zinc-400" />
        <span className="font-bold">إدارة الصداقات</span>
      </div>
    </div>
  </div>
);

const Notifications = () => (
  <div className="p-6 pt-12 animate-in slide-in-from-bottom duration-500">
    <h2 className="text-3xl font-black mb-6 text-yellow-500 text-right">الإشعارات</h2>
    <div className="p-10 bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-[40px] text-center shadow-2xl shadow-yellow-500/5">
      <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/40">
        <Bell className="text-black" size={32} />
      </div>
      <p className="font-black text-xl">🔔 لا تدع أي لقطة تفوتك!</p>
      <p className="text-sm text-zinc-400 mt-3 leading-relaxed">فعل التنبيهات لتكون أول من يشاهد تحديثات النجوم</p>
      <button className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-full font-black hover:scale-105 transition-transform">تفعيل الآن</button>
    </div>
  </div>
);

const Profile = ({ userProfile }) => (
  <div className="h-full overflow-y-auto pb-24 scrollbar-hide animate-in fade-in duration-700">
    <div className="p-8 text-center space-y-6">
      <div className="relative inline-block group">
        <div className="w-36 h-36 rounded-[45px] border-4 border-yellow-500 mx-auto overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500">
          <img src={userProfile.avatar} className="w-full h-full object-cover" alt="avatar" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-yellow-500 p-2 rounded-2xl text-black shadow-lg">
           <Star size={20} fill="currentColor" />
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-black tracking-tight">{userProfile.name}</h2>
        <p className="text-yellow-500 font-medium mt-1">@{userProfile.username}</p>
        <p className="text-zinc-400 text-sm mt-3 px-10 italic">"{userProfile.bio}"</p>
      </div>
      <div className="flex justify-center gap-12 py-6 border-y border-white/10 bg-zinc-900/30 rounded-3xl">
        <div className="text-center"><div className="text-2xl font-black text-white">{userProfile.followers}</div><div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">متابع</div></div>
        <div className="text-center"><div className="text-2xl font-black text-white">{userProfile.likes}</div><div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">إعجاب</div></div>
      </div>
    </div>
    <div className="px-6 space-y-3">
       <div className="flex justify-between p-5 bg-zinc-900/40 rounded-2xl border border-white/5 items-center">
          <span className="text-zinc-500 font-bold">تاريخ الميلاد</span>
          <span className="text-white font-black">{userProfile.birthDate}</span>
       </div>
       <div className="flex justify-between p-5 bg-zinc-900/40 rounded-2xl border border-white/5 items-center">
          <span className="text-zinc-500 font-bold">رقم الهاتف</span>
          <span className="text-white font-black" dir="ltr">{userProfile.phone}</span>
       </div>
       <button className="w-full p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-black mt-6 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5">
          تسجيل الخروج
       </button>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState(INITIAL_DATA.posts);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleFollow = (username) => {
    setPosts(posts.map(p => p.user === username ? { ...p, isFollowed: !p.isFollowed } : p));
  };

  if (loading) return <Splash />;

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden font-sans selection:bg-yellow-500/30" dir="rtl">
      
      <main className="flex-1 relative overflow-hidden">
        {activeTab === 'home' && <Home posts={posts} onLike={handleLike} onFollow={handleFollow} />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'add' && (
          <div className="p-10 text-center h-full flex flex-col items-center justify-center animate-pulse">
            <Camera size={80} className="text-yellow-500 mb-4" />
            <p className="text-2xl font-black">جاري تجهيز الكاميرا...</p>
          </div>
        )}
        {activeTab === 'notifications' && <Notifications />}
        {activeTab === 'profile' && <Profile userProfile={INITIAL_DATA.userProfile} />}
      </main>

      {/* شريط التنقل السفلي الاحترافي */}
      <nav className="h-24 bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center z-50 px-2 pb-4">
        <button onClick={() => setActiveTab('home')} className={`p-3 transition-all ${activeTab === 'home' ? 'text-yellow-500 scale-125' : 'text-zinc-600 hover:text-zinc-400'}`}>
          <HomeIcon size={28} fill={activeTab === 'home' ? "currentColor" : "none"} />
        </button>
        <button onClick={() => setActiveTab('chat')} className={`p-3 transition-all ${activeTab === 'chat' ? 'text-yellow-500 scale-125' : 'text-zinc-600 hover:text-zinc-400'}`}>
          <MessageCircle size={28} fill={activeTab === 'chat' ? "currentColor" : "none"} />
        </button>
        
        {/* زر الإضافة المميز */}
        <button onClick={() => setActiveTab('add')} className="relative -top-5 group">
          <div className="absolute inset-0 bg-yellow-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative bg-yellow-500 text-black p-4 rounded-2xl shadow-xl shadow-yellow-500/20 transform group-hover:-translate-y-1 transition-transform border-4 border-black">
            <Plus size={35} strokeWidth={4} />
          </div>
        </button>

        <button onClick={() => setActiveTab('notifications')} className={`p-3 transition-all ${activeTab === 'notifications' ? 'text-yellow-500 scale-125' : 'text-zinc-600 hover:text-zinc-400'}`}>
          <Bell size={28} fill={activeTab === 'notifications' ? "currentColor" : "none"} />
        </button>
        <button onClick={() => setActiveTab('profile')} className={`p-3 transition-all ${activeTab === 'profile' ? 'text-yellow-500 scale-125' : 'text-zinc-600 hover:text-zinc-400'}`}>
          <User size={28} fill={activeTab === 'profile' ? "currentColor" : "none"} />
        </button>
      </nav>
    </div>
  );
}
