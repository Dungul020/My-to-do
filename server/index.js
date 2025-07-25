import tasks from "./routes/tasks.js";
import connectDB from "./utils/mongodbconnection.js";
import cors from "cors";
import express from "express";
import path from "path";
const app = express();

connectDB();

const allowedOrigins = [
    "http://localhost:3000",  // For local development
    "https://my-to-do-app-fqk3.onrender.com",  // Your deployed frontend
    // Add any other domains you need to allow
];

const __dirname = path.resolve();

// Enhanced CORS configuration
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,  // If you need to allow cookies/credentials
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
);

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use("/api/tasks", tasks);

app.get("/", (req, res) => {
    res.send("Hey there, I am running on your end!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
