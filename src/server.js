import express from 'express';
import { resolve } from 'path';
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
    this.isDev = process.env.NODE_ENV !== 'production';
    this.midlewares();
    // this.views();
    this.routes();
  }

  midlewares() {
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
  }
}
export default new App(routes).express;
