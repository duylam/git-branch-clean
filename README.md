# git-branch-clean

![npm](https://img.shields.io/npm/v/@duylam/git-branch-clean)

A command line tool to clean up unused git branches

**Table of content**

<!-- toc -->

- [1. Usage](#1-usage)
- [2. Contribution](#2-contribution)
  * [2.1 Setup](#21-setup)
  * [2.2 Getting started](#22-getting-started)
  * [2.3 Other development commands](#23-other-development-commands)

<!-- tocstop -->

## 1. Usage

1. Install [nodejs](https://nodejs.org/en/download/). The minimum version supported is v8.x or newer
1. Install the command line tool

```bash
npm i -g @duylam/git-branch-clean
```

3. `cd` to a git folder
1. To remove unused branches at
  - local branches
  ```bash
  git-branch-clean
  ```
  - remote repo with name `origin`
  ```bash
  git-branch-clean -r origin
  ```
5. Above command prints branches that will be removed, and asks for confirmation. Below is how it looks like

```bash
$ git-branch-clean
Switching to branch 'master'
Following local branches will be deleted:
  sample-branch-1
  sample-branch-2
  sample-branch-3
Type 'y' to delete above branch or any key for canceling, then hit Enter: y
Finished!
```

6. Finished! Your git folder (or remote git repo) is clean now. See more options with `git-branch-clean -h`

## 2. Contribution

### 2.1. Setup

- [NodeJs](https://nodejs.org/en/download/) v8.x

### 2.2. Getting started

1. Run `npm install` to install dependencies.
1. Run `npm start` to begin watching file changes and auto build to `build` folder.
1. Alter `$PATH` for launching `build/index.js`: `PATH=$PATH:/this-folder/build`
1. Move to another git folder (e.g `cd /some/git/folder`) and run the tool: `DEBUG=git-branch-clean index.js --help`
1. Begin coding, Pull Requests are welcome :)

### 2.3. Other development commands

- `npm run format` to format the code nicer
- `npm run lint` to run static code checker
- `npm run update-toc` to update the Table of Content in this file
- To create dummy local and remote (name "origin") git branches for coding, run the script [./scripts/create-dummy-branches.sh](./scripts/create-dummy-branches.sh) at any git folder
