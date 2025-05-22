import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../main.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

function BudgetForm() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [totalBudget, setTotalBudget] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      if (!user?.token) {
        setMessage('Please log in to set budget');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get('/api/budget', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTotalBudget(res.data.amount);
      } catch (error) {
        setMessage('Failed to fetch budget: ' + (error.response?.data?.message || 'Server error'));
        console.error('Budget fetch error:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) {
      setMessage('Please log in to set budget');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        '/api/budget',
        { amount: Number(amount) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTotalBudget(res.data.amount);
      setMessage('Budget added successfully!');
      setAmount('');
    } catch (error) {
      setMessage('Failed to add budget: ' + (error.response?.data?.message || 'Server error'));
      console.error('Budget submit error:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (message.includes('Please log in')) {
    return <div className="text-red-500 text-center p-4">{message}</div>;
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Set Monthly Budget</h2>
      <p className="text-lg dark:text-white mb-4">Current Budget: ₹{totalBudget.toLocaleString('en-IN')}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget (₹)"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-md w-full hover:bg-blue-700 transition-all"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Budget'}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </motion.div>
  );
}

export default BudgetForm;