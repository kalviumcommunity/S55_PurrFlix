import { useState, useEffect } from 'react';
// Assuming you're using Axios for HTTP requests
import axios from 'axios';

const Home = () => {
    // State to hold the fetched data
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                // Fetch data from the URL
                const response = await axios.get('https://s55-purrflix-1.onrender.com/get');

                // Set the fetched data to state
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetch function
    }, []); // Empty dependency array to run the effect only once on mount

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
                    {/* Display fetched data */}
                    {data && data.map((video, index) => (
                        <div className="video-card" key={index}>
                            <img src={video.thumbnail} alt="Video Thumbnail" />
                            <div className="video-details">
                                <p>Time - {video.time}</p>
                                <p>Category - {video.category}</p>
                            </div>
                            <a href={video.link} target="_blank" rel="noopener noreferrer">
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
