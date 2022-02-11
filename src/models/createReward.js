const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        workTime: {
            type: Number
        },
        issue: {
            type: String
        },
        description: {
            type: String
        },
        techStack: {
            type: String
        },
        rewardPoint: {
            type: Number
        },
        status: {
            type: Boolean,
            default:false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'user',
        },
        createdby: {
            type: mongoose.Schema.Types.ObjectId, ref: 'user',
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('rewards', userSchema);