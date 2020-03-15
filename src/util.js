import BPromise from 'bluebird';
import * as fs from 'fs';
import * as cp from 'child_process';
import readline from 'readline';
import $debug from 'debug';

let _debug;
const stat = BPromise.promisify(fs.stat, {context: fs});

export const execAsync = BPromise.promisify(cp.exec, {
  multiArgs: true,
  context: cp
});

export async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return await new BPromise(resolve => {
    rl.question(question, ans => {
      rl.close();
      resolve(ans);
    });
  });
}

/**
 * Print message to console and exit
 * @param  {String} message         The message to print to console
 * @param  {Boolean} options.warning  Flag for printing as error or warning
 */
export function exit(message, {warning = false} = {}) {
  warning ? console.log(message) : console.error(message);
  process.exit(1);
}

export function setupDebug(ns) {
  _debug = $debug(ns);
}

export function debug() {
  _debug.apply(null, arguments);
}
