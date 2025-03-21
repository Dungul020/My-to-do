
import tasks from "./routes/tasks.js";
import connectDB from "./utils/mongodbconnection.js";
import cors from "cors";
import express from "express";
import path from "path";
const app = express();

connectDB();

const allowedOrigins = [
    "http://localhost:3000",  
    "https://todo-list-f11l.onrender.com",  
  ];

const __dirname = path.resolve();


  
  
  
  
  
  
 
  
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasks);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
