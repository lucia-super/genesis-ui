const { exec } = require('child_process');
var fs = require('fs');
const path = require('path');


function execCommand(data) {
    var config = getConfigFile();
    config.modules = data;
    fs.writeFile("genesis.json", JSON.stringify(config), (error) => {
        if (!error) {
            const isExist = fs.existsSync("node_modules/genesis-tools/index.js");
            console.log("getModules : ", isExist);

            if (isExist) {
                exec('node node_modules/genesis-tools/index.js', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`执行的错误: ${error}`);
                        return;
                    } else {
                        console.log(`stdout && stderr: ${stdout} ${stderr}`);
                    }
                });
            } else {
                console.warn("*** warnning: Please use this tool based on a real project.");
            }
        }
    })
}

function getModules() {
    return getConfigFile().modules;
}

function getConfigFile() {
    const isExist = fs.existsSync("../../../genesis.json");
    if (isExist) {
        var config = require('../../../genesis.json');
        return config;
    } else {
        var config = require('../genesis.json');
        return config;
    }
}

module.exports = {
    execCommand, getModules
}