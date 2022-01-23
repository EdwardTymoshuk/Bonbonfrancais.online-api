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
    date: {
        type: Date,
        default: Date.now()
    },
    accepted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema);