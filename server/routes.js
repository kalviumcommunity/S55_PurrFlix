import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetchData();
        fetchUsers();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://s55-purrflix-1.onrender.com/get`, {
                params: {
                    created_by: selectedUser
                }
            });
            setVideos(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://s55-purrflix-1.onrender.com/delete/${id}`);
            setVideos(prevVideos => prevVideos.filter(video => video._id !== id)); 
            window.alert('Entity removed successfully');
        } catch (error) {
            console.error('Error deleting entity:', error);
            window.alert('Error deleting entity. Please try again later.');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            setLoggedIn(false);
            window.alert('Logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error);
            window.alert('Error logging out. Please try again.');
        }
    };

    return (
        <>
            <div className="navbar">
                <div className="heading-search">
                    <h1>PURRFLIX</h1>
                    <input className="search" type="text" placeholder="Search..." />
                </div>
            </div>

            <div className='filter'>
                <select onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select User</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.username}>{user.username}</option>
                    ))}
                </select>
            </div>

            <div className='add'>
                <div className='add-btns'>
                    <Link to="/add-entity" className="add-btn">Add Entity</Link>

                    {loggedIn ? (
                        <button onClick={handleLogout} >Logout</button>
                    ) : (
                        <Link to="/login" className='login'>Login</Link>
                    )}

                    <Link to="/signup">
                        <button className='login'>Sign Up</button>
                    </Link>
                </div>
            </div>

            <div className="container">
                <div className="video-container">
                    {videos.map((video, index) => (
                        <div className="video-card" key={index}>
                            <img src={video.image} alt="Video Thumbnail" />
                            <h2>{video.title}</h2>
                            <div className="video-details">
                                <p>Time - {video.duration}</p>
                                <p>Category - {video.category}</p>
                            </div>
                            <button onClick={() => handleDelete(video._id)} className='delete-btn'>🗑️</button>
                            <a href={video.videourl} target="_blank" rel="noopener noreferrer">
                                <button className='btn'>Play</button>
                            </a>
                            <Link to={`/update-entity/${video._id}`} className="update-btn">⚙️</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
