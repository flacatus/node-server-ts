'use strict';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import Controller from './interfaces/controller.interface';
import LOG from './middleware/Log';

class App {
  public app: express.Application;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      LOG.info(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
