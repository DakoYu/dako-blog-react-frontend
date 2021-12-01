import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../store/AuthContext';
import './PasswordForm.css';

const PasswordForm = () => {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmedPwd, setConfirmedPwd] = useState('');

    const authCtx = useContext(AuthContext);

    const currentPwdHandler = e => {
        setCurrentPwd(e.target.value);
    };

    const newPwdHandler = e => {
        setNewPwd(e.target.value);
    };

    const confirmedPwdHandler = e => {
        setConfirmedPwd(e.target.value);
    };

    const passwordApi = async () => {
        const res = await axios({
            method: 'PATCH',
            url: 'http://ec2-13-58-232-63.us-east-2.compute.amazonaws.com/api/user/updatepassword',
            data: {
                token: authCtx.jwtToken,
                currentPwd,
                newPwd,
                confirmedPwd
            }
        });

        if (res.data.status === 'success') {
            authCtx.setJwt(res.data.token);
        };
    };

    const updateHandler =  e => {
        passwordApi();
    }

    return (
        <form className='password' onSubmit={updateHandler}>
            <label htmlFor='currentPassword'>Current Password</label>
            <input id='currentPassword' type='password' value={currentPwd} onChange={currentPwdHandler} required/>
            <label htmlFor='newPassword'>New Password</label>
            <input id='newPassword' type='password' value={newPwd} onChange={newPwdHandler} required/>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input id='confirmPassword' type='password' value={confirmedPwd} onChange={confirmedPwdHandler} required/>
            <div className='buttons'>
                <button className='btn' type='submit'>save password</button>
            </div>
        </form>
    )
}

export default PasswordForm;
