const express = require('express');
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/role');
const {
  addTask,
  updateTask,
  addOrUpdateLog,
  getDashboard,
  getAllUsers
} = require('../controllers/dashboardController');

const router = express.Router();

router.use(auth);
router.get('/', getDashboard);
router.post('/tasks', addTask);
router.patch('/tasks/:id', updateTask);
router.post('/logs', addOrUpdateLog);
router.get('/admin/users', authorizeRole('admin'), getAllUsers);

module.exports = router;
