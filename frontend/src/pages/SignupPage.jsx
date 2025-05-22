import Signup from '../components/Signup';
import { motion } from 'framer-motion';

function SignupPage() {
  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Signup />
    </motion.div>
  );
}

export default SignupPage;