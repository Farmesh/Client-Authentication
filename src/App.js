import './App.css';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import EditProfile from './Components/EditProfile';
import ChangePassword from './Components/ChangePassword';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
   <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='home' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='edit-profile' element={<EditProfile/>}/>
      <Route path='change-password' element={<ChangePassword/>}/>

    </Routes>
    
    </BrowserRouter>
   
   
   </>
  );
}

export default App;
