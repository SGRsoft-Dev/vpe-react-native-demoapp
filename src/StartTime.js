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

import { CaretLeftIcon } from 'phosphor-react-native';
import { loadKey } from './lib/lickeyhook';

export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();

	const [isFullScreen, setIsFullScreen] = useState(false);
	const [startDateTime, setStartDateTime] = useState(null);
	const playerRef = useRef(null);

	useEffect(() => {
		const now = new Date();
		now.setMinutes(now.getMinutes() + 1);
		setStartDateTime(now);
	}, []);

	const formattedDateTime = startDateTime
		? `${startDateTime.getFullYear()}-${String(startDateTime.getMonth() + 1).padStart(2, '0')}-${String(
				startDateTime.getDate()
			).padStart(2, '0')} ${String(startDateTime.getHours()).padStart(2, '0')}:${String(
				startDateTime.getMinutes()
			).padStart(2, '0')}:00`
		: '';

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right', '']} />
			<StatusBar barStyle={'dark-content'} hidden={isFullScreen ? true : false} />

			<VpePlayer
				ref={playerRef}
				devTestAppId={lkey.testAppId}
				accessKey={lkey.testKey}
				platform={lkey.isGov ? 'gov' : 'pub'}
				stage={lkey.isBeta ? 'beta' : 'prod'}
				isDev={lkey.isDev ? true : false}
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
							file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
							poster: 'https://vvbk6ieu540.edge.naverncp.com/files/202309/97a26e48665c41e88d6920708e7eb7a7.png',
							description: {
								title: '네이버클라우드 소개 영상',
								created_at: '2025.08.20',
								profile_name: '네이버클라우드',
								profile_image:
									'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
							},
						},
					],
					autostart: true, //구현완료
					muted: true, //구현완료
					setStartTime: startDateTime,
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<Text>최초공개일 예제 : {formattedDateTime}</Text>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
