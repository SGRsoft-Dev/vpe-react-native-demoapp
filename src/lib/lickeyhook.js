import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';

export const loadKey = () => {
	//베타키 3376a7c72a0343fe15776f3b96375c3e
	const [testKey, setTestKey] = useState('c4f24ab4cfba527029fa753308bbada9');
	const [testAppId, setTestAppId] = useState('com.vpe.rn.testapp.v3');
	const [isBeta, setIsBeta] = useState(false);
	const [isGov, setIsGov] = useState(false);
	const [isDev, setIsDev] = useState(false);

	useEffect(() => {
		const setLic = async () => {
			const tkey = await AsyncStorage.getItem('testKey');
			if (tkey) {
				setTestKey(JSON.parse(tkey));
			}

			const tAppId = await AsyncStorage.getItem('testAppId');
			if (tAppId) {
				setTestAppId(JSON.parse(tAppId));
			}

			// 값을 읽어와서 JSON.parse로 원래 타입(boolean)으로 변환합니다.
			const iBeta = await AsyncStorage.getItem('isBeta');
			if (iBeta !== null) {
				setIsBeta(JSON.parse(iBeta));
			}

			const iGov = await AsyncStorage.getItem('isGov');
			if (iGov !== null) {
				setIsGov(JSON.parse(iGov));
			}

			const iDev = await AsyncStorage.getItem('isDev');
			if (iDev !== null) {
				setIsDev(JSON.parse(iDev));
			}
		};

		setLic();
	}, [testKey, testAppId, isBeta, isGov, isDev]);

	return {
		testKey,
		testAppId,
		isBeta,
		isGov,
		isDev,
	};
};

export const licSave = async (key, value) => {
	// 값을 저장하기 전에 JSON.stringify를 사용해 문자열로 변환합니다.
	await AsyncStorage.setItem(key, JSON.stringify(value));
};
