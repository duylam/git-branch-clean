import argv from 'yargs';

export default argv
  .env('GITS')
  .option('w', {
    alias: 'app-name',
    default: 'gits',
    describe: 'The Heroku app. Can set through env var GITS_APP_NAME',
    type: 'string'
  })
  .help('h')
  .alias('h', 'help')
  .argv;
