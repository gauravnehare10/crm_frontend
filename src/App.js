import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Response from './components/Response/Response';
import AdminDash from './components/AdminDash/AdminDash';
import MyClients from './components/MyClients/MyClients';
import EditUser from './components/EditUser/EditUser';
import Base from './components/Base/Base';


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Base/>}></Route>
        <Route path='home' element={<Home/>}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='response' element={
          <MyRoute urlpath='response'>
            <Response />
          </MyRoute>
        }/>
        <Route path='myclients' element={
          <MyRoute urlpath='myclients'>
            <MyClients/>
          </MyRoute>
        }/>
        <Route path='edituser' element={
          <MyRoute urlpath='edituser'>
            <EditUser/>
          </MyRoute>
        }/>
        <Route path='admindash' element={
          <MyRoute urlpath='admindash'>
            <AdminDash/>
          </MyRoute>
        }/>
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}

function MyRoute(obj){
  //alert(obj.urlpath)
  if(localStorage.getItem('admin_details')){
    return obj.children
  }
  else if(localStorage.getItem('user')){
    return obj.children
  }
  else{
    return <Navigate to="../login" state={{link:obj.urlpath}} ></Navigate>
  }
}

export default App;
