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
import EditMortgage from './components/EditMortgage/EditMortgage';
import EditNewMortgage from './components/EditNewMortgage/EditNewMortgage';
import AdminLogin from './components/AdminLogin/AdminLogin';
import ForgotPasswordRequest from './components/ForgotPasswordRequest/ForgotPasswordRequest';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Base />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='admin/login' element={<AdminLogin />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='response' element={
          <UserRoute urlpath='response'>
            <Response />
          </UserRoute>
        }/>
        <Route path='myclients' element={
          <AdminRoute urlpath='myclients'>
            <MyClients/>
          </AdminRoute>
        }/>
        <Route path='edituser' element={
          <MyRoute urlpath='edituser'>
            <EditUser/>
          </MyRoute>
        }/>
        <Route path='admindash' element={
          <AdminRoute urlpath='admindash'>
            <AdminDash/>
          </AdminRoute>
        }/>
        <Route path='editmortgage' element={
          <MyRoute urlpath='editmortgage'>
            <EditMortgage/>
          </MyRoute>
        }/>
        <Route path='editnewmortgage' element={
          <MyRoute urlpath='editnewmortgage'>
            <EditNewMortgage/>
          </MyRoute>
        }/>
        <Route path="forgot-password" element={<ForgotPasswordRequest />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}


function MyRoute(obj){
  if(localStorage.getItem('user')){
    return obj.children
  }
  else if(localStorage.getItem('admin_details')){
    return obj.children
  }
  else{
    return <Navigate to="../login" state={{link:obj.urlpath}} ></Navigate>
  }
}
function UserRoute(obj){
  //alert(obj.urlpath)
  if(localStorage.getItem('user')){
    return obj.children
  }
  else{
    return <Navigate to="../login" state={{link:obj.urlpath}} ></Navigate>
  }
}

function AdminRoute(obj){
  if(localStorage.getItem('admin_details')){
    return obj.children
  }
  else{
    return <Navigate to="../login" state={{link:obj.urlpath}} ></Navigate>
  }
}

export default App;
