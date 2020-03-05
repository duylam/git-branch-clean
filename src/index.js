#!/usr/bin/env node

import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import _debug from 'debug';
import os from 'os';
import $ from 'lodash';

import cliOptions from './cli-options';
import {execAsync, ensureGitFolder} from './utils';

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

  try {
    await execAsync(`git checkout ${cliOptions.b}`);
    console.debug(`Switched to branch ${cliOptions.b}`);
  }
  catch (err) {
    debug(err);
    exit(`Switching failed, error: ${err.message}.`);
  }

  try {
    const [stdout] = await execAsync('git branch');

    const branchLines = stdout.split(os.EOL);
    if (branchLines.length === 1) {
      console.debug('Only one local branch remains, nothing to clean up.');
      process.exit(0);
    }

    const branchNamesToDelete = branchLines
      .filter((name) => !name.startsWith('*')) // exclude current branch
      .map((name) => name.trim())
      .filter($.identity); // "git checkout" give one empty line

    console.debug('Following branches will be deleted');
    for (const name of branchNamesToDelete) {
      console.debug(` - ${name}`);
    }
  }
  catch (err) {
    debug(err);
    exit(`Unknown error: ${err.message}.`);
  }
}

function exit(message) {
  console.debug(message);
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
