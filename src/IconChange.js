import { View, StatusBar, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CaretLeftIcon } from 'phosphor-react-native';

import { SvgUri } from 'react-native-svg';

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
				icon={{
					bigPlay: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/youtube-logo-fill.svg`}
								height={50}
								width={50}
							/>
						);
					},
					play: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/play_arrow_white_24dp.svg`}
								height={40}
								width={40}
							/>
						);
					},
					pause: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/pause_black_24dp.svg`}
								height={40}
								width={40}
							/>
						);
					},

					prev: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/skip_previous_white_24dp.svg`}
								height={40}
								width={40}
							/>
						);
					},

					next: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/skip_next_white_24dp.svg`}
								height={40}
								width={40}
							/>
						);
					},

					replay: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/replay_white_24dp.svg`}
								height={40}
								width={40}
							/>
						);
					},

					subtitle: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/subtitles_white_24dp.svg`}
								height={22}
								width={22}
							/>
						);
					},

					subtitleOff: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/subtitles_off_white_24dp.svg`}
								height={22}
								width={22}
							/>
						);
					},

					fullscreen: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/fullscreen_white_24dp.svg`}
								height={22}
								width={22}
							/>
						);
					},

					fullscreenExit: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/fullscreen_exit_white_24dp.svg`}
								height={22}
								width={22}
							/>
						);
					},

					setting: () => {
						return (
							<SvgUri
								uri={`https://vpe.sgrsoft.com/svg/material/settings_white_24dp.svg`}
								height={22}
								width={22}
							/>
						);
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
