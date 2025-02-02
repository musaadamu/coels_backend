// // routes/studentRoutes.js
// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/studentController');

// // Routes
// router.post('/students', studentController.createStudent);
// router.get('/students', studentController.getStudents);
// router.put('/students/:id', studentController.updateStudent);
// router.delete('/students/:id', studentController.deleteStudent);

// module.exports = router;


import express from 'express';
import { 
    createStudent, 
    getStudents, 
    updateStudent, 
    deleteStudent,
    deleteDocument,
    upload 
} from '../controllers/studentController.js';

const router = express.Router();

// Create a new student with document upload support
router.post('/students', upload.array('documents', 5), createStudent);

// Get all students
router.get('/students', getStudents);

// Get a single student by ID
router.get('/students/:id', getStudents);

// Update a student with document upload support
router.put('/students/:id', upload.array('documents', 5), updateStudent);

// Delete a student
router.delete('/students/:id', deleteStudent);

// Delete a specific document from a student
router.delete('/students/:studentId/documents/:documentId', deleteDocument);

export default router;