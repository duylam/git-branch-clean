import argv from 'yargs';

export default argv
  .option('f', {
    alias: 'force',
    default: false,
    describe: 'Force delete the branch e.g. like "git branch -D <name>"',
    type: 'boolean'
  })
  .option('k', {
    alias: 'keep-branches',
    default: 'master',
    describe: 'Comma delimited list of branch to not delete. Default is "master"',
    type: 'string'
  })
  .option('b', {
    alias: 'stay-branch',
    default: 'master',
    describe: 'Branch to switch to when doing deleting. Default is "master"',
    type: 'string'
  })
  .option('r', {
    alias: 'remote-name',
    default: '',
    describe: 'Delete branches at remote repo name.',
    type: 'string'
  })
  .option('n', {
    alias: 'no-confirm',
    default: false,
    describe: 'Skip confirmation. Default is false (requires confirmation)',
    type: 'boolean'
  })
  .help('h')
  .version('##VERSION##')
  .alias('h', 'help').argv;
