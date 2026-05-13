const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const sdkRoot = path.resolve(projectRoot, '../vpe-react-native');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [sdkRoot];

const sdkPackage = require(path.join(sdkRoot, 'package.json'));
const peerDeps = Object.keys(sdkPackage.peerDependencies || {});
config.resolver.blockList = peerDeps.map(
	(name) => new RegExp(`${sdkRoot.replace(/[/\\]/g, '[/\\\\]')}[/\\\\]node_modules[/\\\\]${name}[/\\\\].*`)
);

config.resolver.extraNodeModules = peerDeps.reduce((acc, name) => {
	acc[name] = path.join(projectRoot, 'node_modules', name);
	return acc;
}, {});

config.resolver.disableHierarchicalLookup = false;

module.exports = config;
