import './App.css';
import {  Route,Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import Admin from './components/Admin';
function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
    </>
  );
}

export default App;
