


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
},
{
    timestamps: true
});

// Use the correct collection name "users"
const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;