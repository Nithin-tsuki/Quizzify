import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        // required: true,
        unique: true
    },
    username: {
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
    role: {
        type: String,
        default: 'student'
    },
    // phoneNo: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    profilePic: {
        type: String,
        default: ''
    },
    points: {
        type: Number,
        default: 0
    },
    dailyStreak: {
        type: Number,
        default: 0
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    challengesWon: {
        type: Number,
        default: 0
    },
    coursesCompleted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    quizAttended: {
        type: Number,
        default: 0
    },
    quizzesAttempted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }]
});    
const Student = mongoose.model('Student', studentSchema);
export default Student;
