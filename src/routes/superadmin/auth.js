const express = require('express');
const { signup, signin } = require('../../controller/superadmin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();


router.post('/superadmin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/superadmin/signin', validateSigninRequest, isRequestValidated, signin);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;