const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Hash the Password before saving

/* userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) next();
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

}); */

const User = mongoose.model('User', userSchema);
module.exports = User;

