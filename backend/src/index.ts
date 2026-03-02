import express from "express";
import cors from "cors";
import "dotenv/config";
import carRouter from "./routes/car.routes.js";
import userRouter from "./routes/user.routes.js";
import notificationRouter from "./routes/notification.routes.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/cars", carRouter);
app.use("/api/users", userRouter);
app.use("/api/notifications", notificationRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
