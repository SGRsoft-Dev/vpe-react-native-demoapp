import { View, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loadKey } from './lib/lickeyhook';
/**
 * 모든 컨트롤 컴포넌트를 한 화면에서 시각적으로 확인할 수 있는 데모.
 *
 * 디자인 검증 / 디버깅 용도. 컨트롤 컴포넌트를 추가/수정한 후 시각 확인할 때 사용.
 *
 * 구성:
 * - top: BackBtn, MetaDesc, MuteBtn, ShareBtn, SettingBtn (오른쪽 정렬)
 * - upper: SubtitleBtn, FullscreenBtn (오른쪽)
 * - center: BigPlayBtn (자동으로 prev/next 사이드 + isEnded NextVideoInfo)
 * - lower: SkipBackBtn, PrevBtn, PlayBtn, NextBtn, SkipForwardBtn 묶음 (가운데)
 *          + TimeBtn / VolumeBtn (좌측)
 * - bottom: SeekBar 풀폭 슬롯 (order에 'seekbar' 포함)
 */

const showcaseLayout = {
	pc: {
		vod: {
			order: ['top', 'upper', 'center', 'lower', 'bottom', 'seekbar'],
			top: [
				{ items: ['BackBtn'], wrapper: 'Group' },
				{ items: ['MetaDesc'], wrapper: 'Blank' },
				{ items: ['MuteBtn'], wrapper: 'Group' },
				{ items: ['ShareBtn'], wrapper: 'Group' },
				{ items: ['SettingBtn'], wrapper: 'Group' },
			],
			upper: [
				{ wrapper: 'Blank', items: [], align: 'left' },
				{ items: ['SubtitleBtn'], wrapper: 'Group' },
				{ items: ['FullscreenBtn'], wrapper: 'Group' },
			],
			center: [{ items: ['BigPlayBtn'], align: 'center' }],
			lower: [
				{ items: ['TimeBtn'], wrapper: 'Group' },
				{ items: ['VolumeBtn'], wrapper: 'Group' },
				{ wrapper: 'Blank', align: 'left' },
				{
					items: ['SkipBackBtn', 'PrevBtn', 'PlayBtn', 'NextBtn', 'SkipForwardBtn'],
					wrapper: 'Group',
				},
			],
			bottom: [
				{ items: ['CurrentTimeBtn'], wrapper: 'Group' },
				{ wrapper: 'Blank', align: 'left' },
				{ items: ['DurationBtn'], wrapper: 'Group' },
			],
		},
	},
	mobile: {
		vod: {
			order: ['top', 'center', 'lower', 'bottom', 'seekbar'],
			top: [
				{ items: ['BackBtn'], wrapper: 'Group' },
				{ items: ['MetaDesc'], wrapper: 'Blank' },
				{ items: ['MuteBtn'], wrapper: 'Group' },
				{ items: ['SettingBtn'], wrapper: 'Group' },
			],
			center: [{ items: ['BigPlayBtn'], align: 'center' }],
			lower: [
				{ items: ['TimeBtn'], wrapper: 'Group' },
				{ wrapper: 'Blank', align: 'left' },
				{
					items: ['SkipBackBtn', 'PlayBtn', 'SkipForwardBtn'],
					wrapper: 'Group',
				},
				{ wrapper: 'Blank', align: 'left' },
				{ items: ['SubtitleBtn'], wrapper: 'Group' },
				{ items: ['FullscreenBtn'], wrapper: 'Group' },
			],
			bottom: [
				{ items: ['CurrentTimeBtn'], wrapper: 'Group' },
				{ wrapper: 'Blank', align: 'left' },
				{ items: ['DurationBtn'], wrapper: 'Group' },
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
				layout={showcaseLayout}
				options={{
					playlist: [
						{
							file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
							poster: 'https://2ardrvaj2252.edge.naverncp.com/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_01.jpg',
							description: {
								title: '컨트롤 Showcase',
								created_at: '2026.04.08',
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
								title: '컨트롤 Showcase 두 번째 영상',
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
					<View style={{ padding: 16 }}>
						<Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>컨트롤 Showcase</Text>
						<Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 16 }}>
							모든 컨트롤 컴포넌트를 한 화면에서 확인할 수 있는 데모입니다. 디자인 변경 후 시각 검증에
							사용하세요.
						</Text>

						<Text style={{ fontSize: 13, fontWeight: '600', marginTop: 12, marginBottom: 4 }}>
							포함된 컨트롤
						</Text>
						<Text style={{ fontSize: 12, opacity: 0.7, lineHeight: 18 }}>
							• top: BackBtn, MetaDesc, MuteBtn, ShareBtn, SettingBtn{'\n'}• upper: SubtitleBtn,
							FullscreenBtn (PC만){'\n'}• center: BigPlayBtn (양옆 prev/next, isEnded 시 NextVideoInfo)
							{'\n'}• lower: TimeBtn, VolumeBtn, [SkipBack, Prev, Play, Next, SkipForward]{'\n'}• bottom:
							CurrentTimeBtn, DurationBtn{'\n'}• seekbar: 화면 하단 풀폭 SeekBar
						</Text>

						<Text style={{ fontSize: 13, fontWeight: '600', marginTop: 16, marginBottom: 4 }}>
							확인 포인트
						</Text>
						<Text style={{ fontSize: 12, opacity: 0.7, lineHeight: 18 }}>
							• 알약/원형 Group 디자인{'\n'}• 단일 자식 vs 다중 자식 비교{'\n'}• TimeBtn은 텍스트라 가로
							길이 유지{'\n'}• 컨트롤바 fade-in/out 애니메이션 (300ms){'\n'}• 좌/우 더블탭 누적 seek +
							indicator{'\n'}• 음소거 시 좌측 상단 인디케이터 (컨트롤 비활성 시){'\n'}• playlist 2개 →
							BigPlayBtn 양옆 prev/next 활성{'\n'}• 영상 종료 → BigPlayBtn이 NextVideoInfo 카드로 전환
						</Text>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
