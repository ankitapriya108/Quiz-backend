import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    // category: {
    //     type: String,
    //     enum: ['Sports', 'Movies', 'General'],
    //     required: true
    // },
    // difficultyLevel: {
    //     type: String,
    //     enum: ['easy', 'medium', 'hard'],
    //     required: true,
    //     index: true
    // },
    
    questionArray: [
        category: {
            type: String,
            enum: ['Sports', 'Movies', 'General'],
            required: true
        },
        difficultyLevel: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: true,
            index: true
        },
        
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
            }
        }
    ]
});
const Question = mongoose.model("Question", questionSchema);
export default Question;