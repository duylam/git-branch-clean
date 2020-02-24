import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import _debug from 'debug';
import config from './config';
import {execAsync, ensureGitFolder} from './utils';

const debug = _debug('gits');
main()

async function main() {
  debug('Command line options');
  debug(omit(config, '_', '$0'));

  await ensureGitFolder(__dirname);

  if (!isNil(config.r)) {
    await execAsync(`git fetch ${config.r}`);
    debug('Ran "git fetch"');
  }

  await execAsync(`git checkout ${config.b}`);
  debug('Ran "git checkout"');
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
