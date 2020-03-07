#!/bin/bash

echo "Begin creating 05 local branches with pattern 'git-gc-<number>'"

for i in {1..5}
do
   git checkout -b "git-gc-$i" &> /dev/null
done

echo "Finished!"
