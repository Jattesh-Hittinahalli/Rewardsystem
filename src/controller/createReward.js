const createReward = require("../models/createReward")
const User = require("../models/user")
var ObjectId = require('mongodb').ObjectId;

exports.createReward = async (req, res) => {
    const { workTime, issue, description, techStack, rewardPoint, status, user } = req.body
    const createdby = req.User._id;
    try {
        const _createRewardModel = new createReward({
            workTime,
            issue,
            description,
            techStack,
            rewardPoint,
            status,
            user,
            createdby
        });
        const createRewardModel = await _createRewardModel.save()
        res.status(200).json({
            createRewardModel
        })

    } catch (error) {
        res.status(400).json({
            Message: "Something Went Wrong ...!"
        })
    }

}

exports.updateReward = async (req, res) => {
    const _id = req.params._id
    const status = req.body.status
    var myquery = { _id: _id };
    var newvalues = { $set: { status: status } };
    const data = await createReward.updateOne(myquery, newvalues).exec()
    if (data.nModified === 1) {
        res.status(200).json({
            Message: "Requested Data Is Successfully Updated...!"
        })
    } else {
        res.status(400).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.userTotalPoint = async (req, res) => {

    try {
        const { startDate, endDate } = req.body
        var data = await createReward.aggregate([
            {
                $match: {
                    status: req.body.status
                }
            },
            {
                $match: {
                    user: ObjectId(req.params._id)
                }
            },
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            {
                $group: { _id: null, rewardPoint: { $sum: "$rewardPoint" } },
            },
        ])

        res.status(200).json({
            data
        })

    } catch (error) {
        res.status(400).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.rewardList = async (req, res) => {
    try {
        const page = req.params.size;
        const limit = 10
        const data = await createReward.find()
            .skip((page - 1) * limit).limit(limit);
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(400).json({
            Message: "Something Went Wrong ...!"
        })
    }

}
exports.userList = async (req, res) => {
    try {
        const page = req.params.size;
        const limit = 10
        const data = await User.find()
            .skip((page - 1) * limit).limit(limit);
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(400).json({
            Message: "Something Went Wrong ...!"
        })
    }

}



