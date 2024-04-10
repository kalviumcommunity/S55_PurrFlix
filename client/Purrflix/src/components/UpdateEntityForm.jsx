import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEntityForm = () => {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        category: '',
        image: '',
        videourl: ''
    });

    useEffect(() => {
        const fetchEntity = async () => {
            try {
                const response = await axios.get(`https://s55-purrflix-1.onrender.com/get/${id}`);
                setFormData(response.data);
            } catch (error) { 
                console.error('Error fetching entity data:', error);
            }
        };

        fetchEntity();
    }, [id]); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://s55-purrflix-1.onrender.com/put/${id}`, formData);
            navigate('/'); 
            window.alert('Entity added successfully!');

        } catch (error) {
            console.error('Error updating entity:', error);
        }
    };

    return (
        <div className="update-form-container">
            <h1>Update Entity</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />

                <label>Duration:</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} />

                <label>Category:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} />

                <label>Image:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />

                <label>Video URL:</label>
                <input type="text" name="videourl" value={formData.videourl} onChange={handleChange} />

                <button type="submit">Update Entity</button>
            </form>
        </div>
    );
};

export default UpdateEntityForm;