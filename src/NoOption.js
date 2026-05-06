import { View, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loadKey } from './lib/lickeyhook';

export default function App() {
	const navigation = useNavigation();

	const [isFullScreen, setIsFullScreen] = useState(false);
	const playerRef = useRef(null);
	const [initLoad, setInitLoad] = useState(false);

	const lkey = loadKey();

	useEffect(() => {
		if (initLoad) return;
		setTimeout(() => {
			navigation.setOptions({
				headerShown: false,
			});
			setInitLoad(true);
		}, 300);
	}, [lkey, initLoad]);

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right']} />
			<StatusBar barStyle={'dark-content'} hidden={isFullScreen ? true : false} />

			{initLoad && (
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
								vtt: [
									{
										id: 'ko',
										file: 'https://vpeold.sgrsoft.com/ncp_overview_script_kr_v2.vtt',
										label: '한국어',
										default: true,
									},
									{
										id: 'en',
										file: 'https://vpeold.sgrsoft.com/ncp_overview_script_en_v2.vtt',
										label: 'English',
									},
								],
							},
							/*{
								file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
								poster: 'https://2ardrvaj2252.edge.naverncp.com/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_01.jpg',
								description: {
									title: '네이버클라우드 소개 영상',
									created_at: '2025.08.20',
									profile_name: '네이버클라우드',
									profile_image:
										'https://tkmenfxu2702.edge.naverncp.com/profile/202511/cf38c0603c57faacd99cbe6d967c38b3.png',
								},
							},*/
						],

					}}
				/>
			)}

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<View style={{ paddingBottom: 10 }}>
							<Text>콘솔 테스트 (코드 옵션이 없는 플레이어)</Text>
						</View>
						<View>
							<Text>Key : {lkey.testKey}</Text>
						</View>
						<View>
							<Text>Dev 여부 : {lkey.isDev ? 'true' : 'false'}</Text>
						</View>
						<View>
							<Text>공공 여부 : {lkey.isGov ? 'true' : 'false'}</Text>
						</View>
						<View>
							<Text>베타 여부 : {lkey.isBeta ? 'true' : 'false'}</Text>
						</View>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
