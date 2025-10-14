import {
	StyleSheet,
	Platform,
	StatusBar,
	ScrollView,
	useColorScheme,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { CaretLeftIcon } from 'phosphor-react-native';

export default function App() {
	const navigation = useNavigation();
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
