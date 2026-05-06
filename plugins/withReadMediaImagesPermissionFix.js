const { withAndroidManifest } = require('expo/config-plugins');

module.exports = function withReadMediaImagesPermissionFix(config) {
	return withAndroidManifest(config, (config) => {
		const manifest = config.modResults.manifest;

		if (!manifest.$['xmlns:tools']) {
			manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
		}

		manifest['uses-permission'] = manifest['uses-permission'] || [];

		const permissionName = 'android.permission.READ_MEDIA_IMAGES';
		const existing = manifest['uses-permission'].find(
			(p) => p?.$?.['android:name'] === permissionName
		);

		if (existing) {
			existing.$['android:maxSdkVersion'] = '34';
			existing.$['tools:replace'] = 'android:maxSdkVersion';
		} else {
			manifest['uses-permission'].push({
				$: {
					'android:name': permissionName,
					'android:maxSdkVersion': '34',
					'tools:replace': 'android:maxSdkVersion',
				},
			});
		}

		return config;
	});
};
