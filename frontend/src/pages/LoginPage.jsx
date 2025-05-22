import Login from '../components/Login';
import { motion } from 'framer-motion';

function LoginPage() {
  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Login />
    </motion.div>
  );
}

export default LoginPage;