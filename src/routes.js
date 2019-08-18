import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import authMiddleware from './app/middleware/auth';
import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedule', ScheduleController.index);

routes.post('/files', upload.single('file'), FileController.store);
// const DashboardController = require("./app/controllers/DashboardController");
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
