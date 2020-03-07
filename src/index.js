#!/usr/bin/env node

import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import _debug from 'debug';
import os from 'os';
import $ from 'lodash';
import eachSeries from 'async/eachSeries';
import BPromise from 'bluebird';

import cliOptions from './cli-options';
import {execAsync, ensureGitFolder, prompt} from './utils';

const debug = _debug('git-gc');
main()

async function main() {
  debug('Command line options');
  debug(omit(cliOptions, '_', '$0'));

  try {
    debug('Validating .git folder');
    await ensureGitFolder(__dirname);
  }
  catch (err) {
    debug(err);
    exit(`Folder ${__dirname} isn't a git folder (no .git folder).`);
  }

  if (cliOptions.remoteName) {
    console.log(`Fetching remote git repo name: ${cliOptions.remoteName}`);
    await execAsync(`git fetch ${cliOptions.remoteName}`);
  }

  try {
    await execAsync(`git checkout ${cliOptions.b}`);
    console.log(`Switched to branch ${cliOptions.b}`);
  }
  catch (err) {
    debug(err);
    exit(`Switching failed, error: ${err.message}.`);
  }

  try {
    const [stdout] = await execAsync(
      cliOptions.remoteName ? `git branch -r --list ${cliOptions.remoteName}/*` : 'git branch --list');

    const branchLines = stdout.split(os.EOL);
    if (branchLines.length === 1) {
      console.log('Only one branch remains, nothing to clean up.');
      process.exit(0);
    }

    let branchNamesToDelete;

    if (cliOptions.remoteName) {
      branchNamesToDelete = branchLines.map((name) => name.replace(`${cliOptions.remoteName}/`, ''));
    }
    else {
      // exclude current branch
      branchNamesToDelete = branchLines.filter((name) => !name.startsWith('*'));
    }

    branchNamesToDelete = branchNamesToDelete
      .map((name) => name.trim())
      .filter($.identity); // "git checkout" give one empty line

    console.log('Following branches will be deleted');
    for (const name of branchNamesToDelete) {
      console.log(` - ${name}`);
    }

    if (!cliOptions.noConfirm) {
      const answer = await prompt("Type 'y' to delete above branch or any key for canceling, then hit Enter: ");
      if (answer === 'y') {
        const deletedBranchNames = [];

        await new BPromise((resolve) => {
          eachSeries(
            branchNamesToDelete,
            (branchName, done) => {
              execAsync(`git branch ${cliOptions.force ? '-D' : '-d'} ${branchName}`)
                .then(
                  () => {
                    deletedBranchNames.push(branchName);
                    done()
                  },
                  () => done()
                );
            },
            () => resolve()
          );
        });

        if (deletedBranchNames.length === branchNamesToDelete.length) {
          console.log('Deleted all!');
        }
        else {
          if (deletedBranchNames.length === 0) {
            console.log('None of branch are deleted!');
          }
          else {
            console.log("Deleted some, they're:");
            for (const name of deletedBranchNames) {
              console.log(` - ${name}`);
            }
          }
        }
      }
    }
  }
  catch (err) {
    debug(err);
    exit(`Unknown error: ${err.message}.`);
  }
}

function exit(message) {
  console.error(message);
  process.exit(1);
}
/*
#!/bin/bash

# Usage:
#   Move to the git folder and run script
#     - To delete local branches: LOCAL_BRANCH_DELETE_OPTS=-D ./script.sh.
#     - To delete remote branches: ./script.sh origin ('origin' is remote name)
# Note: This script doesn't delete 'master'

# Disable '*'
set -o noglob

remoteName=$1
listRemoteBranchOpt=''

localBranchDeleteOpts='-d'

if [ ! -z "$LOCAL_BRANCH_DELETE_OPTS"  ]; then
  localBranchDeleteOpts=$LOCAL_BRANCH_DELETE_OPTS
fi

if [ ! -z "$remoteName" ]; then
  echo "Fetching $remoteName ..."
  git fetch $remoteName

  echo "Prune $remoteName ..."
  git remote prune $remoteName
  listRemoteBranchOpt='-r'
fi

# Stay in master to avoid error on deleting current branch
git checkout master &>/dev/null

branches=`git branch $listRemoteBranchOpt | awk '{print $1}'`
for branch in $branches; do
  branchNameOnly=$branch

  if [ ! -z "$remoteName" ]; then
    # origin/prod --> prod
    branchNameOnly=${branch#"$remoteName/"}
  fi

  if [ "$branchNameOnly" != "master" -a "$branchNameOnly" != "*" -a "$branchNameOnly" != "HEAD" ]; then
    if [ ! -z "$remoteName" ]; then
      if [[ $branch =~ .*$remoteName/.* ]]; then
        echo "Delete $branch"
        git push $remoteName :$branchNameOnly
      fi
    else
      git branch $localBranchDeleteOpts $branch
    fi
  fi
done

echo "Finished!"
*/
