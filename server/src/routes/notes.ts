import express from 'express'
import { body } from 'express-validator/'

const notesControler = require('../controllers/notes')
const isAuth = require('../middlewares/is-auth')

const router = express.Router();

router.get('/', isAuth,  notesControler.getNotes)
router.post('/addNote', isAuth,  notesControler.addNote)
router.put('/editNote/:id', isAuth, notesControler.editNote)
router.delete('/deleteNote/:id', isAuth, notesControler.deleteNote)

module.exports = router