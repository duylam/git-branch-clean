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
    alias: 'branch',
    default: 'master',
    describe: 'Branch to stay when doing deleting. Default is "master"',
    type: 'string'
  })
  .option('r', {
    alias: 'remote-name',
    default: '',
    describe: 'Delete branches at remote repo with given name. Default is not delete any remote repo',
    type: 'string'
  })
  .option('n', {
    alias: 'no-confirm',
    default: false,
    describe: 'No wait for confirmation. Default is false',
    type: 'boolean'
  })
  .help('h')
  .alias('h', 'help')
  .argv;
