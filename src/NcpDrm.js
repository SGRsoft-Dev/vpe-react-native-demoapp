import {
	StyleSheet,
	Platform,
	StatusBar,
	ScrollView,
	useColorScheme,
	TouchableOpacity,
	View,
	Text,
	Pressable,
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

	const [isPlayerReady, setIsPlayerReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);

	const [drm, setDrm] = useState({});

	// playlist 객체가 렌더링마다 새로 생성되어 무한 루프를 유발하는 것을 방지하기 위해 JSON 문자열로 변환하여 의존성을 관리합니다.

	useEffect(() => {
		const prepareSource = async (playlist) => {
			if (!playlist) {
				return [];
			}

			// `map`은 프로미스 배열을 생성하고, `Promise.all`은 모든 프로미스가 완료될 때까지 기다립니다.
			const playlistPromises = playlist.map(async (item) => {
				if (!item) return null;

				const { drm, poster, description, file } = item;

				// DRM 정보가 있으면 현재 플랫폼에 맞게 처리합니다.
				if (drm) {
					if (Platform.OS === 'ios' && drm['com.apple.fps']) {
						const config = drm['com.apple.fps'];
						// 모든 헤더 값을 문자열로 변환하여 타입 불일치 오류를 방지합니다.
						const licHeaders = Object.fromEntries(
							Object.entries(config.licenseRequestHeader).map(([key, value]) => [key, String(value)])
						);

						const certHeaders = Object.fromEntries(
							Object.entries(config.certificateRequestHeader).map(([key, value]) => [key, String(value)])
						);
						try {
							let fDrm = {
								type: 'fairplay',
								licenseServer: config.licenseUri,
								headers: licHeaders,
								certificateUrl: config.certificateUri,
								certificateRequestHeader: certHeaders,
								base64Certificate: true,
								getLicense: async (spc) => {
									const res = await fetch(config.licenseUri, {
										method: 'POST',
										headers: licHeaders,
										body: spc, // spc는 바이너리(문자열) 그대로 전송
									});
									// 서버가 base64 CKC를 돌려주면 text()로 받은 그대로 반환
									const ckcBase64 = await res.text();
									return ckcBase64;
								},
							};

							//console.log('fDrm',fDrm)

							// iOS용으로 처리된 아이템을 반환합니다.
							return {
								file: config.src,
								drm: fDrm,
								poster,
								description,
							};
						} catch (e) {
							console.error('FairPlay 소스 준비 중 오류 발생:', e);
							return null; // 오류 발생 시 null을 반환하여 나중에 필터링합니다.
						}
					} else if (Platform.OS === 'android' && drm['com.widevine.alpha']) {
						const config = drm['com.widevine.alpha'];
						// 모든 헤더 값을 문자열로 변환하여 타입 불일치 오류를 방지합니다.
						const stringifiedHeaders = Object.fromEntries(
							Object.entries(config.licenseRequestHeader).map(([key, value]) => [key, String(value)])
						);
						// Android용으로 처리된 아이템을 반환합니다.
						return {
							file: config.src,
							drm: {
								type: 'widevine',
								licenseServer: config.licenseUri,
								headers: stringifiedHeaders,
								base64Certificate: true,
								getLicense: async (spc) => {
									const res = await fetch(config.licenseUri, {
										method: 'POST',
										headers: stringifiedHeaders,
										body: spc, // spc는 바이너리(문자열) 그대로 전송
									});
									// 서버가 base64 CKC를 돌려주면 text()로 받은 그대로 반환
									const ckcBase64 = await res.text();
									return ckcBase64;
								},
							},
							poster,
							description,
						};
					}
				}

				// DRM이 없거나 현재 플랫폼에 해당하지 않으면 기본 파일을 반환합니다.
				return { file, poster, description };
			});

			// 모든 비동기 작업이 완료될 때까지 기다립니다.
			const newPlayList = await Promise.all(playlistPromises);

			// 처리 중 실패한 아이템(null)을 제거합니다.
			return newPlayList.filter(Boolean);
		};

		const drmFetch = async () => {
			try {
				const response = await fetch('https://vpe.sgrsoft.com/api/drmTest');
				const data = await response.json();
				const drmPlaylist = await prepareSource(data.playlist);

				setDrm(drmPlaylist);
				setIsPlayerReady(true);
			} catch (error) {
				console.error('DRM 데이터 처리 중 오류 발생:', error);
			}
		};

		drmFetch();
	}, []);

	useEffect(() => {
		// 플레이어가 준비되지 않았거나 ref가 없으면 리스너를 등록하지 않습니다.
		if (!isPlayerReady) return;

		const player = playerRef.current;
		if (!player) return;
	}, [isPlayerReady]); // isPlayerReady 상태가 true가 되면 이 effect를 실행합니다.

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
					{isPlayerReady && (
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
							options={{
								playlist: drm,
								autostart: true, //구현완료
								muted: true, //구현완료
								aspectRatio: '16/9', //구현완료
								objectFit: 'contain', //구현완료
							}}
						/>
					)}

					<View style={{ padding: 10 }}>
						<View>
							<Text>One Click Multi DRM Test</Text>
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
								<Text style={{ color: '#ffffff' }}> ⚠️ DRM 테스트는 실제 기기만 동작합니다.</Text>
							</View>
							<View>
								<Text>https://vpe.sgrsoft.com/api/drmTestPallycon</Text>
							</View>
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
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
