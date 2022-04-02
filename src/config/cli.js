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
    default: '',
    describe: 'Comma delimited list of branch to not delete. Note that "master, main" are always kept so you don\'t have to specify them here',
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
    describe: 'Skip confirmation. Default is always asking for confirmation',
    type: 'boolean'
  })
  .help('h')
  .version('##VERSION##')
  .alias('h', 'help').argv;
