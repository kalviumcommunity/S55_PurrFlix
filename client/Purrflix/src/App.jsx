import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import UpdateEntityForm from './components/UpdateEntityForm';
import Login from './components/Login';
// import Logout from './components/Logout'; 
import './App.css';
import Signup from './components/Signup';
// import Signup from './components/Signup';

const App = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/add-entity" element={<Form />} />
            <Route path="/update-entity/:id" element={<UpdateEntityForm />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/logout" element={<Logout />} />  */}
            <Route path="/signup" element={<Signup />} /> 
            
        </Routes>
    );
}

export default App;
