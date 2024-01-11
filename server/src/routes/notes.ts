import express from 'express'
import { body } from 'express-validator/'

const notesControler = require('../controllers/notes')
const extractUserId = require('../../middlewares/user')

const router = express.Router();

router.post('/addNote', extractUserId,  notesControler.addNote)

module.exports = router