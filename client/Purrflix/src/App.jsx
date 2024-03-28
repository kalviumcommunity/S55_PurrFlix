// import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import './App.css'

const App = () => {
    return (
        <Routes>
            
                <Route exact path="/" element={<Home/>} />
                <Route path="/add-entity" element={<Form/>} />
            
        </Routes>
    );
}

export default App;