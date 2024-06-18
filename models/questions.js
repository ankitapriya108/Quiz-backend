import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    difficultyLevel: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
        index: true
    },
    questionArray: [
        {
            que: {
                type: String,
                required: true
            },
            options: {
                type: [String],
                required: true
            },
            answer: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            }
        }
    ]
});
const Question = mongoose.model("Question", questionSchema);
export default Question;