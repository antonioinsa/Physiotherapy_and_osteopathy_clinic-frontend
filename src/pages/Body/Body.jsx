import { Navigate, Route, Routes } from 'react-router';
import { Home } from '../Home/Home';
import { About } from '../About/About';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';



export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                
            </Routes>
        </>
    )
}