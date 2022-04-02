import trim from 'lodash/trim';
import cli from './cli';

export const remoteName = cli.remoteName;
export const force = cli.force;
export const keepBranches = (cli.keepBranches || '').split(',').map(trim);
export const stayBranch = (cli.stayBranch || '').trim();
export const noConfirm = cli.noConfirm;

export function exitIfConfigInvalid() {
  if (keepBranches.length === 0) {
    console.log(`No value for option --keep-branch. Expect at least one`);
    process.exit(-1);
  }
}

