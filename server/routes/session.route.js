const express = require('express');

const authController = require('../controllers/auth.controller');
const verifiyToken = require('../middlewares/verifyAuth.middleware');

const router = express.Router();

/* POST /api/users/login  */
router.post(
    '/login',
    authController.userLogin
);

router.post(
    '/refreshToken',
    authController.letsRefreshToken
);

router.post(
    '/logout',
    verifiyToken,
    authController.userLogout
);

module.exports = router;