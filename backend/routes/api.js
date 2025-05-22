const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const User = require('../models/User');

// Get all expenses for user (or all for admin)
router.get('/expenses', authMiddleware, async (req, res) => {
  try {
    let expenses;
    if (req.user.isAdmin) {
      expenses = await Expense.find().populate('userId', 'email');
    } else {
      expenses = await Expense.find({ userId: req.user.id });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add an expense
router.post('/expenses', authMiddleware, async (req, res) => {
  try {
    const { amount, category } = req.body;
    if (!amount || !category) return res.status(400).json({ message: 'Missing required fields' });

    const budgets = await Budget.find({ userId: req.user.id });
    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const expenses = await Expense.find({ userId: req.user.id });
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    if (totalSpent + amount > totalBudget) {
      return res.status(400).json({ message: 'Expense exceeds remaining budget' });
    }

    const expense = new Expense({ amount, category, userId: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Invalid input', error: error.message });
  }
});

// Get total budget for user
router.get('/budget', authMiddleware, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    res.json({ amount: totalBudget });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to budget
router.post('/budget', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount is required' });
    const budget = new Budget({ amount, userId: req.user.id });
    await budget.save();
    const budgets = await Budget.find({ userId: req.user.id });
    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    res.status(201).json({ amount: totalBudget });
  } catch (error) {
    res.status(400).json({ message: 'Invalid input', error: error.message });
  }
});

// Get all users' data (admin only)
router.get('/admin/users', authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin access required' });
    const users = await User.find().select('email');
    const userData = await Promise.all(
      users.map(async (user) => {
        const budgets = await Budget.find({ userId: user._id });
        const expenses = await Expense.find({ userId: user._id });
        const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        return {
          email: user.email,
          totalBudget,
          totalSpent,
          remaining: totalBudget - totalSpent,
          expenses,
        };
      })
    );
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;