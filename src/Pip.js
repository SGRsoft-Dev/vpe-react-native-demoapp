import { View, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loadKey } from './lib/lickeyhook';
export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();

	const [isFullScreen, setIsFullScreen] = useState(false);
	StatusBar.setBarStyle('dark-content');

	const playerRef = useRef(null);

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
				events={{
					backPress: () => {
						if (navigation.canGoBack()) {
							navigation.goBack();
						}
					},
					fullScreen: (data) => {
						setIsFullScreen(data.isFullScreen);
					},
				}}
				options={{
					playlist: [
						{
							file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
							poster: 'https://2ardrvaj2252.edge.naverncp.com/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_01.jpg',
							description: {
								title: '네이버클라우드 소개 영상',
								created_at: '2025.08.20',
								profile_name: '네이버클라우드',
								profile_image:
									'https://tkmenfxu2702.edge.naverncp.com/profile/202511/cf38c0603c57faacd99cbe6d967c38b3.png',
							},
						},
					],
					autostart: true,
					muted: true,
					aspectRatio: '16/9',
					objectFit: 'contain',

					autoPause: false, //false : Background 재생 설정
					allowsPictureInPicture: true, //PIP 설정
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<View style={{ padding: 10 }}>
							<View>
								<Text>Picture In Picture Demo</Text>
							</View>
							<View>
								<View
									style={{
										backgroundColor: '#000000',
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
									}}
								>
									<Text style={{ color: '#ffffff' }}> ⚠️ PIP 테스트는 실제 기기만 동작합니다.</Text>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
