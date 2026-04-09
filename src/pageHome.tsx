import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Loader2 } from 'lucide-react';
import { db, collection, onSnapshot, orderBy, query, limit } from '../firebase';

const VideoPost = ({ post }: any) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [liked, setLiked] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);

    // تشغيل الفيديو عند الظهور فقط لتقليل استهلاك البيانات
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), { threshold: 0.7 });
        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            isIntersecting ? videoRef.current.play().catch(() => {}) : videoRef.current.pause();
        }
    }, [isIntersecting]);

    return (
        <div className="h-screen w-full snap-start relative bg-black flex items-center justify-center overflow-hidden">
            {post.mediaType === 'video' ? (
                <video 
                    ref={videoRef} 
                    src={post.imageUrl} 
                    className="w-full h-full object-contain" 
                    loop 
                    muted 
                    playsInline 
                />
            ) : (
                <img src={post.imageUrl} className="w-full h-full object-contain" alt="Post" />
            )}

            {/* أزرار التفاعل الجانبية - تم إصلاحها */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-20">
                <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1">
                    <Heart size={35} fill={liked ? "#FF0050" : "none"} color={liked ? "#FF0050" : "white"} />
                    <span className="text-white text-xs font-bold">إعجاب</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                    <MessageCircle size={35} color="white" />
                    <span className="text-white text-xs font-bold">تعليق</span>
                </button>
                <button onClick={() => navigator.share?.({url: post.imageUrl})} className="flex flex-col items-center gap-1">
                    <Share2 size={35} color="white" />
                    <span className="text-white text-xs font-bold">مشاركة</span>
                </button>
            </div>

            {/* تفاصيل الناشر */}
            <div className="absolute bottom-10 left-4 right-16 z-10 text-right" dir="rtl">
                <span className="font-bold text-lg text-white block mb-1">@{post.user}</span>
                <p className="text-sm text-zinc-200 line-clamp-2">{post.text}</p>
            </div>
        </div>
    );
};

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(15));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (error) => {
            console.error("خطأ في جلب البيانات:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
            <Loader2 className="animate-spin text-yellow-500 mb-2" size={40} />
            <span className="text-white text-sm">جاري التحميل...</span>
        </div>
    );

    return (
        <div className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar bg-black">
            {posts.length > 0 ? (
                posts.map(post => <VideoPost key={post.id} post={post} />)
            ) : (
                <div className="h-full flex items-center justify-center text-white">لا توجد فيديوهات حالياً</div>
            )}
        </div>
    );
};
export default Home;
