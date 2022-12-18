const { AuthController } = require('../controllers/AuthController');
const { Router } = require('express');
const router = Router();

router.get('/signup', AuthController.signup_get);
router.post('/signup', AuthController.signup_post);
router.get('/login', AuthController.login_get);
router.post('/login', AuthController.login_post);
router.get('/logout', AuthController.logout_get);

module.exports = router;