const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const sdkRoot = path.resolve(projectRoot, '../vpe-react-native');
const sdkLink = path.resolve(projectRoot, 'node_modules/vpe-react-native');

const isPortalLinked =
	fs.existsSync(sdkRoot) && fs.existsSync(sdkLink) && fs.lstatSync(sdkLink).isSymbolicLink();

const config = getDefaultConfig(projectRoot);

if (isPortalLinked) {
	const sdkPackage = require(path.join(sdkRoot, 'package.json'));
	const peerDeps = Object.keys(sdkPackage.peerDependencies || {});

	config.watchFolders = [sdkRoot];

	config.resolver.blockList = peerDeps.map(
		(name) =>
			new RegExp(
				`${sdkRoot.replace(/[/\\]/g, '[/\\\\]')}[/\\\\]node_modules[/\\\\]${name}[/\\\\].*`
			)
	);

	config.resolver.extraNodeModules = peerDeps.reduce((acc, name) => {
		acc[name] = path.join(projectRoot, 'node_modules', name);
		return acc;
	}, {});
}

module.exports = config;
