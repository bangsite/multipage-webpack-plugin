const path = require('path');
const MultipageWebpackPlugin = require('../../src/plugin.js');
const webpack = require('webpack');
const fs = require('fs'); 

// buildEntries = {entryChunkName: './abs/path/to/entry'};

let buildEntries = {};

const packages = fs.readdirSync(path.join(__dirname, 'packages', 'subfolder'));

for (let packageName of packages) {
  let packageEntryPath = path.join(__dirname, 'packages', 'subfolder', packageName, 'src', 'resources', 'assets')
  let entries = fs.readdirSync(packageEntryPath);

  entries.forEach(entryDirectoryName => {
    // TODO: Maybe a cooler name thats not so lame (and not rhyming in this todo)
    let buildEntriesKeyName = `entry${entryDirectoryName}ForPackage${packageName}`;
    buildEntries[buildEntriesKeyName] = path.join(packageEntryPath, entryDirectoryName, "index.js");
  });
}

console.log(buildEntries);

let config = {
  context: __dirname,
  entry: buildEntries,
  output: {
    filename: '[name].chunk.js',
    path: path.resolve(__dirname,'./dist')
  },
  plugins: [
    new MultipageWebpackPlugin()
  ]
};

module.exports = config;
