import { useState, useContext } from 'react';
import { AuthContext } from '../main.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';

function ExpenseForm() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) {
      setMessage('Please log in to add expenses');
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        '/api/expenses',
        { amount: Number(amount), category },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage('Expense added successfully!');
      setAmount('');
    } catch (error) {
      setMessage('Failed to add expense: ' + (error.response?.data?.message || 'Server error'));
      console.error('Expense submit error:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (message.includes('Please log in')) {
    return <div className="text-red-500 text-center p-4">{message}</div>;
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₹)"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white"
        >
          <option value="Food">Food</option>
          <option value="Books">Books</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-md w-full hover:bg-blue-700 transition-all"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
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

export default ExpenseForm;