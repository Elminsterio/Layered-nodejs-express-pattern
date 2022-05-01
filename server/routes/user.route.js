const express = require('express');

const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyAuth.middleware');
const { verifyOwnId } = require('../middlewares/verifyRole.middleware');

const router = express.Router();

/* POST /api/users  */
router.post(
	'/',
  userController.createUser
);

/* PATCH /api/users/:id  */
router.patch(
  '/:id',
  verifyToken,
  verifyOwnId,
  userController.updateUser
  )
  
/* GET /api/users  */
router.get(
  '/',
  userController.getUsers
)

/* GET /api/users/:id  */
router.get(
  '/:id',
  verifyToken,
  verifyOwnId,
  userController.getUserByID
)

/* DELETE /api/users  */
router.delete(
  '/:id',
  verifyToken,
  verifyOwnId,
  userController.deleteUser
);


module.exports = router;