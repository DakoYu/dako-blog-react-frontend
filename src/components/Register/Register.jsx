import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import AuthContext from '../../store/AuthContext';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmedPassword, setconfirmedPassword] = useState('');

    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const nameHandler = e => {
        setName(e.target.value);
    };

    const emailHandler = e => {
        setEmail(e.target.value);
    };

    const passwordHandler = e => {
        setpassword(e.target.value);
    };

    const confirmedPasswordHandler = e => {
        setconfirmedPassword(e.target.value);
    };

    const registerHandler = async () => {
        const res = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/signup',
            data: {
                name,
                email,
                password,
                confirmedPassword
            }
        });

        if (res.data.status === 'success') {
            return {
                status: 'success',
                token: res.data.token
            };
        }
    };

    const submitHandler = e => {
        e.preventDefault();
        
        registerHandler().then(res => {
            if(res.status === 'success'){
                authCtx.setJwt(res.token);
                history.push('/profile');
                history.go(0);
            }
        });
    }

    return (
        <section className='register'>
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Name' value={name} onChange={nameHandler} required/>
                <input type='email' placeholder='Email' value={email} onChange={emailHandler} required/>
                <input type='password' placeholder='Password' value={password} onChange={passwordHandler} min='8' required/>
                <input type='password' placeholder='ConfirmPassword' value={confirmedPassword} min='8' onChange={confirmedPasswordHandler} required/>
                <button type='submit'>CREATE</button>
                <p>Already Registered? <a href='/login'>Sign In</a></p>
            </form>
        </section>
    )
}

export default Register;