import {
	View,
	StyleSheet,
	Platform,
	StatusBar,
	ScrollView,
	useColorScheme,
	TouchableOpacity,
	Text,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Mokup from './mokup';
import MokupList from './mokupList';
import { CaretLeftIcon } from 'phosphor-react-native';

export default function App() {
	const navigation = useNavigation();

	const [isFullScreen, setIsFullScreen] = useState(false);
	StatusBar.setBarStyle('dark-content');

	const playerRef = useRef(null);

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right', '']} />
			<StatusBar barStyle={'dark-content'} hidden={isFullScreen ? true : false} />

			<VpePlayer
				ref={playerRef}
				devTestAppId={'com.vpe.rn.testapp.v3'}
				accessKey={'d3da8c1ea26e05cde1da9963cb41c973'}
				platform={'pub'}
				stage={'prod'}
				backButton={() => {
					return (
						<TouchableOpacity
							onPress={() => {
								if (navigation.canGoBack()) {
									navigation.goBack();
								}
							}}
						>
							<CaretLeftIcon size={22} color={'#ffffff'} />
						</TouchableOpacity>
					);
				}}
				events={{
					fullScreen: (data) => {
						setIsFullScreen(data.isFullScreen);
					},
				}}
				options={{
					playlist: [
						{
							file: 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
						},
					],
					autostart: true, //구현완료
					muted: true, //구현완료
					aspectRatio: '16/9', //구현완료
					objectFit: 'contain', //구현완료
					lowLatencyMode: true,
				}}
			/>

			{!isFullScreen && (
				<View style={{ padding: 10 }}>
					<View>
						<Text>Live 데모</Text>
					</View>
				</View>
			)}
		</SafeAreaProvider>
	);
}
