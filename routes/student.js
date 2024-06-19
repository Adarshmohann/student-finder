const express = require('express')
const { addStudent, searchStudent } = require('../controllers/students')



const router = express.Router()


router.post('/addstudent', addStudent)
router.get('/searchstudent',searchStudent)
router.get('/searchstudent/:name',searchStudent )


module.exports = router