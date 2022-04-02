![npm](https://img.shields.io/npm/v/@duylam/git-branch-clean)

A NodeJS-based command line tool to clean up unused git branches

**Table of content**

<!-- toc -->

- [1. Usage](#1-usage)
  * [1.1. Install the tool](#11-install-the-tool)
  * [1.2. How to use](#12-how-to-use)
- [2. Contribution](#2-contribution)
  * [2.1. Setup](#21-setup)
  * [2.2. Develop](#22-develop)
    + [2.3. Other development utilities](#23-other-development-utilities)

<!-- tocstop -->

---

# 1. Usage

> This tool is a command line executable, please use Terminal application

## 1.1. Install the tool

1. Install [NodeJS](https://nodejs.org/en/download/). The minimum version supported is v8.x
1. Install the command line tool

```bash
npm install -g @duylam/git-branch-clean
```

## 1.2. How to use

1. `cd` to directory of a git repository
1. To see the usage guideline

```bash
git-branch-clean --help
```

3. Below are some commands for common clean-up cases

- To remove unused branches in local repo

```bash
git-branch-clean
```

- To remove unused branches in remote repo named `origin` 

```bash
git-branch-clean -r origin
```

# 2. Contribution

## 2.1. Setup

- Install [NodeJs](https://nodejs.org/en/download/) v8.17.0

## 2.2. Develop

1. Run `npm install` to install dependencies.
1. Run `npm start` to begin watching file changes and auto build to `build` folder.
1. Temporarily create an variable for the path of this repo

```bash
export GBC_DIR=`pwd`
```

4. `cd` to another dir having git repo
1. Execute the tool

```bash
DEBUG=git-branch-clean node $GBC_DIR/build/index.js --help
```

6. Code :)

### 2.3. Other development utilities

- `npm run format` to format the code nicer
- `npm run lint` to run static code checker
- `npm run update-toc` to update the Table of Content in this file
- To create dummy local and remote (named `origin`) git branches for coding, run the script [./scripts/create-dummy-branches.sh](./scripts/create-dummy-branches.sh) at any git repo
