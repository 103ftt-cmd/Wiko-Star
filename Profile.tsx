import React from 'react';
import { INITIAL_DATA } from './constants';

const ProfilePage = () => {
  const user = INITIAL_DATA.userProfile;

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src={user.avatar} alt="Profile" style={{ borderRadius: '50%', width: '100px', border: '2px solid #ff0050' }} />
        <h2>{user.name}</h2>
        <p>@{user.username}</p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#1f1f1f', padding: '15px', borderRadius: '10px' }}>
        <div><strong>{user.followers}</strong><br/>متابع</div>
        <div><strong>{user.likes}</strong><br/>إعجاب</div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>المعلومات الشخصية</h3>
        <p>📅 تاريخ الميلاد: {user.birthDate}</p>
        <p>📞 الهاتف: {user.phone}</p>
      </div>
      
      <button style={{ width: '100%', padding: '12px', backgroundColor: '#ff0050', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px', fontWeight: 'bold' }}>
        تعديل الملف الشخصي
      </button>
    </div>
  );
};

export default ProfilePage;
