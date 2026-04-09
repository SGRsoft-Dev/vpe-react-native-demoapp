import { View, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Mokup from './mokup';
import MokupList from './mokupList';

import { loadKey } from './lib/lickeyhook';
export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();

	const [isFullScreen, setIsFullScreen] = useState(false);
	const playerRef = useRef(null);

	const customLayout = {
		mobile: {},
	};

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right']} />
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
					ready: () => {
						setTimeout(() => {
							//playerRef.current.pause();
						}, 4000);
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
							vtt: [
								{
									id: 'ko',
									file: 'https://vpe.sgrsoft.com/ncp_overview_script_kr_v2.vtt',
									label: '한국어',
									default: true,
								},
								{
									id: 'en',
									file: 'https://vpe.sgrsoft.com/ncp_overview_script_en_v2.vtt',
									label: 'English',
								},
							],
						},
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

					//리액트 전용
					screenRecordingPrevention: false,
					allowsPictureInPicture: true,
					autoPause: false,
					modalFullscreen: false,

					repeat: false,

					startMutedInfoNotVisible: false,

					//progressBarColor: '#ff0000',
					controlActiveTime: 3000,

					playRateSetting: [0.5, 0.75, 1, 1.5, 2],
					playIndex: 0,
					captionStyle: {
						// 캡션 환경설정
						fontSize: 12,
						color: '#FFFFFF',
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
						edgeStyle: 'dropshadow',
					},

					setStartTime: '',
					lowLatencyMode: true,
					descriptionNotVisible: false,
					controls: true,
					keyboardShortcut: true,
					lang: 'ko',
					ui: 'all',
					touchGestures: true,
					controlBtn: {
						play: true,
						fullscreen: true,
						progressBar: true,
						volume: true,
						times: true,
						pictureInPicture: true,
						setting: true,
						subtitle: true,
					},

					/*override: {
						nextSource() {},
						prevSource() {},
					  },*/
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<Mokup />
						<MokupList />
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
