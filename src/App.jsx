import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust the path as necessary


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />               {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App; 
