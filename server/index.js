
import tasks from "./routes/tasks.js";
import connectDB from "./utils/mongodbconnection.js";
import cors from "cors";
import express from "express";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasks);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
