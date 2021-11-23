import React, { useEffect, useReducer } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

const AuthContext = React.createContext({
    userState: {},
    login: (email, password) => {},
    logout: () => {},
    setJwt: token => {},
    setUserData: data => {}
});

const defaultUserState = {
    isLogged: false,
    user: {
        name: '',
        id: '',
        email: '',
        }
    };

const userReducer = (state, action) => {
    if (action.type === 'SAVE') {
        const userData = action.data;
        return {
            user: userData,
            isLogged: state.isLogged,      
        }
    }

    if (action.type === 'LOGIN') {
        return {
            isLogged: true,
            user: state.user
        }
    }

    if (action.type === 'LOGOUT') {
        return {
            isLogged: false,
            user: state.user
        }
    }

    return defaultUserState;
}

export const AuthProvider = props => {
    const [userState, dispatchUserAction] = useReducer(
        userReducer,
        defaultUserState
    );

    const cookies = new Cookies();

    const login = () => {
        dispatchUserAction({
            type: 'LOGIN'
        });
    }

    const setJwt = token => {
        cookies.set('jwt', token);
    }

    const logout = () => {
        dispatchUserAction({
            type: 'LOGOUT'
        })
        cookies.remove('jwt');
    };

    const setUserData = data => {
        const {name, _id, email} = data;
        dispatchUserAction({
            type: 'SAVE',
            data: {
                name: name,
                id: _id,
                email: email
            }
        });
    }

    const validateToken = async (token) => {
        const res = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/validate',
            data: {
                token
            }
        });

        if (res.data.status === 'success') {
            return res.data
        } else {
            return 'fail'
        }
    }

    useEffect(() => {
        const jwt = cookies.get('jwt');

        if (jwt) {
            validateToken(jwt).then((res) => {
                if (res.status === 'success') {
                    login();
                    setUserData(res.user);
                };
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            userState,
            login,
            logout,
            setJwt,
            setUserData
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;