import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../store/AuthContext';
import './Blog.css';

const Blog = props => {
    const [canDelete, setCanDelete] = useState(false);
    const [Id, setId] = useState('');

    const authCtx = useContext(AuthContext);

    const { author, title, date, content, id, blogId } = props;

    const newDate = Date.parse(date); 
    const shownDate = new Date(newDate).toLocaleString('en-US', {month: 'long', year: 'numeric', day: 'numeric'});

    const deleteBlog = async () => {
        const url = `http://localhost:8000/api/blog/${Id}`;
        
        await axios.delete(url);
    };

    const deleteHandler = () => {
        deleteBlog();
        props.delete(Id);
    };

    useEffect(() => {
        if (authCtx.userState.user.id === id) {
            setCanDelete(true);
        };

        setId(blogId);
    }, []);

    return (
        <div className='post'>
            <div className='header'>
                <li>
                    <img 
                    className='avatar' 
                    src={`http://localhost:8000/api/user/${id}/img`}
                    alt='avatar'
                    />
                </li>

                <li>
                    <h3 className='author'>{author}</h3>
                </li>

                <li>
                    <h3 className='date'>{shownDate}</h3>
                </li>
                {canDelete &&
                    <li>
                        <div className='delete' onClick={deleteHandler}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </div>
                    </li>
                }
            </div>
            <h4 className='title'>{title}</h4>
            <div className='content'>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Blog;
