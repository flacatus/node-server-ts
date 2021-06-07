/**
 * Creates & maintains the log
 */

import * as fs from 'fs';
import * as path from 'path';
import { Logger } from 'tslog';

class Log {
  public baseDir: string;
  public fileName: string;
  public linePrefix: string;
  public log: Logger;

  public today: Date = new Date();

  constructor() {
    const dateString = `${this.today.getFullYear()}-${(this.today.getMonth() + 1)}-${this.today.getDate()}`;
    const timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;

    this.baseDir = path.join(__dirname, '../../logs/');
    this.log = new Logger();
    this.fileName = `${dateString}.log`;
    this.linePrefix = `[${dateString} ${timeString}]`;
  }

  public info (logString: string): void {
    this.log.info(logString);

    this.addLog('INFO', logString);
  }

  public warn (logString: string): void {
    this.log.warn(logString);

    this.addLog('WARN', logString);
  }

  public error (logString: string): void {
    this.log.error(logString);

    this.addLog('ERROR', logString);
  }

/**
 * Creates the file if does not exist, and
 * append the log kind & string into the file.
 */
  private addLog (kind: string, logString: string): void {
    // tslint:disable-next-line:no-parameter-reassignment
    kind = kind.toUpperCase();

    fs.open(`${this.baseDir}${this.fileName}`, 'a', (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // tslint:disable-next-line:no-shadowed-variable
        fs.appendFile(fileDescriptor, `${this.linePrefix} [${kind}] ${logString}\n`, (err) => {
          if (! err) {
            // tslint:disable-next-line:no-shadowed-variable
            fs.close(fileDescriptor, (err) => {
              if (! err) {
                return true;
              }
              return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended');

            });
          } else {
            return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file');
          }
        });
      } else {
        return console.log('\x1b[31m%s\x1b[0m', 'Error cloudn\'t open the log file for appending');
      }
    });
  }

}

// tslint:disable-next-line:new-parens
export default new Log;
