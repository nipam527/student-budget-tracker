import BudgetForm from '../components/BudgetForm';
import { motion } from 'framer-motion';

function BudgetPage() {
  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BudgetForm />
    </motion.div>
  );
}

export default BudgetPage;