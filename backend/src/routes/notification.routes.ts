import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { authorized } from "../middlewares/authorized.meddleware.js";
import { Role } from "../generated/prisma/enums.js";
import {
  deleteMessage,
  fromClientMessage,
  getMessage,
  sendMessage,
} from "../controllers/notification.controller.js";
const route = Router();

route.post("/create", authentication, authorized([Role.ADMIN]), sendMessage);

route.get(
  "/get-myMessages",
  authentication,
  authorized([Role.CUSTOMER]),
  getMessage,
);

route.delete(
  "/delete/:id",
  authentication,
  authorized([Role.ADMIN]),
  deleteMessage,
);

route.post("/fromClient", authentication, fromClientMessage);

export default route;
