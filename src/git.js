import os from 'os';
import trim from 'lodash/trim';
import identity from 'lodash/identity';
import mapSeries from 'async/mapSeries';
import {execAsync, exit, debug} from './util';

/**
 * Return either local or remote branches that will be delted
 * @param  {String} repoRemoteName The remote name. Default is null
 * @param  {Array<String>} options.keepBranches Branch to keep, expect at least 'master'
 * @param  {String} options.keepBranches        Exclude this branch from returned value
 * @return {Array} Branches to delete. They're either remote or local names
 */
export async function getBranchesForDeleting(
  repoRemoteName = null,
  {keepBranches, stayBranch} = {}
) {
  let branchNamesToDelete;
  const [stdout] = await execAsync(
    repoRemoteName ? `git branch -r --list ${repoRemoteName}/*` : 'git branch --list'
  );

  debug(`Executed 'git branch --list'. Stdout:`);
  debug(stdout);

  const stdoutLines = stdout
    .split(os.EOL)
    .map(trim)
    .filter(identity);

  if (repoRemoteName) {
    branchNamesToDelete = stdoutLines.map(name => name.replace(`${repoRemoteName}/`, ''));
  } else {
    // Excludes current branch
    branchNamesToDelete = stdoutLines.filter(name => {
      return !name.startsWith('*') || name === stayBranch;
    });
  }

  if (repoRemoteName) {
    // Remove entry "HEAD -> origin/master" from git's stdout
    branchNamesToDelete = branchNamesToDelete.filter(name => !name.startsWith('HEAD ->'));
  }

  branchNamesToDelete = branchNamesToDelete.filter(name => !keepBranches.includes(name));

  return branchNamesToDelete;
}

/**
 * Delete branches
 * @param  {Array} names                   Branch names
 * @param  {String} options.repoRemoteName
 * @param  {Boolean} options.force
 * @return {Array}
 */
export async function deleteBranches(names, {repoRemoteName = null, force = false} = {}) {
  const deletedBranches = await mapSeries(names, (branchName, done) => {
    const gitCmd = repoRemoteName
      ? `git push ${repoRemoteName} :${branchName}`
      : `git branch ${force ? '-D' : '-d'} ${branchName}`;
    execAsync(gitCmd).then(
      () => {
        done(null, branchName);
      },
      err => {
        if (err.message.includes('is not fully merged')) {
          /**
           * Full error from git
           *
           * error: The branch 'git-gc-1' is not fully merged.
           * If you are sure you want to delete it, run 'git branch -D git-gc-1'.
           */
          console.log(
            `Warning: branch '${branchName}' isn't merged. You may use option '--force' (applied for all branches) if you don't need it any more. Leave the branch as is`
          );
        } else {
          console.log(
            `Warning: deleting branch '${branchName}'' fails, error message: ${err.message}'`
          );

          debug(`Error on deleting branch ${branchName} at remote name ${repoRemoteName}:`);
          debug(err);
        }

        done(null, null);
      }
    );
  });

  return deletedBranches.filter(identity);
}
