import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedUser, setSelectedUser] = useState('All');
    const [uniqueUsers, setUniqueUsers] = useState(['All']);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://s55-purrflix-1.onrender.com/get');
            setVideos(response.data);
            
            const users = ["All", ...new Set(response.data.map(video => video.created_by))];
            setUniqueUsers(users);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    const handleUserSelect = (event) => {
        setSelectedUser(event.target.value);
    };

    return (
        <>
            <div className="navbar">
                <div className="heading-search">
                    <h1>PURRFLIX</h1>
                    <input className="search" type="text" placeholder="Search..." />
                </div>
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

            <div className="filter">
                <label htmlFor="userSelect">Filter by User:</label>
                <select id="userSelect" value={selectedUser} onChange={handleUserSelect}>
                    {uniqueUsers.map((user, index) => (
                        <option key={index} value={user}>{user}</option>
                    ))}
                </select>
            </div>

            <div className="container">
                <div className="video-container">
                    {videos.filter(video => selectedUser === 'All' || video.created_by === selectedUser).map((video, index) => (
                        <div className="video-card" key={index}>
                            <img src={video.image} alt="Video Thumbnail" />
                            <h2>{video.title}</h2>
                            <div className="video-details">
                                <p>Time - {video.duration}</p>
                                <p>Category - {video.category}</p>
                            </div>
                            <button onClick={() => handleDelete(video._id)} className='delete-btn'>🗑</button>
                            <a href={video.videourl} target="_blank" rel="noopener noreferrer">
                                <button className='btn'>Play</button>
                            </a>
                            <Link to={`/update-entity/${video._id}`} className="update-btn">⚙</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;