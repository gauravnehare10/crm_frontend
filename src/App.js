import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Response from './components/Response/Response';


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='response' element={<Response />}></Route>
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
