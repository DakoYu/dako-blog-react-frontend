import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Blog from './Blog';
import './Blogs.css';

const Blogs = () => {
    const [posts, setPosts] = useState([]);

    const deleteHandler = useCallback(id => {
        const newArray = posts.filter(e => {
            return e._id !== id
        });

        setPosts(newArray);
    }, [posts]);

    const allPosts = posts.map(e => {
        return <Blog 
            key={e._id} 
            author={e.user.name} 
            id={e.user._id}
            blogId={e._id}
            title={e.title}
            date={e.date.toLocaleString('en-us', {month: 'long', year: 'numeric'})}
            content={e.content}
            delete={deleteHandler}
            />
    });

    const blogsHandler = async() => {
        const url = 'http://ec2-13-58-232-63.us-east-2.compute.amazonaws.com/api/blog/';
        const res = await axios.get(url);
        
        const data = res.data.blogs;

        setPosts(data);
    }

    useEffect(() => {
        blogsHandler();
    }, []);

    return(
        <section className='blogs'>
            {allPosts}
        </section>
    )
};

export default Blogs;
