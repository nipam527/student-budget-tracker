// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../main.jsx';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';

// function AdminDashboard() {
//   const { user } = useContext(AuthContext);
//   const [usersData, setUsersData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.token || !user.isAdmin) {
//         setError('Admin access required');
//         setLoading(false);
//         return;
//       }
//       try {
//         setLoading(true);
//         const res = await axios.get('/api/admin/users', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         console.log('[May 22, 2025, 02:11 PM IST] Fetched users data:', res.data);
//         setUsersData(res.data);
//       } catch (error) {
//         setError('Failed to load data: ' + (error.response?.data?.message || 'Server error'));
//         console.error('[May 22, 2025, 02:11 PM IST] Fetch error:', error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-black">
//         <motion.div
//           className="spinner border-t-4 border-red-500 w-12 h-12"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//         />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center p-6 bg-black h-screen flex items-center justify-center">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="bg-black p-2 sm:p-4 md:p-6 lg:p-8 min-h-screen"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="max-w-7xl mx-auto bg-black">
//         <motion.h2
//           className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center text-white"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           Admin Dashboard
//         </motion.h2>
//         <table className="w-full border-separate border-spacing-0">
//           <thead>
//             <tr className="bg-red-900 text-red-600 hidden sm:table-row">
//               <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium rounded-tl-md w-12 sm:w-16">
//                 S.No.
//               </th>
//               <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium min-w-0 truncate">
//                 Email
//               </th>
//               <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium w-16 sm:w-20 md:w-24">
//                 Total Budget (₹)
//               </th>
//               <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium w-16 sm:w-20 md:w-24">
//                 Total Spent (₹)
//               </th>
//               <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium w-16 sm:w-20 md:w-24">
//                 Remaining (₹)
//               </th>
//               <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm md:text-base font-medium rounded-tr-md min-w-[150px] sm:min-w-[180px] md:min-w-[200px]">
//                 Expenses
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <AnimatePresence>
//               {usersData.map((userData, index) => (
//                 <motion.tr
//                   key={index}
//                   className="block sm:table-row border-b border-red-500/20 hover:bg-red-900 transition-colors duration-200 mb-4 sm:mb-0"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                 >
//                   <td className="block sm:table-cell px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-base w-12 sm:w-16 before:content-['S.No.:'] before:font-medium before:mr-1 sm:before:content-['']">
//                     {index + 1}
//                   </td>
//                   <td className="block sm:table-cell px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-base min-w-0 truncate before:content-['Email:'] before:font-medium before:mr-1 sm:before:content-['']">
//                     {userData.email}
//                   </td>
//                   <td className="block sm:table-cell px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-base w-16 sm:w-20 md:w-24 before:content-['Total_Budget:'] before:font-medium before:mr-1 sm:before:content-['']">
//                     ₹{userData.totalBudget.toLocaleString('en-IN')}
//                   </td>
//                   <td className="block sm:table-cell px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-base w-16 sm:w-20 md:w-24 before:content-['Total_Spent:'] before:font-medium before:mr-1 sm:before:content-['']">
//                     ₹{userData.totalSpent.toLocaleString('en-IN')}
//                   </td>
//                   <td className="block sm:table-cell px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-base w-16 sm:w-20 md:w-24 before:content-['Remaining:'] before:font-medium before:mr-1 sm:before:content-['']">
//                     ₹{userData.remaining.toLocaleString('en-IN')}
//                   </td>
//                   <td className="block sm:table-cell px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-base min-w-[150px] sm:min-w-[180px] md:min-w-[200px] before:content-['Expenses:'] before:font-medium before:mr-1 sm:before:content-['']">
//                     <ul className="list-disc list-inside space-y-1 whitespace-normal">
//                       {userData.expenses.map((exp, i) => (
//                         <li key={i}>
//                           ₹{exp.amount.toLocaleString('en-IN')} ({exp.category},{' '}
//                           {new Date(exp.date).toLocaleDateString()})
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                 </motion.tr>
//               ))}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// }

// export default AdminDashboard;




import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../main.jsx';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token || !user.isAdmin) {
        setError('Admin access required');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('[May 22, 2025, 03:59 PM IST] Fetched users data:', res.data);
        setUsersData(res.data || []);
        setFilteredUsers(res.data || []);
      } catch (error) {
        setError('Failed to load data: ' + (error.response?.data?.message || 'Server error'));
        console.error('[May 22, 2025, 03:59 PM IST] Fetch error:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(usersData);
    } else {
      const filtered = usersData.filter((userData) =>
        userData.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, usersData]);

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900 dark:to-gray-800 flex items-center justify-center text-center text-gray-800 dark:text-white relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm z-10"></div>
        <div className="relative z-20 flex items-center space-x-3">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-2xl font-semibold">Loading Admin Data...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900 dark:to-gray-800 flex items-center justify-center text-center text-red-500"
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
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Manage and monitor user financial data efficiently.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-200/30 dark:border-gray-700/30 transform hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Users</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{usersData.length}</p>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-200/30 dark:border-gray-700/30 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by email..."
              className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/30 dark:border-gray-700/30 overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold rounded-tl-md w-16">
                  S.No.
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold min-w-[200px]">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Total Budget (₹)
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Total Spent (₹)
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold w-24">
                  Remaining (₹)
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold rounded-tr-md min-w-[250px]">
                  Expenses
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.map((userData, index) => (
                  <motion.tr
                    key={index}
                    className="block sm:table-row border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 mb-4 sm:mb-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="block sm:table-cell px-4 py-3 text-gray-800 dark:text-gray-300 text-sm before:content-['S.No.:'] before:font-medium before:mr-1 sm:before:content-[''] w-16">
                      {index + 1}
                    </td>
                    <td className="block sm:table-cell px-4 py-3 text-gray-800 dark:text-gray-300 text-sm min-w-[200px] truncate before:content-['Email:'] before:font-medium before:mr-1 sm:before:content-['']">
                      {userData.email}
                    </td>
                    <td className="block sm:table-cell px-4 py-3 text-gray-800 dark:text-gray-300 text-sm w-24 before:content-['Total_Budget:'] before:font-medium before:mr-1 sm:before:content-['']">
                      ₹{userData.totalBudget.toLocaleString('en-IN')}
                    </td>
                    <td className="block sm:table-cell px-4 py-3 text-gray-800 dark:text-gray-300 text-sm w-24 before:content-['Total_Spent:'] before:font-medium before:mr-1 sm:before:content-['']">
                      ₹{userData.totalSpent.toLocaleString('en-IN')}
                    </td>
                    <td className="block sm:table-cell px-4 py-3 text-gray-800 dark:text-gray-300 text-sm w-24 before:content-['Remaining:'] before:font-medium before:mr-1 sm:before:content-['']">
                      ₹{userData.remaining.toLocaleString('en-IN')}
                    </td>
                    <td className="block sm:table-cell px-4 py-3 text-gray-800 dark:text-gray-300 text-sm min-w-[250px] before:content-['Expenses:'] before:font-medium before:mr-1 sm:before:content-['']">
                      <ul className="list-disc list-inside space-y-1 whitespace-normal">
                        {userData.expenses && userData.expenses.length > 0 ? (
                          userData.expenses.map((exp, i) => (
                            <li key={i}>
                              ₹{exp.amount.toLocaleString('en-IN')} ({exp.category},{' '}
                              {new Date(exp.date).toLocaleDateString('en-IN')})
                            </li>
                          ))
                        ) : (
                          <li>No expenses recorded</li>
                        )}
                      </ul>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>

        {/* No Results Message */}
        {filteredUsers.length === 0 && (
          <motion.div
            className="text-center text-gray-600 dark:text-gray-300 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No users found matching your search.
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;