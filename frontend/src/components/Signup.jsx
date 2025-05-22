import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../main.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', { email, password, isAdmin });
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token, isAdmin: res.data.isAdmin });
      setMessage('Signup successful!');
      navigate(res.data.isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      setMessage('Signup failed: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 transform-gpu"
        initial={{ opacity: 1, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
        style={{ perspective: 1000 }}
      >
        {/* Subtle 3D background effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 opacity-50" />
        <h2 className="relative text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="relative space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
              aria-label="Email address"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
              aria-label="Password"
            />
          </div>
          <label className="relative flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            />
            <span>Register as Admin</span>
          </label>
          <motion.button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>
        {message && (
          <p
            className={`mt-6 text-center font-medium ${
              message.includes('failed') ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}
        <p className="relative mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:text-blue-500 font-medium hover:underline">
            Log In
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;