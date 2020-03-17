`git-gc` is a command line tool to clean up unused git branches

# Table of content

<!-- toc -->

- [1. Usage](#1-usage)
- [2. Contribution](#2-contribution)
  * [2.1 Setup](#21-setup)
  * [2.2 Getting started](#22-getting-started)
  * [2.3 Other development commands](#23-other-development-commands)

<!-- tocstop -->

## 1. Usage

1. Install it

```bash
npm i -g git-gc
```

2. `cd` to a git folder
3. Remove unused branches at

  - Local branches

  ```bash
  git-gc
  ```

  - Remote repo e.g. with name `origin`

  ```bash
  git-gc -r origin
  ```

4. Above command will print branches that it's going to remove, and ask for confirmation. Like below

```
$ git-gc
Switching to branch 'master'
Following local branches will be deleted:
  sample-branch-1
  sample-branch-2
  sample-branch-3
Type 'y' to delete above branch or any key for canceling, then hit Enter: y
Finished!
```

5. Your git folder (or remote git repo) is clean now

## 2. Contribution

### 2.1 Setup

- [NodeJs](https://nodejs.org/en/) v8.x

### 2.2 Getting started

1. `npm install` to install dependencies.
1. `npm start` to begin watching file changed and auto build to `build` folder.
1. Alter `$PATH` for launching `build/index.js`: `PATH=$PATH:/this-folder/build`
1. Move to another git folder (e.g `cd /some/git/folder) and run the tool: `DEBUG=git-gc index.js --help`
1. Begin coding. Pull Requests are welcome :)

### 2.3 Other development commands

- `npm run format` to format the code nicer
- `npm run lint` to run static code checker
- `npm run update-toc` to update Table of Content this file
- Create dummy local and remote (name "origin") git branches by running script [./scripts/create-dummy-branches.sh](./scripts/create-dummy-branches.sh) at any git folder
