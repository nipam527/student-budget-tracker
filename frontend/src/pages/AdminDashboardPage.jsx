import AdminDashboard from '../components/AdminDashboard';
import { motion } from 'framer-motion';

function AdminDashboardPage() {
  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AdminDashboard />
    </motion.div>
  );
}

export default AdminDashboardPage;