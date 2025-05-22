import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function Resources() {
  const cursorRef = useRef(null);
  const rippleContainerRef = useRef(null);

  // Cursor Effect (to match the style of Dashboard, which doesn't have a custom cursor)
  useEffect(() => {
    // Since Dashboard doesn't use a custom cursor, we'll ensure the default cursor is applied
    document.body.style.cursor = 'auto';
  }, []);

  const resources = [
    {
      title: 'Budgeting Tips for Students',
      description: 'Learn how to manage your finances effectively with these budgeting tips tailored for students.',
      tips: [
        'Track your daily expenses using apps like Budget Tracker to identify spending patterns.',
        'Set a monthly budget and allocate funds for essentials (e.g., food, transport) first.',
        'Use the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.',
        'Avoid impulse purchases by creating a shopping list and sticking to it.',
      ],
    },
    {
      title: 'Student Discounts and Offers',
      description: 'Save money by taking advantage of student discounts on various services.',
      tips: [
        'Sign up for UNiDAYS or Student Beans to access discounts on food, transport, and tech.',
        'Use your student ID to get reduced fares on public transport (e.g., metro, buses).',
        'Look for student deals on software like Adobe Creative Cloud or Microsoft Office.',
        'Check with local cafes and bookstores for student discount programs.',
      ],
    },
    {
      title: 'Investment Options for Students',
      description: 'Start building your financial future with these beginner-friendly investment options.',
      tips: [
        'Open a fixed deposit account for low-risk savings with guaranteed returns.',
        'Explore mutual funds via apps like Zerodha or Groww for long-term growth.',
        'Start small with SIPs (Systematic Investment Plans) to invest in mutual funds monthly.',
        'Learn about the stock market through free resources on platforms like Investopedia.',
      ],
    },
    {
      title: 'Scholarships and Financial Aid',
      description: 'Ease your financial burden by applying for scholarships and financial aid programs.',
      tips: [
        'Check for government scholarships like the National Scholarship Portal (NSP) in India.',
        'Look for university-specific scholarships or grants for academic or extracurricular achievements.',
        'Explore international scholarships if you plan to study abroad (e.g., Chevening, Fulbright).',
        'Apply early to meet deadlines and increase your chances of approval.',
      ],
    },
  ];

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
            Financial Resources for Students
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Discover tips, discounts, and opportunities to manage your finances effectively.
          </p>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-200/30 dark:border-gray-700/30 transform hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">{resource.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                {resource.tips.map((tip, i) => (
                  <li key={i} className="mb-2">{tip}</li>
                ))}
              </ul>
              {/* Removed "Learn More" button as requested */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Resources;