#!/bin/bash

echo "Creating 05 branches with pattern 'git-branch-clean-<number>' in local and remote 'origin' name"

for i in {1..5}
do
   git checkout -b "git-branch-clean-$i" &> /dev/null
   git push origin master:"git-branch-clean-$i" &> /dev/null
done

echo "Finished!"
