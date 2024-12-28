// HomePage.js (After modification - without React Router)
import  { useState } from 'react';
import LoginPage from "../login/LoginPage";
import RegisterPage from "../login/LoginPage";
import UserPage from './UserPage';
import AdminPage from './AdminPage';


function HomePage() {
  const [currentPage, setCurrentPage] = useState('login'); // Tracks current form (login/register)
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // Switch between login and register forms
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'login' && (
        <LoginPage
          setCurrentPage={handlePageChange}
          setUserLoggedIn={setUserLoggedIn}
          setAdminLoggedIn={setAdminLoggedIn}
        />
      )}
      {currentPage === 'register' && <RegisterPage setCurrentPage={handlePageChange} />}
      
      {/* After login, show appropriate page */}
      {userLoggedIn && !adminLoggedIn && <UserPage />}
      {adminLoggedIn && !userLoggedIn && <AdminPage />}
    </div>
  );
}

export default HomePage;
