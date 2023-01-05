import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from '../pages/Login/login';
import { Home } from '../pages/Home/home';
import { Register } from '../pages/Register/register';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/sing-up' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}