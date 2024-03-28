import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://s55-purrflix-1.onrender.com/get');
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="navbar">
                <div className="heading-search">
                    <h1>PURRFLIX</h1>
                    <input className="search" type="text" placeholder="Search..." />
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
                            <a href={video.videourl} target="_blank" rel="noopener noreferrer">
                                <button className='btn'>Play</button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
