import { useState, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './main.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BudgetPage from './pages/BudgetPage';
import ExpensesPage from './pages/ExpensesPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Resources  from './components/Resources.jsx';
function ProtectedRoute({ children, isAdminRoute }) {
  const { user, isLoading, authError } = useContext(AuthContext);
  
  console.log('ProtectedRoute:', { user, isAdminRoute, isAdmin: user?.isAdmin, isLoading, authError });

  if (isLoading) {
    return <div className="text-center text-gray-500 dark:text-gray-300">Loading...</div>;
  }

  if (authError) {
    console.warn('Redirecting to /login: Authentication error:', authError);
    return <Navigate to="/login" replace />;
  }

  if (!user || !user.token) {
    console.warn('Redirecting to /login: No user or token');
    return <Navigate to="/login" replace />;
  }
  if (isAdminRoute && !user.isAdmin) {
    console.warn('Redirecting to /: Not an admin');
    return <Navigate to="/" replace />;
  }
  return children;
}

function DashboardRoute() {
  const { user, isLoading, authError } = useContext(AuthContext);

  console.log('DashboardRoute:', { user, isAdmin: user?.isAdmin, isLoading, authError });

  if (isLoading) {
    return <div className="text-center text-gray-500 dark:text-gray-300">Loading...</div>;
  }

  if (authError) {
    console.warn('Redirecting to /login: Authentication error:', authError);
    return <Navigate to="/login" replace />;
  }

  if (!user || !user.token) {
    console.warn('Redirecting to /login: No user or token');
    return <Navigate to="/login" replace />;
  }
  return user.isAdmin === true ? <AdminDashboardPage /> : <DashboardPage />;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  return (
    <div className={darkMode ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-100 min-h-screen'}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/budget"
              element={
                <ProtectedRoute>
                  <BudgetPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <ExpensesPage />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdminRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            < Route path='/resources' element={<Resources />}/>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;