const express = require('express');
const { createReward, updateReward, userTotalPoint, rewardList, userList } = require("../controller/createReward")
const { verifyadmin, requiredsignin } = require('../common-middleware/index')
const router = express.Router();


router.post("/createReward", requiredsignin, createReward);
router.post("/updateReward/:_id", requiredsignin, updateReward);
router.post("/userTotalPoint/:_id", requiredsignin, userTotalPoint);
router.get("/rewardList/:size", requiredsignin, rewardList);
router.get("/userList/:size", requiredsignin, userList);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(constants.err.Success).json({ user: 'profile' })
// });

module.exports = router;