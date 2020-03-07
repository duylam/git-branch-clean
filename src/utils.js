import BPromise from 'bluebird';
import * as fs from 'fs';
import * as cp from 'child_process';
import readline from 'readline';

const stat = BPromise.promisify(fs.stat, {context: fs});

export const execAsync = BPromise.promisify(cp.exec, {multiArgs: true, context: cp});

export async function ensureGitFolder(path) {
  // TODO: check current and parent folders (go to root)
}

export async function prompt(question) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return await new BPromise((resolve) => {
    rl.question(question, (ans) => {
        rl.close();
        resolve(ans);
    });
  });
}
