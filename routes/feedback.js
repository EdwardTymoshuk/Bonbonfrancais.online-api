const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const verify = require('./verifyToken'); ``


router.get('/:isLogined', verify, async (req, res) => {
    console.log(req.params.isLogined)
    try {
        const feedback = await Feedback.find({ accepted: req.params.isLogined })
        console.log(feedback)
        res.json(feedback.slice(req.query.start, req.query.end).length != 0 ? feedback.slice(req.query.start, req.query.end) : feedback.slice(req.query.start + 4, req.query.end + 4))
    } catch (err) {
        res.sendStatus(400);
        res.json({ message: err })
    }
})
router.post('/', async (req, res) => {
    const feedbackElement = new Feedback({
        firstName: req.body.firstName,
        email: req.body.email,
        country: req.body.country,
        feedback: req.body.feedback,
        date: req.body.date,
        accepted: req.body.accepted
    })
    try {
        const savedFeedback = await feedbackElement.save();
        res.json(savedFeedback._id);
    } catch (err) {
        res.sendStatus(400);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const item = await Feedback.findById(req.params.id);
        res.json(item)
    } catch (err) {
        res.sendStatus(400);
        res.json({ message: err });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Feedback.deleteOne({ _id: req.params.id });
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
        res.json({ message: err });
    }
})
router.post('/:id', async (req, res) => {
    try {
        const updatedFeedback = await Feedback.updateOne({ _id: req.params.id },
            {$set: {
                    firstName: req.body.firstName,
                    email: req.body.email,
                    country: req.body.country,
                    feedback: req.body.feedback,
                    date: req.body.date,
                    accepted: req.body.accepted
                }
            })
        res.json(updatedFeedback)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;