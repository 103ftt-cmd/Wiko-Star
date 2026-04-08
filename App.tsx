import React, { useState, useEffect } from 'react';
import { 
  Home, Search, PlusSquare, MessageSquare, User, 
  Heart, MessageCircle, Share2, MoreVertical, 
  ChevronLeft, ChevronRight, Settings, Bell, 
  Shield, HelpCircle, Info, LogOut, Camera, 
  Star, Radar, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- المكونات الفرعية ---

// 1. مكون معالجة الأخطاء (ErrorBoundary)
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            console.error("Caught error:", error);
            setHasError(true);
        };
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-black text-white">
                <h1 className="text-2xl font-bold mb-4">عذراً، حدث خطأ ما</h1>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                    إعادة تحميل التطبيق
                </button>
            </div>
        );
    }
    return <>{children}</>;
};

// 2. محتوى الصفحة الرئيسية (Home)
const HomeContent = () => {
    const [liked, setLiked] = useState(false);
    return (
        <div className="flex-1 overflow-y-auto no-scrollbar snap-y snap-mandatory">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-full w-full snap-start relative bg-zinc-900">
                    <img 
                        src={`https://picsum.photos/seed/wiko${i}/1080/1920`} 
                        className="w-full h-full object-cover opacity-60"
                        alt="Video placeholder"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
                    
                    <div className="absolute bottom-24 right-4 flex flex-col items-center space-y-6 z-10">
                        <div className="flex flex-col items-center">
                            <motion.button 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => setLiked(!liked)}
                                className={`p-3 rounded-full ${liked ? 'text-red-500' : 'text-white'}`}
                            >
                                <Heart className="w-8 h-8" fill={liked ? "currentColor" : "none"} />
                            </motion.button>
                            <span className="text-xs font-bold">1.2M</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <button className="p-3 text-white">
                                <MessageCircle className="w-8 h-8" />
                            </button>
                            <span className="text-xs font-bold">45K</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <button className="p-3 text-white">
                                <Share2 className="w-8 h-8" />
                            </button>
                            <span className="text-xs font-bold">Share</span>
                        </div>
                    </div>

                    <div className="absolute bottom-24 left-4 right-20 z-10">
                        <div className="flex items-center space-x-2 mb-3 rtl:space-x-reverse">
                            <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                                <img src={`https://picsum.photos/seed/user${i}/100`} alt="Avatar" referrerPolicy="no-referrer" />
                            </div>
                            <span className="font-bold text-lg text-white drop-shadow-md">@star_user_{i}</span>
                        </div>
                        <p className="text-sm line-clamp-2 text-zinc-200 drop-shadow-sm">
                            هذا هو الفيديو الجديد الخاص بي! أتمنى أن ينال إعجابكم #ويكو_ستار #نجوم #تحدي
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// 3. صفحة الرادار (Radar)
const RadarTab = () => {
    const [isScanning, setIsScanning] = useState(true);
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent opacity-50" />
            
            <div className="relative w-72 h-72 flex items-center justify-center">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-[#D4AF37]/20 rounded-full"
                />
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-[#D4AF37]/10 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                </div>
                
                {isScanning && (
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-transparent rounded-full origin-center"
                        style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
                    />
                )}

                <AnimatePresence>
                    {isScanning && [1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: i * 0.5 }}
                            className="absolute w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden z-20 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                            style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${20 + Math.random() * 60}%`
                            }}
                        >
                            <img src={`https://picsum.photos/seed/radar${i}/100`} alt="User" referrerPolicy="no-referrer" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-12 text-center z-10">
                <h2 className="text-2xl font-black mb-2 text-gold">الرادار الاجتماعي</h2>
                <p className="text-zinc-400 text-sm max-w-xs">
                    نحن نبحث عن النجوم القريبين منك في محيط 5 كيلومترات
                </p>
                <button 
                    onClick={() => setIsScanning(!isScanning)}
                    className="mt-8 px-10 py-3 bg-[#D4AF37] text-black font-black rounded-full shadow-lg shadow-[#D4AF37]/20 active:scale-95 transition-transform"
                >
                    {isScanning ? 'إيقاف المسح' : 'بدء المسح'}
                </button>
            </div>
        </div>
    );
};

// 4. صفحة البريد (Inbox)
const InboxTab = ({ onChatOpen }: { onChatOpen: (name: string) => void }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-4">
                <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest">القصص</h3>
                <div className="flex space-x-4 overflow-x-auto no-scrollbar rtl:space-x-reverse">
                    <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-dashed border-zinc-600">
                            <PlusSquare className="w-6 h-6 text-zinc-400" />
                        </div>
                        <span className="text-[10px] font-bold">قصتك</span>
                    </div>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex flex-col items-center space-y-2 flex-shrink-0">
                            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-0.5 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                                <img src={`https://picsum.photos/seed/story${i}/100`} className="w-full h-full rounded-full object-cover" alt="Story" referrerPolicy="no-referrer" />
                            </div>
                            <span className="text-[10px] font-bold">نجم_{i}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest">الرسائل</h3>
                <div className="space-y-2">
                    {[1, 2, 3, 4].map(i => (
                        <button 
                            key={i} 
                            onClick={() => onChatOpen(`نجم_${i}`)}
                            className="w-full flex items-center p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800 transition-colors rtl:space-x-reverse space-x-4"
                        >
                            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                                <img src={`https://picsum.photos/seed/msg${i}/100`} alt="User" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 text-right">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold">نجم_{i}</span>
                                    <span className="text-[10px] text-zinc-500">12:30 م</span>
                                </div>
                                <p className="text-xs text-zinc-400 line-clamp-1">مرحباً! كيف حالك اليوم؟ هل رأيت الفيديو الجديد؟</p>
                            </div>
                            {i === 1 && <div className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_5px_rgba(212,175,55,0.8)]" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 5. صفحة الملف الشخصي (Profile)
const ProfileTab = ({ onEditOpen, onSettingsOpen }: { onEditOpen: () => void, onSettingsOpen: () => void }) => {
    return (
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
            <div className="p-6 text-center space-y-6">
                <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] p-1 mx-auto shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                        <img src="https://picsum.photos/seed/mainuser/200" className="w-full h-full rounded-full object-cover" alt="Profile" referrerPolicy="no-referrer" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center border-4 border-black text-black shadow-lg">
                        <Camera className="w-5 h-5" />
                    </button>
                </div>

                <div>
                    <h2 className="text-2xl font-black text-gold">أحمد النجم</h2>
                    <p className="text-zinc-500 text-sm">@ahmed_star_official</p>
                </div>

                <div className="flex justify-center space-x-8 rtl:space-x-reverse">
                    <div className="text-center">
                        <div className="text-xl font-black">124</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold">متابَع</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-black">45.2K</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold">متابع</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-black">1.2M</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold">إعجاب</div>
                    </div>
                </div>

                <div className="flex space-x-3 rtl:space-x-reverse">
                    <button 
                        onClick={onEditOpen}
                        className="flex-1 py-3 bg-zinc-900 rounded-xl font-bold text-sm border border-white/5"
                    >
                        تعديل الملف
                    </button>
                    <button 
                        onClick={onSettingsOpen}
                        className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/5"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-0.5 px-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                    <div key={i} className="aspect-[3/4] bg-zinc-800 relative group overflow-hidden">
                        <img src={`https://picsum.photos/seed/post${i}/400/600`} className="w-full h-full object-cover opacity-80" alt="Post" referrerPolicy="no-referrer" />
                        <div className="absolute bottom-2 left-2 flex items-center space-x-1 rtl:space-x-reverse">
                            <Heart className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-bold">12K</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 6. صفحة تعديل الملف (Edit Profile)
const EditProfilePage = ({ onClose }: { onClose: () => void }) => (
    <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="fixed inset-0 bg-black z-50 flex flex-col"
    >
        <header className="p-6 pt-12 flex items-center justify-between border-b border-white/5">
            <button onClick={onClose} className="p-2"><ChevronRight className="w-6 h-6" /></button>
            <h2 className="text-lg font-black text-gold">تعديل الملف الشخصي</h2>
            <button onClick={onClose} className="text-[#D4AF37] font-bold">حفظ</button>
        </header>
        <div className="p-6 space-y-8 overflow-y-auto">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-zinc-900 relative border-2 border-[#D4AF37] p-1 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <img src="https://picsum.photos/seed/mainuser/200" className="w-full h-full rounded-full object-cover" alt="Avatar" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6" />
                    </div>
                </div>
                <span className="text-sm text-[#D4AF37] font-bold">تغيير الصورة</span>
            </div>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">الاسم</label>
                    <input type="text" defaultValue="أحمد النجم" className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 text-sm focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">اسم المستخدم</label>
                    <input type="text" defaultValue="ahmed_star_official" className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 text-sm focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">السيرة الذاتية</label>
                    <textarea className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 text-sm h-32 focus:outline-none focus:border-[#D4AF37]" defaultValue="نجم صاعد في سماء ويكو ستار ✨ | أحب مشاركة الفيديوهات الإبداعية 🎥" />
                </div>
            </div>
        </div>
    </motion.div>
);

// 7. صفحة المحادثة (Chat)
const ChatPage = ({ userName, onClose }: { userName: string, onClose: () => void }) => {
    const [msg, setMsg] = useState('');
    return (
        <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
        >
            <header className="p-6 pt-12 flex items-center justify-between border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <button onClick={onClose} className="p-2"><ChevronRight className="w-6 h-6" /></button>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://picsum.photos/seed/chatuser/100" alt="Avatar" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                        <h2 className="font-bold text-sm">{userName}</h2>
                        <span className="text-[10px] text-green-500 font-bold">متصل الآن</span>
                    </div>
                </div>
                <button className="p-2"><MoreVertical className="w-5 h-5" /></button>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
                <div className="flex justify-end">
                    <div className="bg-[#D4AF37] text-black p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm font-bold shadow-lg">
                        مرحباً! نعم رأيته، كان رائعاً جداً 🤩
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm border border-white/5">
                        مرحباً! كيف حالك اليوم؟ هل رأيت الفيديو الجديد؟
                    </div>
                </div>
            </div>
            <div className="p-4 pb-10 bg-zinc-900/50 border-t border-white/5 flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex-1 bg-zinc-800 rounded-2xl flex items-center px-4">
                    <input 
                        type="text" 
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="اكتب رسالة..." 
                        className="flex-1 bg-transparent py-3 text-sm focus:outline-none" 
                    />
                </div>
                <button className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-lg active:scale-90 transition-transform">
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};

// 8. صفحة الإعدادات (Settings)
const SettingsPage = ({ onClose }: { onClose: () => void }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const sections = [
        { id: 'account', title: 'الحساب', icon: User, color: 'text-blue-500' },
        { id: 'privacy', title: 'الخصوصية والأمان', icon: Shield, color: 'text-green-500' },
        { id: 'notifications', title: 'التنبيهات', icon: Bell, color: 'text-[#D4AF37]' },
        { id: 'help', title: 'المساعدة والدعم', icon: HelpCircle, color: 'text-purple-500' },
        { id: 'about', title: 'عن ويكو ستار', icon: Info, color: 'text-zinc-500' },
    ];

    return (
        <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
        >
            <header className="p-6 pt-12 flex items-center justify-between border-b border-white/5">
                <button onClick={onClose} className="p-2"><ChevronRight className="w-6 h-6" /></button>
                <h2 className="text-lg font-black text-gold">الإعدادات</h2>
                <div className="w-10" />
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {sections.map(section => (
                    <button 
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl hover:bg-zinc-800 transition-colors"
                    >
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className={`w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center ${section.color}`}>
                                <section.icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-sm">{section.title}</span>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-zinc-600" />
                    </button>
                ))}
                <button className="w-full flex items-center justify-between p-4 bg-red-500/10 rounded-2xl mt-8">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm text-red-500">تسجيل الخروج</span>
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {activeSection && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed inset-0 bg-black z-[60] flex flex-col"
                    >
                        <header className="p-6 pt-12 flex items-center justify-between border-b border-white/5">
                            <button onClick={() => setActiveSection(null)} className="p-2"><ChevronRight className="w-6 h-6" /></button>
                            <h2 className="text-lg font-black">
                                {sections.find(s => s.id === activeSection)?.title}
                            </h2>
                            <div className="w-10" />
                        </header>
                        <div className="p-6 space-y-6">
                            <p className="text-zinc-500 text-center">هذا القسم قيد التطوير حالياً في نسخة النجوم.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- المكون الرئيسي للتطبيق (App) ---

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <ErrorBoundary>
            <div className="h-screen flex flex-col bg-black text-white selection:bg-[#D4AF37]/30" dir="rtl">
                {/* الهيدر (Header) */}
                <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-black/50 backdrop-blur-xl z-40 border-b border-white/5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                            <Star className="w-6 h-6 text-black" fill="currentColor" />
                        </div>
                        <h1 className="text-2xl font-black italic tracking-tighter text-white">
                            ويكو <span className="text-gold">ستار</span>
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                            <Search className="w-6 h-6" />
                        </button>
                        <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-black shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
                        </button>
                    </div>
                </header>

                {/* المحتوى الرئيسي (Main) */}
                <main className="flex-1 flex flex-col overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {activeTab === 'home' && (
                            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col h-full">
                                <HomeContent />
                            </motion.div>
                        )}
                        {activeTab === 'radar' && (
                            <motion.div key="radar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex-1 flex flex-col h-full">
                                <RadarTab />
                            </motion.div>
                        )}
                        {activeTab === 'inbox' && (
                            <motion.div key="inbox" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col h-full">
                                <InboxTab onChatOpen={setActiveChat} />
                            </motion.div>
                        )}
                        {activeTab === 'profile' && (
                            <motion.div key="profile" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex-1 flex flex-col h-full">
                                <ProfileTab onEditOpen={() => setIsEditOpen(true)} onSettingsOpen={() => setIsSettingsOpen(true)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* شريط التنقل (Navigation) */}
                <nav className="h-24 bg-zinc-900/80 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center px-4 pb-6 z-40">
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-gold' : 'text-zinc-500'}`}>
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">الرئيسية</span>
                    </button>
                    <button onClick={() => setActiveTab('radar')} className={`flex flex-col items-center space-y-1 ${activeTab === 'radar' ? 'text-gold' : 'text-zinc-500'}`}>
                        <Radar className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">رادار</span>
                    </button>
                    
                    <div className="relative -mt-12">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black shadow-[0_10px_30px_rgba(212,175,55,0.4)] border-4 border-black"
                        >
                            <PlusSquare className="w-8 h-8" />
                        </motion.button>
                    </div>

                    <button onClick={() => setActiveTab('inbox')} className={`flex flex-col items-center space-y-1 ${activeTab === 'inbox' ? 'text-gold' : 'text-zinc-500'}`}>
                        <MessageSquare className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">دردشة</span>
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center space-y-1 ${activeTab === 'profile' ? 'text-gold' : 'text-zinc-500'}`}>
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">ملفي</span>
                    </button>
                </nav>

                {/* المودال والصفحات المنبثقة */}
                <AnimatePresence>
                    {isEditOpen && <EditProfilePage onClose={() => setIsEditOpen(false)} />}
                    {isSettingsOpen && <SettingsPage onClose={() => setIsSettingsOpen(false)} />}
                    {activeChat && <ChatPage userName={activeChat} onClose={() => setActiveChat(null)} />}
                    {isSearchOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[100] p-6 pt-12">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-8">
                                <button onClick={() => setIsSearchOpen(false)} className="p-2"><ChevronRight className="w-6 h-6" /></button>
                                <div className="flex-1 bg-zinc-900 rounded-2xl flex items-center px-4 border border-white/5">
                                    <Search className="w-5 h-5 text-zinc-500" />
                                    <input autoFocus type="text" placeholder="ابحث عن النجوم..." className="flex-1 bg-transparent py-4 px-3 text-sm focus:outline-none" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-sm font-black text-zinc-500 uppercase">عمليات البحث الأخيرة</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['تحدي_الرقص', 'ويكو_ستار', 'موضة_2024', 'أحمد_النجم'].map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-zinc-900 rounded-full text-xs font-bold border border-white/5 text-gold">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* التنسيقات الخاصة (CSS) */}
                <style>{`
                    :root {
                        --gold: #D4AF37;
                        --gold-light: #F9E29C;
                        --gold-dark: #A67C00;
                    }
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    .text-gold {
                        color: var(--gold);
                        background: linear-gradient(to bottom, var(--gold-light), var(--gold), var(--gold-dark));
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                `}</style>
            </div>
        </ErrorBoundary>
    );
}
