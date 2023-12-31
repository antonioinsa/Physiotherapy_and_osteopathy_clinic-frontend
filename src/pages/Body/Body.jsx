import { Navigate, Route, Routes } from 'react-router';
import { Home } from '../Home/Home';
import { About } from '../About/About';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Account } from '../Account/Account';
import { ChangePassword } from '../UserPassword/UserPassword';
import { InvoicesUser } from '../InvoicesUser/InvoicesUser';
import { AppointmentsUser } from '../AppointmentsUser/AppointmentsUser';
import { AccountAdmin } from '../AccountAdmin/AccountAdmin';
import { AccountSuperAdmin } from '../AccountSuperAdmin/AccountSuperAdmin';
import { InvoicesSuperAdmin } from '../InvoicesSuperAdmin/InvoicesSuperAdmin';
import { NewAppointment } from '../NewAppointment/NewAppointment';
import { DeleteUsers } from '../DeleteUsers/DeleteUsers';
import { ManageWorkers } from '../ManageWorkers/ManageWorkers';
import { ManageUsers } from '../ManageUsers/ManageUsers';

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
                <Route path="/myInvoices" element={<InvoicesUser />} />
                <Route path="/myAppointments" element={<AppointmentsUser />} />
                <Route path="/workerSpace" element={<AccountAdmin />} />
                <Route path="/saProfile" element={<AccountSuperAdmin />} />
                <Route path="/saInvoices" element={<InvoicesSuperAdmin />} />
                <Route path="/newAppointment" element={<NewAppointment />} />
                <Route path="/delete" element={<DeleteUsers />} />
                <Route path="/saWorkers" element={<ManageWorkers />} />
                <Route path="/saUsers" element={<ManageUsers />} />
                
                
            </Routes>
        </>
    )
}