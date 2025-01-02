import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust the path as necessary
import AdminPage from './pages/AdminPage'; // Import other pages as necessary
import UserPage from './pages/UserPage'; // Import other pages as necessary

const App = () => {
    return (
        <Router basename="/CalenderApp"> {/* Set the base URL for routing */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
        </Router>
    );
};

export default App;
