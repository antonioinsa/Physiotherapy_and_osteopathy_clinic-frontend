import { Navigate, Route, Routes } from 'react-router';
import { Home } from '../Home/Home';
import { About } from '../About/About';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Account } from '../Account/Account';
import { ChangePassword } from '../UserPassword/UserPassword';



export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/password" element={<ChangePassword />} />
                


                
            </Routes>
        </>
    )
}