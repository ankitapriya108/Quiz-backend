
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const port = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = "Questions";

async function startServer() {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.r2vrqr2.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to MongoDB");

    app.listen(port, () => console.log("Server Started on port " + port));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();

const questionSchema = new mongoose.Schema({
    
       level: String,
       category: String,
       questionArray:[{
      
            text: String,
            options: [String],
            answer: String
}]
    
  });

const Question = mongoose.model("Question", questionSchema, "questions");

app.post('/save', async (req, res) => {
  
  try {
    const questions = req.body;
    const savedQuestions = await Question.insertMany(questions);
    res.json(savedQuestions);
    console.log("savedquestion",savedQuestions)
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).send('Error saving data');
  }
});


// app.post('/save', async (req, res) => {
//   try {
//     const questions = req.body;
    
//     if (!Array.isArray(questions)) {
//       return res.status(400).send('Expected an array of questions');
//     }

//     const savedQuestions = [];
    
//     for (let i = 0; i < questions.length; i++) {
//       const question = new Question(questions[i]);
//       const savedQuestion = await question.save();
//       savedQuestions.push(savedQuestion);
//     }

//     res.json(savedQuestions);
//     console.log("Saved questions:", savedQuestions);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Error');
//   }
// });

app.get('/questions/:level', async (req, res) => {
  try {
    const level = req.params.level;
    const questions = await Question.find({ level: level });
    console.log('Fetched questions:', questions);  // Log fetched questions
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Error fetching questions');
  }
});




