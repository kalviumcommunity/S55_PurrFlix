import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        videoUrl: '',
        image: '', 
        duration: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('https://s55-purrflix-1.onrender.com/add', formData);
            console.log('Response from server:', response.data);
            const navigate = useNavigate();
            setFormData({
                title: '',
                category: '',
                videoUrl: '',
                image: '', 
                duration: '' 
            });
            navigate('/');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div className='form-container'>
            <h1>Add New Entity</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Video URL:</label>
                    <input 
                        type="text" 
                        name="videoUrl" 
                        value={formData.videoUrl} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input 
                        type="text" 
                        name="image" 
                        value={formData.image} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Duration:</label>
                    <input 
                        type="text" 
                        name="duration" 
                        value={formData.duration} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Form;