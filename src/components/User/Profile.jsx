import React from 'react';
import UpdateForm from './UpdateForm';
import PasswordForm from './PasswordForm';
import './Profile.css';

const Profile = () => {
    return (
        <section className='profile'>
            <div className='bars'>
                <nav>
                    <li><i className="fa fa-cog" aria-hidden="true"></i>settings</li>
                </nav>
            </div>
            <div className='settings'>
                <h1>account settings</h1>
                <UpdateForm />
                <hr/>
                <h1>password change</h1>
                <PasswordForm />
            </div>
        </section>
    )
}

export default Profile;