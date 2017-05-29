#!/usr/bin/env node
'use strict';

const program = require('commander');

const logger = require('../logger');
const config = require('../config');
const utils = require('../utils');


program
    .allowUnknownOption()
    .usage('<app version> -ts <[v,c,i,a,f,j,z,e]>[options]')
    .option('-p, --config <config>', 'config file for app distribution', config.path)
    // .option('-l, --app-version-label <version>', 'app version label')
    .option('-a, --android-version-code <version code>', 'Android version code')
    .option('-i, --ios-bundle-version <bundle version>', 'iOS bundle version')
    .option('-c, --change-log <change-log.txt or "First edit***Other edit...">', 'file path or list with "***" separator', config.changeLog)
    .option('-t, --tasks <[v,c,i,a,f,j,z,e]>', `
      v : preprocess file seting app version
      c : builds HTML, CSS, JAVSCRIPT files for Cordova projects
      i : builds, archives ad exports iOS project
      a : builds, archives ad exports Android project
      f : uploads builds on remote FTP server
      j : updates build.json file on remote FTP server
      z : archives www sources with NodeJS server to test and view
      e:  send email when finish with URL and QRCode for download`, config.tasks)
    .option('-h, --hidden', 'hides build in HTML download page', config.hidden)
    .option('-v, --verbose', 'prints all log in console', config.verbose)
    .option('-f, --force', 'force with yes all questions', config.force)
    .parse(process.argv);

// Read and initialize config file
config.init({
    configPath: program.config,
    program: program
}).then(
    () => {
        // utils.printRecap();
        logger.debug(config);
    },
    err => {
        // logger.error(err.message);
        logger.error(err);
        program.help();
    }
);