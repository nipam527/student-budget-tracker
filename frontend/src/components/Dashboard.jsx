import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../main.jsx';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { motion, useScroll, useTransform } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -30]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }
      try {
        const [expenseRes, budgetRes] = await Promise.all([
          axios.get('/api/expenses', { headers: { Authorization: `Bearer ${user.token}` } }),
          axios.get('/api/budget', { headers: { Authorization: `Bearer ${user.token}` } }),
        ]);
        console.log('Dashboard data:', { expenses: expenseRes.data, budget: budgetRes.data });
        setExpenses(expenseRes.data || []);
        setBudget(budgetRes.data.amount || 0);
      } catch (error) {
        console.error('Dashboard fetch error:', error.response?.data);
        setError('Failed to load data: ' + (error.response?.data?.message || 'Server error'));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Filter expenses
  const filteredExpenses = expenses.filter((exp) => {
    if (filter === 'all') return true;
    const date = new Date(exp.date || Date.now());
    const now = new Date();
    if (filter === 'week') return date > new Date(now.setDate(now.getDate() - 7));
    if (filter === 'month') return date > new Date(now.setMonth(now.getMonth() - 1));
    return true;
  });

  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  const categories = ['Food', 'Books', 'Transport', 'Other'];
  const categoryTotals = categories.map(
    (cat) => filteredExpenses.filter((exp) => exp.category === cat).reduce((sum, exp) => sum + (exp.amount || 0), 0)
  );

  // Financial Guidance Logic
  const spendingRatio = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const highestCategory = categories.reduce(
    (max, cat, i) => (categoryTotals[i] > max.value ? { name: cat, value: categoryTotals[i] } : max),
    { name: '', value: 0 }
  );
  const guidance = [
    {
      title: 'Spending Status',
      message:
        spendingRatio > 80
          ? `You've spent ${spendingRatio.toFixed(1)}% of your budget! Consider cutting back on non-essential expenses like "${highestCategory.name}" to avoid overspending.`
          : spendingRatio > 50
          ? `You're at ${spendingRatio.toFixed(1)}% of your budget. Keep an eye on "${highestCategory.name}" spending and allocate some funds to savings.`
          : `Great job! You've only spent ${spendingRatio.toFixed(1)}% of your budget. Consider saving or investing the surplus for future goals.`,
      action: spendingRatio > 80 ? 'Review Expenses' : 'Explore Savings',
      href: spendingRatio > 80 ? '/expenses' : '/resources',
    },
    {
      title: 'Student Tip',
      message:
        spendingRatio > 80
          ? 'Look for student discounts on transport or food to reduce expenses. Apps like UNiDAYS can help!'
          : 'Start a small fixed deposit or explore mutual funds via apps like Zerodha for long-term growth.',
      action: 'Learn More',
      href: '/resources',
    },
    {
      title: 'Future Planning',
      message:
        'Set a monthly savings goal (e.g., 10% of your budget) to build an emergency fund or fund future studies. Check scholarship opportunities to ease financial stress.',
      action: 'Explore Resources',
      href: '/resources',
    },
  ];

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Spending by Category (₹)',
        data: categoryTotals,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)', // Green
          'rgba(249, 115, 22, 0.8)', // Orange
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(239, 68, 68, 0.8)', // Red
        ],
        borderColor: ['rgba(255, 255, 255, 0.9)'],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Spending Overview (₹)',
        font: { size: 20, weight: 'bold' },
        color: '#1f2937', // gray-800
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `₹${context.parsed.y.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount (₹)', font: { size: 14 } },
        grid: { color: 'rgba(209, 213, 219, 0.2)' },
      },
      x: {
        title: { display: true, text: 'Categories', font: { size: 14 } },
        grid: { display: false },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900 dark:to-gray-800 text-center text-gray-800 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-semibold">Loading...</div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900 dark:to-gray-800 text-center text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-semibold">{error}</div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
            {user ? `Welcome, ${user.name || 'User'}!` : 'Your Financial Dashboard'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Monitor your ₹ expenses and get personalized guidance for a secure financial future.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { label: 'Budget', value: budget },
            { label: 'Total Spent', value: totalSpent },
            { label: 'Remaining', value: budget - totalSpent },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-200/30 dark:border-gray-700/30 transform hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="text-lg font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ₹{stat.value.toLocaleString('en-IN')}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Section with Filter */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-200/30 dark:border-gray-700/30 mb-12 transform hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ y: parallaxY }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
              Spending by Category
            </h3>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-4 sm:mt-0 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Filter expenses by time period"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Financial Guidance Section */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-200/30 dark:border-gray-700/30 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Financial Guidance for Your Future
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidance.map((tip, index) => (
              <motion.div
                key={index}
                className="bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 transform hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                whileHover={{ scale: 1.03, rotate: 1 }}
              >
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tip.message}</p>
                <a
                  href={tip.href}
                  className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg text-sm font-medium transition-all duration-300"
                  aria-label={tip.action}
                >
                  {tip.action}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Expenses Section */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-200/30 dark:border-gray-700/30 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Recent Expenses
          </h3>
          {filteredExpenses.length > 0 ? (
            <div className="space-y-4">
              {filteredExpenses.slice(0, 5).map((exp, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">{exp.category}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {exp.date ? new Date(exp.date).toLocaleDateString('en-IN') : 'N/A'}
                    </p>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-center">No recent expenses found.</p>
          )}
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href="/expenses"
            className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-4 rounded-xl shadow-2xl hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] text-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add New Expense"
          >
            Add New Expense (₹)
          </motion.a>
          <motion.a
            href="/budget"
            className="inline-block ml-0 sm:ml-4 mt-4 sm:mt-0 bg-gradient-to-r from-blue-300 to-blue-500 text-white px-8 py-4 rounded-xl shadow-2xl hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] text-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Set Budget"
          >
            Set Budget (₹)
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;

    


