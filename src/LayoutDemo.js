import { View, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loadKey } from './lib/lickeyhook';
/**
 * 새 레이아웃 시스템 데모.
 * `layout` prop으로 pc/mobile/fullscreen × vod/live 별 ControlBar 구성을 지정한다.
 *
 * 미지정 시에는 기존 PlayerControls가 fallback으로 사용됨.
 */

const customLayout = {
	mobile: {
		vod: {
			order: ['top', 'upper', 'center', 'lower', 'bottom'],
			top: [
				{ items: ['BackBtn'], wrapper: 'Group' },
				{ wrapper: 'Blank', items: [], align: 'left' },
				{ items: ['SubtitleBtn', 'SettingBtn'], cap: 2, wrapper: 'Group' },
			],
			upper: [{ wrapper: 'Blank', items: [], align: 'left' }],
			center: [],
			lower: [
				{
					wrapper: 'Blank',
					items: ['SeekBar'],
				},
			],
			bottom: [
				{
					wrapper: 'Blank',
					items: ['SkipBackBtn', 'PlayBtn', 'SkipForwardBtn'],
					align: 'center',
				},
			],
		},
	},
};

export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();
	const playerRef = useRef(null);
	const [isFullScreen, setIsFullScreen] = useState(false);

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
				layout={customLayout}
				options={{
					playlist: [
						{
							file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
							poster: 'https://2ardrvaj2252.edge.naverncp.com/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_01.jpg',
							description: {
								title: '레이아웃 시스템 데모',
								created_at: '2026.04.08',
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
					controls: true,
					allowsPictureInPicture: true,
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<Text style={{ fontSize: 16, fontWeight: '600' }}>레이아웃 시스템 데모</Text>
						<Text style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
							layout prop으로 pc/mobile/fullscreen × vod/live 별 ControlBar 구성을 사용자 정의합니다.
						</Text>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
