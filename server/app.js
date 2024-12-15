import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
import path from "path";
const app = express();
dotenv.config({ path: "./config/config.env" });

const _dirname = path.resolve()

app.use(
  cors({
    origin: "https://mern-task-management-app-4l18.onrender.com",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.use(express.static(path.join(_dirname, "/client/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
})
dbConnection();

app.use(errorMiddleware);

export default app;
