'use strict';

import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import LOGGER from '../middleware/Log';
import { getProjectName, getProjectVersion } from '../utils/index';
import errorMiddleware from '../middleware/error.middleware';
// tslint:disable-next-line:no-var-requires
const git = require('git-last-commit');

class PostController implements Controller {
  public apiName = 'VersionAPI';
  public path = '/api/1.0.0';
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/version`, this.getProjectInfo);
  }

  private getProjectInfo = async (request: Request, response: Response) => {
    LOGGER.info(`Fetching API ${this.path}/version`);

    try {
      response.send(
        {
          name: getProjectName(),
          version : getProjectVersion(),
          git: await this.getGitInfo(),
          platform: process.platform,
          arch: process.arch,
          node: process.release,
        });
    } catch (error) {
      LOGGER.error(`Error fetching API ${this.path}/version > ${error}`);
      errorMiddleware(error, request, response);
    }
  }

  private async getGitInfo(): Promise<any> {
    return new Promise<any>((res, rej) => {
      git.getLastCommit((err: Error, commit: any) => (err ? rej(err) : res(commit)));
    });
  }
}

export default PostController;
