import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../store/AuthContext';
import './Navbar.css';

const Navbar = props => {
    const AuthCtx = useContext(AuthContext);

    const history = useHistory();

    const logoutHandler = () => {
        AuthCtx.logout();
        history.push('/');
    }

    return (
        <header>
            <h1><a href='/'>D's Blog</a></h1>
            <nav>
                <li><a href='/'>Home</a></li>
                {!AuthCtx.userState.isLogged ? (
                    <>
                        <li><a href='/login'>Log In</a></li>
                        <li><a href='/register'>Register</a></li>
                    </>
                ) : (
                    <>
                        <li><a href='newblog'>New Post</a></li>
                        <li><a href='/profile'>Profile</a></li>
                        <li onClick={logoutHandler}>Log Out</li>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Navbar;