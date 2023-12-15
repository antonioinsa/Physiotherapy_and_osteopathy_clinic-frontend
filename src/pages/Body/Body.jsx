import { Navigate, Route, Routes } from 'react-router';
import { Home } from '../Home/Home';


export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}