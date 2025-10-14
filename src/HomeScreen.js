import { StyleSheet, View, ScrollView, Button, Image, ImageBackground, Text, Pressable, StatusBar } from 'react-native';

import React, { useRef } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';

export default function HomeScreen({ navigation }) {
	return (
		<View style={[styles.container]}>
			<SafeAreaView edges={['bottom', 'left', 'right']} />
			<StatusBar style="auto" barStyle={'dark-content'} />

			<ScrollView
				style={{
					height: `calc(100 % - 200)`,
					paddingBottom: 80,
				}}
			>
				<ImageBackground
					source={{
						uri: 'https://tkmenfxu2702.edge.naverncp.com/profile/202410/41da2868a7a004663066d88117a05e99.png',
					}}
					style={{
						height: 180,
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 10,
					}}
					resizeMode="cover"
				>
					<View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								paddingVertical: 10,
							}}
						>
							<Image
								source={{ uri: 'https://www.ncloud.com/public/img/ncp-logo-white.webp' }}
								height={30}
								width={140}
								style={{
									objectFit: 'contain',
								}}
							/>
						</View>
						<SvgUri
							uri={
								'https://tkmenfxu2702.edge.naverncp.com/profile/202411/915e36a9132dad3a90bd11dbdd684272.svg'
							}
							height={30}
						/>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								paddingVertical: 10,
							}}
						>
							<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>React Native Demo</Text>
						</View>
					</View>
				</ImageBackground>
				<View style={{ marginBottom: 50, backgroundColor: '#f4f4f4' }}>
					<Pressable onPress={() => navigation.navigate('BasicDemo')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>UGC Player Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>플레이어 UGC형 예제 코드</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('SourceDemo')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>Player Source Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>재생소스 설정 데모</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('PlayerEvent')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>Player Event Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>플레이어에 대한 이벤트를 연동하는 예제 코드</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('MethodDemo')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>Player Method Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>플레이어를 제어하는 Method 예제 코드 입니다.</Text>
						</View>
					</Pressable>

					<Pressable
						title="FullScreen Demo"
						onPress={() => navigation.navigate('FullscreenDemo')}
						style={styles.demoBtn}
					>
						<View>
							<Text style={styles.demoBtnText}>FullScreen Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>커스텀 풀스크린 / 모달 풀스크린 데모</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('ScreenRecordingPrevention')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>ScreenRecordingPrevention</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>
								화면 녹화 및 스크린캡쳐를 방지하는 예제 코드입니다.
							</Text>
						</View>
					</Pressable>
					<Pressable onPress={() => navigation.navigate('Pip')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>Picture in Picture Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>
								PIP 및 Background Play 구현하는 예제 코드 입니다.
							</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('LiveDemo')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>LLHLS Live Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>LL HLS Live 예제 코드 입니다.</Text>
						</View>
					</Pressable>
					<Pressable onPress={() => navigation.navigate('VTTPasre')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>VTT Pasre Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>m3u8 VTT 자막 연동 예제 코드 입니다.</Text>
						</View>
					</Pressable>
					<Pressable onPress={() => navigation.navigate('Drm')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>PallyCon DRM Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>펠리컨 DRM을 재생하는 예제 코드입니다.</Text>
						</View>
					</Pressable>
					<Pressable onPress={() => navigation.navigate('NcpDrm')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>One Click Multi DRM Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>
								Ncloud 에서 제공하는 One Click Multi DRM 연동 예제 코드
							</Text>
						</View>
					</Pressable>
					<Pressable onPress={() => navigation.navigate('Watermark')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>Watermark Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>텍스트 워터마크를 설정하는 데모</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('StartTime')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>최초 공개일 Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>최초 공개일을 설정하여 재생하는 데모</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('CustomButton')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>커스텀 버튼 Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>커스텀 버튼을 추가하는 예제 코드입니다.</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('ErrorOverride')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>에러 화면 커스텀 Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>
								에러 화면을 직접 커스텀하여 사용하는 예제 코드입니다.
							</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('IconChange')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>플레이어 버튼 커스터마이징 Demo</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>기본 버튼의 디자인을 변경하는 예제 입니다.</Text>
						</View>
					</Pressable>

					<Pressable onPress={() => navigation.navigate('Override')} style={styles.demoBtn}>
						<View>
							<Text style={styles.demoBtnText}>기본 기능 오버라이드</Text>
						</View>
						<View>
							<Text style={[styles.demoBtnTextDesc]}>
								기본 버튼의 기능을 직접 커스텀으로 변경하는 예제 입니다.
							</Text>
						</View>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	demoBtn: {
		backgroundColor: '#ffffff',
		borderStyle: 'solid',
		borderColor: '#e1e1e1',
		borderWidth: 1,

		borderRadius: 5,
		paddingVertical: 12,
		paddingHorizontal: 20,
		marginVertical: 5,
		marginHorizontal: 10,
	},
	demoBtnText: {
		color: '#000000',
	},
	demoBtnTextDesc: {
		color: '#000000',
		fontSize: 12,
		marginTop: 3,
		opacity: 0.5,
	},
});
