import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    teacherId: 
    {
        type: String,
        // required: true,
        unique: true
    },
    username: 
    {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
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
    password: {
        type: String,
        required: true
    },
    noOfSubjects: {
        type: Number,
        default: 0
    },
    profilePic: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'teacher'
    }
}, { timestamps: true });
const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
