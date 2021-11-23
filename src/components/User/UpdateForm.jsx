import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../store/AuthContext';
import './UpdateForm.css';

const UpdateForm = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: ''
    });

    const [imgFile, setImgFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const nameHandler = e => {
        setProfile(prev => {
            return {...prev, name: e.target.value }
        });
    };

    const emailHandler = e => {
        setProfile(prev => {
            return {...prev, email: e.target.value }
        });
    };

    const getFileInfo = e => {
        setImgFile(e.target.files[0]);
    }

    const submitChange = async() => {
        const formData = new FormData();

        formData.append('id', authCtx.userState.user.id);
        formData.append('name', profile.name);
        formData.append('email', profile.email);

        if (imgFile) {
            formData.append('photo', imgFile);
        }

        await axios({
            method: 'PATCH',
            url: 'http://127.0.0.1:8000/api/user/updateme',
            data: formData
        });
    };

    const submitHandler = e => {
        submitChange();
    };

    useEffect(() => {
        setProfile({
            name: authCtx.userState.user.name,
            email: authCtx.userState.user.email
        });
        setLoading(true);
    }, [authCtx.userState]);

    if (!loading) {
        return <div>loading...</div>
    }

    return (
        <form className='update' onSubmit={submitHandler}>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' value={profile.name} onChange={nameHandler} required/>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' value={profile.email} onChange={emailHandler} required/>
            <div className='pictures'>
                <img 
                    className='avatar' 
                    src={`http://127.0.0.1:8000/api/user/${authCtx.userState.user.id}/img`}
                    alt='avatar'
                />
                <label className='file'>
                    <input type='file' id='photo' name='photo' accept='image/*' onChange={getFileInfo}/>
                    Choose new photo
                </label>
            </div>
            <div className='buttons'>
                <button className='btn' type='submit'>save settings</button>
            </div>
        </form>
    )
}

export default UpdateForm;