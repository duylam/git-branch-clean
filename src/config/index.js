import trim from 'lodash/trim';
import cli from './cli';

export const remoteName = cli.remoteName;
export const force = cli.force;
export const keepBranches = (cli.keepBranches || '').split(',').map(trim);
export const noConfirm = cli.noConfirm;

