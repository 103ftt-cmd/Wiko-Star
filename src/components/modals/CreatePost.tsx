import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, collection, addDoc, serverTimestamp, storage, ref, uploadBytes, getDownloadURL } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Upload, X } from 'lucide-react';

const CreatePost = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    const handleUpload = async () => {
        if (!user || !mediaFile) return alert("يرجى اختيار فيديو أولاً");
        
        try {
            setUploading(true);
            const fileName = `videos/${user.uid}/${Date.now()}_${mediaFile.name}`;
            const mediaRef = ref(storage, fileName);
            
            const uploadTask = await uploadBytes(mediaRef, mediaFile);
            const mediaUrl = await getDownloadURL(uploadTask.ref);

            await addDoc(collection(db, 'posts'), {
                userId: user.uid,
                user: user.displayName || 'مستخدم جديد',
                imageUrl: mediaUrl,
                mediaType: 'video',
                text: description || 'بدون وصف',
                createdAt: serverTimestamp()
            });

            navigate('/'); // التنقل للصفحة الرئيسية بعد النجاح
        } catch (error) {
            console.error("خطأ أثناء النشر:", error);
            alert("فشل النشر، حاول مجدداً");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 bg-[#121212] min-h-screen flex flex-col items-center justify-start text-white" dir="rtl">
            <div className="w-full flex justify-between items-center mb-8">
                <button onClick={() => navigate(-1)}><X size={28} /></button>
                <h2 className="text-xl font-bold">نشر فيديو جديد</h2>
                <div className="w-8"></div>
            </div>

            <label className="w-full h-64 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-yellow-600 transition-colors bg-zinc-900/50">
                <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    onChange={(e) => setMediaFile(e.target.files?.[0] || null)} 
                />
                <Upload size={48} className="text-zinc-500 mb-2" />
                <p className="text-zinc-400">{mediaFile ? mediaFile.name : 'اضغط لاختيار فيديو'}</p>
            </label>

            <textarea 
                placeholder="اكتب وصفاً للفيديو..."
                className="w-full mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-600"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button 
                onClick={handleUpload} 
                disabled={uploading || !mediaFile} 
                className={`w-full mt-auto mb-10 p-4 rounded-2xl font-bold text-lg transition-all ${
                    uploading ? 'bg-zinc-700' : 'bg-yellow-500 text-black hover:bg-yellow-400'
                }`}
            >
                {uploading ? 'جاري المعالجة والنشر...' : 'نشر الآن'}
            </button>
        </div>
    );
};
export default CreatePost;
          
