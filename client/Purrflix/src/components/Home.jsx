// import React from 'react';

const Home = () => {
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
                    <div className="video-card">
                        <img src="https://p16-sign.tiktokcdn-us.com/tos-useast5-p-0068-tx/ea7ec7ec14004497a2bf3113792acffe~tplv-photomode-zoomcover:720:720.jpeg?x-expires=1710676800&x-signature=hOjLIvbc1Ke4TQn4iuxVmcFEkis%3D" alt="Video Thumbnail" />
                        <div className="video-details">
                            <p>Time - 0:30</p>
                            <p>Category - Funny</p>
                        </div>
                        <a href="https://youtube.com/shorts/ej1aOUDSOOI?feature=shared" target="_blank" rel="noopener noreferrer">
                        <button className='btn'>Play</button>
                        </a> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;