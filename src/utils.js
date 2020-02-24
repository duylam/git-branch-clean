import BPromise from 'bluebird';
import * as fs from 'fs';
import * as cp from 'child_process';

const stat = BPromise.promisify(fs.stat, {context: fs});

export const execAsync = BPromise.promisify(cp.exec, {multiArgs: true, context: cp});

export async function ensureGitFolder(path) {
  // TODO: check current and parent folders (go to root)
}
