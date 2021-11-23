import axios from 'axios';
import { useState, useContext} from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const AuthCtx = useContext(AuthContext);

    const emailHandler = e => {
        setEmail(e.target.value);
    };

    const passwordHandler = e => {
        setPassword(e.target.value);
    };

    const url = 'http://127.0.0.1:8000/api/login';

    const authHandler = async () => {
        try {
            const res = await axios({
                method: 'POST',
                url,
                data: {
                    email,
                    password
                }
            });

            if(res.data.status === 'success') {   
                AuthCtx.setJwt(res.data.token);
                
                AuthCtx.setUserData(res.data.user);

                AuthCtx.login();
    
                history.push('/profile');
            }

        } catch (err) {
            console.log(err)
        }
    };

    const submitHandler = e => {
        e.preventDefault();
        authHandler();
    };

   


    return (
        <section className='login'>
            <form onSubmit={submitHandler}>
                <input type='email' value={email} placeholder='Email' onChange={emailHandler}/>
                <input type='password' value={password} placeholder='Password' onChange={passwordHandler}/>
                <button type='submit'>login</button>
                <p>Not Registered? <a href='/register'>Create an account</a></p>
            </form>
        </section>
    )
};

export default Login;