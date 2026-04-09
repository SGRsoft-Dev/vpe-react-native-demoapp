import { View, StatusBar, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loadKey } from './lib/lickeyhook';
export default function App() {
	const navigation = useNavigation();
	const lkey = loadKey();

	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	const playerRef = useRef(null);

	const progressBarOff = () => {
		playerRef.current.controlBarBtnStateUpdate({
			progressBar: false,
		});
	};

	const progressBarOn = () => {
		playerRef.current.controlBarBtnStateUpdate({
			progressBar: true,
		});
	};

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right', '']} />
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
					ready: () => {
						// 플레이어가 준비되면 호출됩니다.
						setIsPlayerReady(true); // 플레이어가 준비되었음을 상태로 알립니다.
					},
					fullScreen: (data) => {
						setIsFullScreen(data.isFullScreen);
					},

					play: () => {
						console.log('play');
						setIsPlaying(true);
					},
					pause: () => {
						console.log('pause');
						setIsPlaying(false);
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
						},
					],
					autostart: true, //구현완료
					muted: true, //구현완료
				}}
			/>

			{!isFullScreen && (
				<View style={{ padding: 10 }}>
					<View>
						<Text>Method Demo</Text>
					</View>

					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View style={{ flexDirection: 'row', gap: 5, marginTop: 15 }}>
							<Pressable
								onPress={() => {
									console.log('!!isPlaying', isPlaying);
									if (isPlaying) {
										playerRef.current.pause();
									} else {
										playerRef.current.play();
									}
								}}
								style={{
									backgroundColor: '#ffffff',
									borderWidth: 1,
									borderColor: '#cdcdcd',
									paddingHorizontal: 13,
									paddingVertical: 10,
									borderRadius: 50,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 5,
								}}
							>
								{isPlaying ? <Text>Pause</Text> : <Text>Play</Text>}
							</Pressable>

							<Pressable
								onPress={() => {
									playerRef.current.currentTime(30);
								}}
								style={{
									backgroundColor: '#ffffff',
									borderWidth: 1,
									borderColor: '#cdcdcd',
									paddingHorizontal: 13,
									paddingVertical: 10,
									borderRadius: 50,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 5,
								}}
							>
								<Text>CurrentTime 30</Text>
							</Pressable>

							<Pressable
								onPress={() => {
									playerRef.current.fullscreen();
								}}
								style={{
									backgroundColor: '#ffffff',
									borderWidth: 1,
									borderColor: '#cdcdcd',
									paddingHorizontal: 13,
									paddingVertical: 10,
									borderRadius: 50,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 5,
								}}
							>
								<Text>Fullscreen</Text>
							</Pressable>

							<Pressable
								onPress={() => {
									playerRef.current.muted();
								}}
								style={{
									backgroundColor: '#ffffff',
									borderWidth: 1,
									borderColor: '#cdcdcd',
									paddingHorizontal: 13,
									paddingVertical: 10,
									borderRadius: 50,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 5,
								}}
							>
								<Text>Mute</Text>
							</Pressable>

							<Pressable
								onPress={() => {
									playerRef.current.pip();
								}}
								style={{
									backgroundColor: '#ffffff',
									borderWidth: 1,
									borderColor: '#cdcdcd',
									paddingHorizontal: 13,
									paddingVertical: 10,
									borderRadius: 50,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 5,
								}}
							>
								<Text>PIP</Text>
							</Pressable>
						</View>
					</ScrollView>

					<View style={{ paddingTop: 30 }}>
						<Text>플레이어 UI 제어</Text>
					</View>
					<View style={{ flexDirection: 'row', gap: 10, paddingVertical: 20 }}>
						<Pressable
							onPress={() => {
								progressBarOff();
							}}
							style={{
								backgroundColor: '#ffffff',
								borderWidth: 1,
								borderColor: '#cdcdcd',
								paddingHorizontal: 13,
								paddingVertical: 10,
								borderRadius: 50,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 5,
							}}
						>
							<Text>progressBar Off</Text>
						</Pressable>

						<Pressable
							onPress={() => {
								progressBarOn();
							}}
							style={{
								backgroundColor: '#ffffff',
								borderWidth: 1,
								borderColor: '#cdcdcd',
								paddingHorizontal: 13,
								paddingVertical: 10,
								borderRadius: 50,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 5,
							}}
						>
							<Text>progressBar On</Text>
						</Pressable>
					</View>
				</View>
			)}
		</SafeAreaProvider>
	);
}
