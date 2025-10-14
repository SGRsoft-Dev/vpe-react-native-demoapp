import { View, StatusBar, ScrollView, TouchableOpacity, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CaretLeftIcon } from 'phosphor-react-native';

export default function App() {
	const navigation = useNavigation();

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
							file: 'https://ps8ywblw3244.edge.naverncp.com/hls/rWdLjEm4u9qkuDXcqcRWeLGXZ4Y0~fbxGsojxGLixtA_/vod/JDPCILtJUbYObLmI/media-plus-99/DQEhtI6zHI_,AVC_SD_1Pass_30fps_1,AVC_HD_1Pass_30fps,AVC_FHD_1Pass_30fps,.mp4.smil/master.m3u8',
							poster: 'https://vvbk6ieu540.edge.naverncp.com/files/202309/97a26e48665c41e88d6920708e7eb7a7.png',
							description: {
								title: '네이버클라우드 소개 영상',
								created_at: '2025.08.20',
								profile_name: '네이버클라우드',
								profile_image:
									'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
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
