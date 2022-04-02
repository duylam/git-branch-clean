#!/usr/bin/env node
import omit from 'lodash/omit';
import eachSeries from 'async/eachSeries';
import BPromise from 'bluebird';
import * as config from './config';
import {execAsync, ensureGitFolder, prompt, exit, debug, setupDebug} from './util';
import * as git from './git';

setupDebug('git-branch-clean');
main();

async function main() {
  debug('Command line options');
  debug(omit(config, 'exitIfConfigInvalid'));

  config.exitIfConfigInvalid();

  try {
    debug('Validating .git folder');
    await execAsync('git show HEAD');
  } catch (err) {
    debug(err);
    exit(
      `'${process.cwd()}' is not a git folder (no .git). Please execute again inside a git folder.`
    );
  }

  try {
    if (config.remoteName) {
      console.log(`Fetching remote repo name '${config.remoteName}'`);
      await execAsync(`git fetch ${config.remoteName}`);
    } else {
      console.log(`Switching to branch '${config.stayBranch}'`);
      await execAsync(`git checkout ${config.stayBranch}`);
    }

    const branchNamesToDelete = await git.getBranchesForDeleting(config.remoteName, {
      keepBranches: config.keepBranches,
      stayBranch: config.stayBranch
    });

    if (!config.remoteName) {
      if (branchNamesToDelete.length === 0) {
        exit('Found one branch only, nothing to clean up.', {warning: true});
      }
    }

    console.log(
      config.remoteName
        ? `Following remote branches at '${config.remoteName}' will be deleted:`
        : 'Following local branches will be deleted:'
    );
    for (const name of branchNamesToDelete) {
      console.log(`  ${name}`);
    }

    if (!config.noConfirm) {
      const answer = await prompt(
        "Type 'y' to delete above branch or any key for canceling, then hit Enter: "
      );
      if (answer !== 'y') {
        console.log('Exited!');
        process.exit(0); // exits as success
      }
    }

    console.log(`Deleting ${config.remoteName ? 'remote' : 'local'} branches ...`);
    const deletedBranchNames = await git.deleteBranches(branchNamesToDelete, {
      repoRemoteName: config.remoteName,
      force: config.force
    });

    if (deletedBranchNames.length === branchNamesToDelete.length) {
      console.log('Finished!');
    } else {
      if (deletedBranchNames.length === 0) {
        console.log('No branch deleted!');
      } else {
        console.log('Finished partially, below are ones deleted:');
        for (const name of deletedBranchNames) {
          console.log(`  ${name}`);
        }
      }
    }
  } catch (err) {
    debug(err);
    exit(`Error: ${err.message}`);
  }
}
