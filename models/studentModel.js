// // models/studentModel.js
// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   middleName: { type: String, default: '' },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   lga: { type: String, required: true },
//   state: { type: String, required: true },
//   documents: [{ type: String }], // URLs or paths to uploaded documents
//   registrationNumber: { type: String, required: true, unique: true },
//   healthStatus: { type: String, required: true },
//   sex: { type: String, required: true, enum: ['male', 'female', 'other'] },
//   course: { type: String, required: true },
//   level: { type: String, required: true },
//   yearOfAdmission: { type: Number, required: true },
//   session: { type: String, required: true },
//   dob: { type: Date, required: true },
//   country: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);


import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true,
    trim: true
  },
  middleName: { 
    type: String, 
    default: '',
    trim: true
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  lga: { 
    type: String, 
    required: true,
    trim: true
  },
  state: { 
    type: String, 
    required: true,
    trim: true
  },
  documents: [{
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    documentType: { 
      type: String,
      enum: ['identification', 'academic', 'medical', 'other'],
      default: 'other'
    }
  }],
  registrationNumber: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  healthStatus: { 
    type: String, 
    required: true,
    trim: true
  },
  sex: { 
    type: String, 
    required: true, 
    enum: ['male', 'female', 'other'],
    lowercase: true
  },
  course: { 
    type: String, 
    required: true,
    trim: true
  },
  level: { 
    type: String, 
    required: true,
    trim: true
  },
  yearOfAdmission: { 
    type: Number, 
    required: true,
    min: 1900,
    max: new Date().getFullYear()
  },
  session: { 
    type: String, 
    required: true,
    trim: true
  },
  dob: { 
    type: Date, 
    required: true,
    max: new Date()
  },
  country: { 
    type: String, 
    required: true,
    trim: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for improved query performance
studentSchema.index({ email: 1 });
studentSchema.index({ registrationNumber: 1 });
studentSchema.index({ yearOfAdmission: 1 });

// Virtual for student's age
studentSchema.virtual('age').get(function() {
  return Math.floor((new Date() - this.dob) / (365.25 * 24 * 60 * 60 * 1000));
});

// Virtual for full name
studentSchema.virtual('fullName').get(function() {
  if (this.middleName) {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to ensure consistent data
studentSchema.pre('save', function(next) {
  // Convert email to lowercase
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  
  // Convert sex to lowercase
  if (this.sex) {
    this.sex = this.sex.toLowerCase();
  }
  
  next();
});

const Student = mongoose.model('Student', studentSchema);

export default Student;