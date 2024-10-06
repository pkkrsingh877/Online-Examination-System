const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    friendRequestSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequestReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// Hash password before saving user
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next(); // Only hash if the password has been changed or is new
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare provided password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
