const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.get('/:id', async (req, res) => {
    try {
    const item = await Feedback.findById(req.params.id);
    res.json(item)
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;