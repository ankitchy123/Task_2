const mongoose = require('mongoose');
const { Schema } = mongoose;

const adSchema = new Schema({
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

const Ad = mongoose.model('ad', adSchema);

module.exports = Ad;