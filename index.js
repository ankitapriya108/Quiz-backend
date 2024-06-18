
import express from "express";
    import mongoose from "mongoose";
    import dotenv from "dotenv";
    import cors from "cors";
    import questionRoutes from "./routes/questionRoutes.js"; 
    import userRoutes from "./routes/userRoutes.js";

    dotenv.config();

    const app = express();
    const port = 3000;

    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/questions", questionRoutes);
    app.use("/users", userRoutes);
    app.use('/get_questions',questionRoutes )
    app.use('/get_categories',questionRoutes )
    app.use('/submit_quiz',questionRoutes )

    const username = process.env.MONGO_USERNAME;
    const password = encodeURIComponent(process.env.MONGO_PASSWORD);
    const dbName = "Quiz"

  

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



   