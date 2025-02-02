import Student from '../models/studentModel.js';
import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

export const upload = multer({ storage: storage });

// Create a new student
export const createStudent = async (req, res) => {
  try {
    // Handle uploaded files
    const documents = req.files ? req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype
    })) : [];

    // Create student with document information
    const studentData = {
      ...req.body,
      documents: documents
    };

    const student = new Student(studentData);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  try {
    // Handle new uploaded files if any
    const newDocuments = req.files ? req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype
    })) : [];

    const updateData = {
      ...req.body,
      ...(newDocuments.length && { $push: { documents: { $each: newDocuments } } })
    };

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: Add a method to delete specific documents
export const deleteDocument = async (req, res) => {
  try {
    const { studentId, documentId } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { documents: { _id: documentId } } },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};