import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';
// const multerConfig = require('./config/multer')
// const upload = require('multer')(multerConfig)
const routes = new Router();
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
// const SessionController = require("./app/controllers/SessionController");
// const DashboardController = require("./app/controllers/DashboardController");
// const FileController = require("./app/controllers/FileController");
// const AppointmentController = require("./app/controllers/AppointmentController");

// const authMiddleware = require("./app/middleware/auth");
// const guestMiddleware = require("./app/middleware/guest");

// routes.use((req, res, next) => {
//   res.locals.flashSuccess = req.flash("success");
//   res.locals.flashError = req.flash("error");
//   return next();
// });
// routes.get("/files/:file", FileController.show);
// routes.get("/", guestMiddleware, SessionController.create);
// routes.post("/signin", SessionController.store);
// routes.get("/signup", guestMiddleware, UserController.create);
// routes.post("/signup", upload.single("avatar"), UserController.store);

// routes.use("/app", authMiddleware);
// routes.get("/app/logout", SessionController.destroy);
// routes.get("/app/dashboard", DashboardController.index);
// routes.get("/app/appointments/new/:provider", AppointmentController.create);

export default routes;
