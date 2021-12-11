const mongoose = require('mongoose');
 

const FeedbackSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: '../img/feedback-photo-1.jpeg'
    },
    accepted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema);