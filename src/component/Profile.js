import React from 'react'
import '../style/profile.css'
import Points from './Points'
const Profile = (props) => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-name">Aman Kumar</h1>
                <p className="profile-email">CodeBrownie@gmail.com</p>
            </div>
            <div className="profile-body">
                <div className="profile-section">
                    <h2 className="section-title">Coins Earned</h2>
                    {<Points message={props.message} />}
                </div>
            </div>
        </div>

    )
}

export default Profile