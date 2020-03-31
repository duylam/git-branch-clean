#!/bin/bash

echo "Begin creating 05 local branches with pattern 'git-branch-clean-<number>'"

for i in {1..5}
do
   git checkout -b "git-branch-clean-$i" &> /dev/null
   git push origin master:"git-branch-clean-$i" &> /dev/null
done

echo "Finished!"
