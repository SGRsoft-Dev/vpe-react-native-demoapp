import { View, StatusBar, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Mokup from './mokup';
import MokupList from './mokupList';
import { CaretLeftIcon } from 'phosphor-react-native';

export default function App() {
	const navigation = useNavigation();

	const [isFullScreen, setIsFullScreen] = useState(false);
	const playerRef = useRef(null);

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right']} />
			<StatusBar barStyle={'dark-content'} hidden={isFullScreen ? true : false} />

			<VpePlayer
				ref={playerRef}
				devTestAppId={'com.vpe.rn.testapp.v3'}
				accessKey={'a2f86dac9d5f8962031851638df4d755'}
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
							file: 'https://ps8ywblw3244.edge.naverncp.com/hls/rWdLjEm4u9qkuDXcqcRWeLGXZ4Y0~fbxGsojxGLixtA_/vod/JDPCILtJUbYObLmI/media-plus-99/DQEhtI6zHI_,AVC_SD_1Pass_30fps_1,AVC_HD_1Pass_30fps,AVC_FHD_1Pass_30fps,.mp4.smil/master.m3u8',
							poster: 'https://vvbk6ieu540.edge.naverncp.com/files/202309/97a26e48665c41e88d6920708e7eb7a7.png',
							description: {
								title: '네이버클라우드 소개 영상',
								created_at: '2025.08.20',
								profile_name: '네이버클라우드',
								profile_image:
									'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
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
									'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
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
