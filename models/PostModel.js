const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title:
    {
        type: String,
        required: [true, "Please enter title"],
        trim: true
    },
    description:
    {
        type: String,
        required: [true, "Please enter description"],
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

const User = mongoose.model('posts', postSchema);

module.exports = User;