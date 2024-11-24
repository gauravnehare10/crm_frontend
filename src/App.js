import './App.css';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Dash from './Dash';
function App() {
  return (
    <BrowserRouter>
      <Link to='home'>Home</Link>
      <Link to='dash'>Dashboard</Link>
      <Routes>
        <Route path='dash' element={<MyComp>
          <Dash></Dash>
          </MyComp>}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

function MyComp(obj){
   if(localStorage.getItem("username")){
    return (obj.children)
   }
   return <Navigate to="../login"></Navigate>
}
export default App;
