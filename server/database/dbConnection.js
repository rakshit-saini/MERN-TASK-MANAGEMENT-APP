import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_TASK_MANAGEMENT",
    }) 
    .then(() => {
        console.log("connected to db")
    })
    .catch((err) => {
     console.log(err)
    });
};
