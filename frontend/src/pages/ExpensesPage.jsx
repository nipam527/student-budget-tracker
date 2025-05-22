import ExpenseForm from '../components/ExpenseForm';
import { motion } from 'framer-motion';

function ExpensesPage() {
  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ExpenseForm />
    </motion.div>
  );
}

export default ExpensesPage;