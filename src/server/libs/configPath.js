import path from 'path';
import Debug from 'debug';
import chalk from 'chalk';

const debug = Debug('configPath');
/**
 *  Set up configuration path
 */
process.env.NODE_CONFIG_DIR = path.join(__dirname, './../config');
debug(chalk.bgGreen.black(` Environment : ${process.env.NODE_ENV} `));
