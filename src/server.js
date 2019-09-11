import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import routes from './routes';

import './database';
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
// const nunjucks = require("nunjucks");
// const path = require("path");
// const flash = require("connect-flash");

class App {
  constructor() {
    this.express = express();
    Sentry.init(sentryConfig);
    this.isDev = process.env.NODE_ENV !== 'production';
    this.midlewares();
    // this.views();
    this.routes();
    this.exceptionHandler();
  }

  midlewares() {
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(express.json());
    this.express.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    // this.express.use(express.urlencoded({ extended: false }));
    // this.express.use(flash());
    // this.express.use(
    //   session({
    //     name: "root",
    //     resave: true,
    //     secret: "MyAppSecret",

    //     store: new FileStore({
    //       path: path.resolve(__dirname, "..", "tmp", "sessions")
    //     }),
    //     saveUninitialized: true
    //   })
    // );
  }

  // views() {
  //   nunjucks.configure(path.resolve(__dirname, "app", "views"), {
  //     autoescape: true,
  //     express: this.express,
  //     watch: this.isDev
  //   });
  //   this.express.use(express.static(path.resolve(__dirname, "public")));
  //   this.express.set("view engine", "njk");
  // }
  routes() {
    this.express.use(routes);
    this.express.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const error = new Youch(err, req).toJSON();
        res.status(500).json(error);
      }
      res.status(500).json({ error: 'INternal server error' });
    });
  }
}
export default new App(routes).express;
