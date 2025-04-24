
import tasks from "./routes/tasks.js";
import connectDB from "./utils/mongodbconnection.js";
import cors from "cors";
import express from "express";
import path from "path";
const app = express();

connectDB();

const allowedOrigins = [
    "http://localhost:3000",  
    //  "https://todo-list-f11l.onrender.com",  
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
app.use("/api/tasks", tasks);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.get("/", (req, res) => {
  res.send("Hey there, I am running on your end!");
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
