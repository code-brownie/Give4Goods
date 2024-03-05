import React from 'react';
import '../style/profile.css';

const Profile = () => {
    // Retrieve username and email from localStorage
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-name">{username}</h1>
                <p className="profile-email">{email}</p>
            </div>
            <div className="profile-body">
                <div className="profile-section">
                    <h2 className="section-title">Coins Earned</h2>
                    {/* Your Points component can go here */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
