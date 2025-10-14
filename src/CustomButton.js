import { View, StatusBar, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Mokup from './mokup';
import MokupList from './mokupList';
import { CaretLeftIcon, ChatCircleIcon, InfoIcon } from 'phosphor-react-native';

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
				customButton={[
					{
						position: 'right-bottom',
						flow: 'left',
						button: () => {
							return (
								<TouchableOpacity
									onPress={() => {
										Alert.alert('test11');
									}}
								>
									<ChatCircleIcon size={22} color={'#ffffff'} weight={'fill'} />
								</TouchableOpacity>
							);
						},
					},

					{
						position: 'right-top',
						flow: 'left',
						button: () => {
							return (
								<TouchableOpacity
									onPress={() => {
										Alert.alert('test11');
									}}
								>
									<InfoIcon size={22} color={'#ffffff'} weight={'fill'} />
								</TouchableOpacity>
							);
						},
					},
				]}
				events={{
					ready: () => {
						setTimeout(() => {
							playerRef.current.pause();
							playerRef.current.controlBarActive();
						}, 2000);
					},
					fullScreen: (data) => {
						setIsFullScreen(data.isFullScreen);
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
					autostart: true,
					muted: true,
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<Text>커스텀 버튼 추가 예제 코드</Text>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
