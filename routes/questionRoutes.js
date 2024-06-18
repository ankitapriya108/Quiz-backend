import express from "express";
import Question from "../models/questions.js";

const router = express.Router();

router.post('/addQuestions', async (req, res) => {
    const { difficultyLevel, questions } = req.body;

    if (!difficultyLevel) {
        return res.status(400).json({ message: "difficultyLevel is required" });
    }

    try {
        const newQuestion = new Question({
            difficultyLevel,
            questionArray: questions.map(q => ({
                que: q.que,
                options: q.options,
                answer: q.answer,
                category: q.category
            }))
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/getQuestions', async (req, res) => {
    const { difficultyLevel } = req.query;

    try {
        let questions;
        if (difficultyLevel) {
            questions = await Question.find({ difficultyLevel });
        } else {
            questions = await Question.find();
        }

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
