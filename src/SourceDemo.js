import { View, StatusBar, ScrollView, TouchableOpacity, Text, Button, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { VpePlayer } from 'vpe-react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Application from 'expo-application';
import { CaretLeftIcon } from 'phosphor-react-native';

export default function App() {
	const navigation = useNavigation();

	const [isFullScreen, setIsFullScreen] = useState(false);

	const playerRef = useRef(null);

	return (
		<SafeAreaProvider>
			<SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right', '']} />
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
				options={{
					playlist: [
						{
							file: 'https://ps8ywblw3244.edge.naverncp.com/hls/rWdLjEm4u9qkuDXcqcRWeLGXZ4Y0~fbxGsojxGLixtA_/vod/JDPCILtJUbYObLmI/media-plus-99/DQEhtI6zHI_,AVC_SD_1Pass_30fps_1,AVC_HD_1Pass_30fps,AVC_FHD_1Pass_30fps,.mp4.smil/master.m3u8',
						},
					],
					autostart: true,
					muted: true,
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>

						<Text>Source Demo</Text>

						<View style={{ paddingTop: 30 }}>
							<Button
								title={'add next source'}
								onPress={() => {
									playerRef.current.addNextSource({
										file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
										poster: 'https://2ardrvaj2252.edge.naverncp.com/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_01.jpg',
										description: {
											title: '네이버클라우드 소개 영상',
											created_at: '2025.08.20',
											profile_name: '네이버클라우드',
											profile_image:
												'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
										},
									});
									Alert.alert('다음 영상 추가되었습니다.');
								}}
							/>

							<Button
								title={'UI Hidden'}
								onPress={() => {
									playerRef.current.uiHidden();
								}}
							/>

							<Button
								title={'UI Visible'}
								onPress={() => {
									playerRef.current.uiVisible();
								}}
							/>
							<Button
								title={'Player destroy'}
								onPress={() => {
									playerRef.current.destroy();
								}}
							/>
						</View>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
