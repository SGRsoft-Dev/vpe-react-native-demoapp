import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import BasicDemo from './BasicDemo';
import ScreenRecordingPrevention from './ScreenRecordingPrevention';
import Pip from './Pip';
import MethodDemo from './Method';
import LiveDemo from './LiveDemo';
import VTTPasre from './VTTPasre';
import NcpDrm from './NcpDrm';
import Drm from './Drm';
import Watermark from './Watermark';
import SourceDemo from './SourceDemo';
import FullscreenDemo from './FullscreenDemo';
import PlayerEvent from './PlayerEvent';
import StartTime from './StartTime';
import CustomButton from './CustomButton';
import ErrorOverride from './ErrorOverride';
import IconChange from './IconChange';
import Override from './Override';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'VPE Player Demo App' }} />
				<Stack.Screen name="BasicDemo" component={BasicDemo} options={{ headerShown: false }} />
				<Stack.Screen
					name="ScreenRecordingPrevention"
					component={ScreenRecordingPrevention}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Pip" component={Pip} options={{ headerShown: false }} />
				<Stack.Screen name="MethodDemo" component={MethodDemo} options={{ headerShown: false }} />
				<Stack.Screen name="LiveDemo" component={LiveDemo} options={{ headerShown: false }} />
				<Stack.Screen name="VTTPasre" component={VTTPasre} options={{ headerShown: false }} />
				<Stack.Screen name="NcpDrm" component={NcpDrm} options={{ headerShown: false }} />
				<Stack.Screen name="Drm" component={Drm} options={{ headerShown: false }} />
				<Stack.Screen name="Watermark" component={Watermark} options={{ headerShown: false }} />
				<Stack.Screen name="SourceDemo" component={SourceDemo} options={{ headerShown: false }} />
				<Stack.Screen name="FullscreenDemo" component={FullscreenDemo} options={{ headerShown: false }} />
				<Stack.Screen name="PlayerEvent" component={PlayerEvent} options={{ headerShown: false }} />
				<Stack.Screen name="StartTime" component={StartTime} options={{ headerShown: false }} />
				<Stack.Screen name="CustomButton" component={CustomButton} options={{ headerShown: false }} />
				<Stack.Screen name="ErrorOverride" component={ErrorOverride} options={{ headerShown: false }} />
				<Stack.Screen name="IconChange" component={IconChange} options={{ headerShown: false }} />
				<Stack.Screen name="Override" component={Override} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
