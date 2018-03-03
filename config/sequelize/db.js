const defaultConfig = require('./db-default') ;

// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig =  require('./db-override');
const testConfig = require('./db-test');

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = testConfig;
} else {
    console.log(`Load ${defaultConfig}...`);
    config = defaultConfig;
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;