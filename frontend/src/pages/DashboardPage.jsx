import Dashboard from '../components/Dashboard';
import { motion } from 'framer-motion';

function DashboardPage() {
  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Dashboard />
    </motion.div>
  );
}

export default DashboardPage;