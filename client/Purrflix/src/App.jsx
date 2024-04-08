import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import UpdateEntityForm from './components/UpdateEntityForm';
import './App.css';

const App = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/add-entity" element={<Form />} />
            <Route path="/update-entity/:id" element={<UpdateEntityForm />} /> 
        </Routes>
    );
}

export default App;
