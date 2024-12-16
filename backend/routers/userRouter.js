const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../services/signInService');


router.get('/',authenticateToken, userController.getAllUsers);
router.get('/mydetails',authenticateToken, userController.getUserByToken);
router.get('/:id', authenticateToken ,userController.getUserById);
router.get('/:id/events',authenticateToken, userController.getUserEvents);
router.post('/', userController.createUser);
router.post('/:id/events',authenticateToken, userController.addUserEvent);
router.patch('/:id',authenticateToken, userController.updateUser);




module.exports = router;