import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust the path as necessary
import AdminPage from './pages/AdminPage'; // Adjust the path as necessary

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App; 
