import { View, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { SvgUri } from 'react-native-svg';

import { loadKey } from './lib/lickeyhook';
export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();

	const [isFullScreen, setIsFullScreen] = useState(false);
	const playerRef = useRef(null);

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
				}}
				options={{
					icon: {
						bigPlay: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/youtube-logo-fill.svg`}
								height={50}
								width={50}
							/>
						),
						play: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/play_arrow_white_24dp.svg`}
								height={40}
								width={40}
							/>
						),
						pause: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/pause_black_24dp.svg`}
								height={40}
								width={40}
							/>
						),
						prev: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/skip_previous_white_24dp.svg`}
								height={40}
								width={40}
							/>
						),
						next: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/skip_next_white_24dp.svg`}
								height={40}
								width={40}
							/>
						),
						replay: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/replay_white_24dp.svg`}
								height={40}
								width={40}
							/>
						),
						subtitle: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/subtitles_white_24dp.svg`}
								height={22}
								width={22}
							/>
						),
						subtitleOff: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/subtitles_off_white_24dp.svg`}
								height={22}
								width={22}
							/>
						),
						fullscreen: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/fullscreen_white_24dp.svg`}
								height={22}
								width={22}
							/>
						),
						fullscreenExit: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/fullscreen_exit_white_24dp.svg`}
								height={22}
								width={22}
							/>
						),
						setting: () => (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/settings_white_24dp.svg`}
								height={22}
								width={22}
							/>
						),
					},
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
					autostart: false,
					muted: true,
					aspectRatio: '16/9',
					objectFit: 'contain',

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
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<Text>플레이어 버튼 커스터마이징</Text>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
