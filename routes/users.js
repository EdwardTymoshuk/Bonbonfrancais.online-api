const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')

//REGISTER
router.post('/register', async (req, res) => {
    //validate the data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking if the user is already exist
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //creating a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    //validate the data
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //checking if the user is already exists in the db
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or password is wrong')

    //checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or password is wrong')

    //create and asing a token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET)
    res.json(user)
    res.header('auth-token', token).send(token)

})

module.exports = router