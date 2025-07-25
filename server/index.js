import tasks from "./routes/tasks.js";
import connectDB from "./utils/mongodbconnection.js";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();
connectDB();

const __dirname = path.resolve();

// ✅ Add your real deployed frontend URL here
const allowedOrigins = [
  "http://localhost:3000",
  "https://my-to-do-app-fqk3.onrender.com", // ✅ Your React frontend Render URL
];

// ✅ Configure CORS to allow requests from allowedOrigins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ API route
app.use("/api/tasks", tasks);

// ✅ Root route (optional for testing)
app.get("/", (req, res) => {
  res.send("Hey there, I am running on your end!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
