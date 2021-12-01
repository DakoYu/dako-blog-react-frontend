import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import AuthContext from '../../store/AuthContext';
import './NewBlog.css';

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');

    const authCtx = useContext(AuthContext);

    const history = useHistory();

    const titleHandler = e => {
        setTitle(e.target.value);
    };

    const contextHandler = e => {
        setContext(e.target.value);
    };

    const postHandler = async() => {
        await axios({
            method: 'POST',
            url: 'http://ec2-13-58-232-63.us-east-2.compute.amazonaws.com/api/blog/create',
            data: {
                id: authCtx.userState.user.id,
                title,
                content: context
            }
        });

        history.push('/');
    }

    const submitHandler = e => {
        e.preventDefault();
        postHandler();
    }

    return (
        <section className='create' onSubmit={submitHandler}>
            <form>
                <h1>New Post</h1>
                <label htmlFor='title'>Title</label>
                <input id='title' type='text' value={title} onChange={titleHandler}/>
                <label htmlFor='context'>Title</label>
                <textarea id='context' type='text' rows="8" cols="50" value={context} onChange={contextHandler}/>
                <button type='submit'>Post</button>
            </form>
        </section>
    );
}

export default NewBlog;
