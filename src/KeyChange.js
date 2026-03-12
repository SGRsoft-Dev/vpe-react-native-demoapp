import { View, StatusBar, ScrollView, TouchableOpacity, Text, Switch, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Application from 'expo-application';

import { loadKey, licSave } from './lib/lickeyhook';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const navigation = useNavigation();

	const lkey = loadKey();

	const [initLoad, setInitLoad] = useState(false);
	const [isBeta, setIsBeta] = useState(false);
	const [isGov, setIsGov] = useState(false);
	const [isDev, setIsDev] = useState(false);

	const [licKey, setLicKey] = React.useState('');
	const [appId, setAppId] = React.useState('');

	useEffect(() => {
		if (initLoad) return;

		const initRun = async () => {
			console.log('lkey', lkey);

			let appId = Application.applicationId;
			let kb = JSON.parse(await AsyncStorage.getItem('testKey'));
			setLicKey(kb ? kb : lkey.testKey);

			setAppId(appId ? appId : lkey.testAppId);

			let ib = JSON.parse(await AsyncStorage.getItem('isBeta'));
			setIsBeta(ib ? true : false);

			let ig = JSON.parse(await AsyncStorage.getItem('isGov'));
			setIsGov(ig ? true : false);

			let id = JSON.parse(await AsyncStorage.getItem('isDev'));
			setIsDev(id ? true : false);
		};

		initRun();
		setInitLoad(true);
	}, [initLoad]); // 의존성 배열에서 setter 함수들은 제거해도 됩니다.

	const saveStage = async () => {
		licSave('isBeta', isBeta);
		licSave('isGov', isGov);
		licSave('testKey', licKey);
		licSave('testAppId', appId);
		licSave('isDev', isDev);
		navigation.navigate('NoOption');
	};

	return (
		<SafeAreaProvider>
			<StatusBar barStyle={'dark-content'} />

			<View style={{backgroundColor:'#ffffff',paddingTop:70,paddingBottom:20,paddingHorizontal:20,justifyContent:"space-between",flexDirection:'row',alignItems:'center'}}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={{color:'#000000'}}>Back</Text>
				</TouchableOpacity>
				<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
					<Text style={{fontWeight:'500'}}>라이선스키 변경 </Text>
				</View>
				<View style={{width:40}}></View>
			</View>
			<View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 40 }}>
				<View style={{ width: '100%', flexDirection: 'column', gap: 20 }}>
					<View>
						<Text style={{ fontWeight: 500, fontSize: 16 }}>스테이지 설정</Text>
					</View>

					<View>
						<View style={{ flexDirection: 'row', gap: 5 }}>
							<View>
								<Text style={{ fontSize: 16 }}>앱아이디</Text>
							</View>
							<View>
								<Text style={{ color: '#ff1265' }}>(앱아이디는 변경 불가합니다.)</Text>
							</View>
						</View>
						<View>
							<TextInput
								editable
								multiline
								numberOfLines={4}
								maxLength={40}
								onChangeText={(text) => setAppId(text)}
								value={appId}
								readOnly={true}
								style={{
									backgroundColor: '#fff',
									borderStyle: 'solid',
									borderColor: '#cdcdcd',
									paddingVertical: 10,
									paddingHorizontal: 5,
									borderWidth: 1,
									borderRadius: 5,
									marginTop: 10,
								}}
							/>
							<View style={{ paddingVertical: 5 }}>
								<Text style={{ color: '#0c4cef' }}>
									테스트용 플레이어 생성시 Android , iOS 키를 위 내용으로 등록하세요.
								</Text>
							</View>
						</View>
					</View>

					<View>
						<View>
							<Text style={{ fontSize: 16 }}>라이선스 키</Text>
						</View>
						<View>
							<TextInput
								editable
								multiline
								numberOfLines={4}
								maxLength={40}
								onChangeText={(text) => setLicKey(text)}
								value={licKey}
								style={{
									backgroundColor: '#fff',
									borderStyle: 'solid',
									borderColor: '#cdcdcd',
									paddingVertical: 10,
									paddingHorizontal: 5,
									borderWidth: 1,
									borderRadius: 5,
									marginTop: 10,
								}}
							/>
						</View>
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 10,
							flexDirection: 'row',
							gap: 10,
						}}
					>
						<View>
							<Text style={{ fontSize: 16 }}>베타 여부</Text>
						</View>
						<Switch ios_backgroundColor="#3e3e3e" onValueChange={setIsBeta} value={isBeta} />
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 10,
							flexDirection: 'row',
							gap: 10,
						}}
					>
						<View>
							<Text style={{ fontSize: 16 }}>공공 여부</Text>
						</View>
						<Switch ios_backgroundColor="#3e3e3e" onValueChange={setIsGov} value={isGov} />
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 10,
							flexDirection: 'row',
							gap: 10,
						}}
					>
						<View>
							<Text style={{ fontSize: 16 }}>Develop 여부</Text>
						</View>
						<Switch ios_backgroundColor="#3e3e3e" onValueChange={setIsDev} value={isDev} />
					</View>


				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
					<TouchableOpacity
						onPress={() => {
							saveStage();
						}}
						style={{
							backgroundColor: '#2e2e2e',
							paddingVertical: 10,
							paddingHorizontal: 15,
							borderRadius: 5,
						}}
					>
						<Text style={{ color: '#fff' }}>적용하기</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaProvider>
	);
}
