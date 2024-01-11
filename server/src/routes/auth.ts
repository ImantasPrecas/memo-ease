import express from 'express'
import { body } from 'express-validator/'

import User from '../models/user'
const authControler = require('../controllers/auth')

const router = express.Router();

router.post('/register',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value: string, {req}) => {
        return User.findOne({email: value})
        .then(userDoc => {
            console.log(userDoc)
            if(userDoc) {
                return Promise.reject('Email address already exists!')
            }
        })
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .not()
    .isEmpty()
], authControler.register)

router.post('/login', authControler.login)

router.get('/getCurrentUser', authControler.getCurrentUser)

module.exports = router