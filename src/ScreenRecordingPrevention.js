import { StyleSheet, Platform, StatusBar, ScrollView, useColorScheme, View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loadKey } from './lib/lickeyhook';
export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();
	const colorScheme = useColorScheme();
	const isDarkMode = colorScheme === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? '#222222' : '#ffffff', // 다크 모드일 때 어두운 배경, 라이트 모드일 때 흰 배경
	};

	StatusBar.setBarStyle('dark-content');
	if (Platform.OS == 'android') {
		StatusBar.setBackgroundColor('#ffffff');
	}

	const playerRef = useRef(null);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={[styles.container, backgroundStyle]}>
				<StatusBar
					// isDarkMode 값에 따라 barStyle을 동적으로 변경합니다.
					barStyle={isDarkMode ? 'light-content' : 'dark-content'}
					// 상태 표시줄의 배경색도 앱의 배경색과 맞춥니다.
					backgroundColor={backgroundStyle.backgroundColor}
				/>

				<ScrollView style={{ backgroundColor: '#ffffff' }}>
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
							],
							autostart: true, //구현완료
							muted: true, //구현완료
							aspectRatio: '16/9', //구현완료
							objectFit: 'contain', //구현완료

							//리액트 전용
							screenRecordingPrevention: true, //구현완료
							allowsPictureInPicture: true, //구현완료
							staysActiveInBackground: true, //구현완료
						}}
					/>

					<View style={{ padding: 10 }}>
						<View>
							<Text>화면 녹화 방지 테스트 데모</Text>
						</View>
						<View>
							<Text>⚠️ iOS는 Expo GO에서는 동작하지 않습니다.</Text>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// Android에서 상태 표시줄(Status Bar) 영역을 침범하지 않도록 수동으로 패딩을 추가합니다.
		/*paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,*/
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
