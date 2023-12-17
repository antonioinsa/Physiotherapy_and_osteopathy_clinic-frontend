import { Navigate, Route, Routes } from 'react-router';
import { Home } from '../Home/Home';
import { About } from '../About/About';



export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                
            </Routes>
        </>
    )
}