import express from "express";
import cors from "cors";
import "dotenv/config";
import carRouter from "./routes/car.routes.js";
import userRouter from "./routes/user.routes.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/cars", carRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
