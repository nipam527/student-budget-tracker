// import { useContext } from 'react';
// import { AuthContext } from '../main.jsx';

// function Home() {
//   const { user } = useContext(AuthContext);

//   return (
//     <div className="text-center animate-fadeIn">
//       <h2 className="text-3xl font-bold mb-4 dark:text-white">Welcome to Student Budget Tracker</h2>
//       <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
//         {user
//           ? `Hi, ${user.isAdmin ? 'Admin' : 'Student'}! Manage your finances in ₹, track expenses, and visualize your spending.`
//           : 'Manage your finances easily. Sign up or log in to set a budget in ₹ and track expenses.'}
//       </p>
//       <div className="flex justify-center space-x-4">
//         {user ? (
//           <>
//             <a
//               href="/budget"
//               className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
//             >
//               Set Budget (₹)
//             </a>
//             <a
//               href="/expenses"
//               className="bg-accent text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-all"
//             >
//               Add Expense (₹)
//             </a>
//           </>
//         ) : (
//           <>
//             <a
//               href="/signup"
//               className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
//             >
//               Sign Up
//             </a>
//             <a
//               href="/login"
//               className="bg-accent text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-all"
//             >
//               Log In
//             </a>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;



import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../main.jsx';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
          {user ? `Welcome back, ${user.name || (user.isAdmin ? 'Admin' : 'Student')}!` : 'Student Budget Tracker'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {user
            ? 'Take control of your finances with our intuitive budgeting tools.'
            : 'The simplest way to track expenses and manage your money in ₹.'}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {user ? (
            <>
              <Link
                to="/budget"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Set Budget
              </Link>
              <Link
                to="/expenses"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Track Expenses
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Start for Free
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 dark:border-white dark:text-white px-8 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section - No Fake Numbers */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-500 dark:text-blue-400 text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Student-Focused</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Designed specifically for student budgets and common expense categories.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-green-500 dark:text-green-400 text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Always Accessible</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Works perfectly on all devices - update your budget anywhere.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-purple-500 dark:text-purple-400 text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Quick Setup</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get started in under 2 minutes - no complex configuration needed.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial/Community Section - No Fake Stats */}
      {!user && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 my-16 text-center">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">Join Students Who Save</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our budgeting tools help students across India manage their finances more effectively.
          </p>
          <div className="mt-6 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">✓</div>
              <div className="text-gray-600 dark:text-gray-300">Free Forever</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">✓</div>
              <div className="text-gray-600 dark:text-gray-300">No Ads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">✓</div>
              <div className="text-gray-600 dark:text-gray-300">Privacy First</div>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA */}
      {!user && (
        <div className="text-center my-16">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to Take Control?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up now and start managing your money like a pro.
          </p>
          <div className="flex justify-center gap-4 p-4 bg-gray-100 dark:bg-[#2C3E50] text-gray-700 dark:text-white flex-wrap">
  {/* Social Icons */}
  


  {/* Copyright */}
  <div className="text-sm text-center" >
    © {new Date().getFullYear()} MensCare. All rights reserved.
  </div>
</div>
        </div>
      )}
    </div>
  );
}

export default Home;