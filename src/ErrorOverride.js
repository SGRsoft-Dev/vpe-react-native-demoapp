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
					error: (data) => {
						console.log('error', data);
					},
				}}
				errorOverride={(res) => {
					return (
						<>
							<View>
								<Text style={{ color: '#ffffff', fontSize: 30 }}>⚠️</Text>
							</View>
							<View>
								<Text style={{ color: '#ffffff', fontSize: 16, paddingVertical: 8 }}>
									{res.error.title}
								</Text>
							</View>
							<View>
								<Text style={{ color: '#ffffff', fontSize: 12, opacity: 0.8 }}>({res.error.desc})</Text>
							</View>
							<View>
								<Text style={{ color: '#ffffff', fontSize: 12, opacity: 0.8, paddingTop: 10 }}>
									고객센터 문의 : 1588-0001
								</Text>
							</View>
						</>
					);
				}}
				options={{
					playlist: [
						{
							file: 'errorUrl',
							//file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
						},
					],
					autostart: true,
					muted: true,
				}}
			/>

			{!isFullScreen && (
				<ScrollView style={{ backgroundColor: '#ffffff' }}>
					<View style={{ padding: 10 }}>
						<Text>에러화면 커스텀</Text>
					</View>
				</ScrollView>
			)}
		</SafeAreaProvider>
	);
}
