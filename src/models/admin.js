const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        profession: {
            type: String

        },
        interestedin: {
            type: String

        },
        PhoneNo: {
            type: String

        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        hash_password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "admin",
        },
        contactNumber: { type: String },
        pofilePicture: { type: String },
    },
    { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
    this.hash_password = bcrypt.hashSync(password);
});

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    },
};

module.exports = mongoose.model("admin", userSchema);
