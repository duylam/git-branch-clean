# git-gc

A command line tool to clean up unused git branches

<!-- toc -->

- [1. Usage](#1-usage)
- [2. Contribution](#2-contribution)
  * [2.1 Setup](#21-setup)
  * [2.2 Getting started](#22-getting-started)
  * [2.3 Other development commands](#23-other-development-commands)

<!-- tocstop -->

## 1. Usage

1. Install the tool

```bash
npm i -g git-gc
```

2. Locate to a git folder
3. Remove unused branches, one of below flow

**3.a** For local branches

```bash
git-gc
```

**3.b** For remote branches

```bash
git-gc -r origin
```

4. Your git folder is clean now

## 2. Contribution

### 2.1 Setup

- [NodeJs](https://nodejs.org/en/) v8.x

### 2.2 Getting started

1. `npm install` to install dependencies.
1. `npm start` to begin watching file changed and auto build to `build` folder.
1. Temporarily alter `$PATH` to launch `index.js` as command line: `PATH=$PATH:/this-folder/build`
1. Move to another git folder and run the command line: `cd /some/git/folder; DEBUG=git-gc index.js --help`
1. Begin coding and submit Pull Request :)

### 2.3 Other development commands

- `npm run format` to format the code nicer
- `npm run lint` to run static code checker
- `npm run build` to build code into **./build** folder
- `npm run package` to bundle **./build** folder and put outcome to **./dist** for publishing
- `npm run update-toc` to update Table of Content this file
- Create dummy local and remote (name "origin") git branches by running script [./scripts/create-dummy-branches.sh](./scripts/create-dummy-branches.sh) at any git folder
