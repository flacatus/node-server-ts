'use strict';

import 'dotenv/config';
import App from './app';
import VersionController from './version/version.controller';

const app = new App(
  [
    new VersionController(),
  ],
);

app.listen();
