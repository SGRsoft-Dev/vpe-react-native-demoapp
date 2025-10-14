import { Image, Pressable, Text, View } from 'react-native';
import * as Ph from 'phosphor-react-native';

export default function () {
	return (
		<>
			<View style={{ marginBottom: 5 }}>
				<Text style={{ fontSize: 18, fontWeight: 'bold' }}>네이버클라우드 소개 영상</Text>
			</View>
			<View style={{ marginBottom: 10 }}>
				<Text style={{ fontSize: 12, opacity: 0.5 }}>2025.08.20</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<Image
						source={{
							uri: 'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
						}}
						style={{
							width: 34,
							aspectRatio: 1 / 1,
							borderRadius: 100,
							borderWidth: 1,
							borderColor: '#ececec',
						}}
					/>
					<Text style={{ fontSize: 12 }}>네이버클라우드</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<Pressable
						style={{
							backgroundColor: '#393939',
							paddingHorizontal: 13,
							paddingVertical: 10,
							borderRadius: 50,
							flexDirection: 'row',
							alignItems: 'center',
							gap: 5,
						}}
					>
						<Text style={{ color: '#ffffff' }}>구독</Text>
						<Ph.PlusIcon size={14} color={'#ffffff'} />
					</Pressable>

					<Pressable
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
						<Ph.BellRingingIcon size={14} />
						<Ph.CaretDownIcon size={14} />
					</Pressable>
				</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 10,
					marginTop: 15,
				}}
			>
				<Pressable
					style={{
						backgroundColor: '#ececec',

						paddingHorizontal: 8,
						paddingVertical: 8,
						borderRadius: 50,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<Ph.ThumbsUpIcon size={14} />
					<Text style={{ fontSize: 12 }}>82</Text>

					<Text
						style={{
							fontSize: 10,
							opacity: 0.2,
							marginHorizontal: 5,
						}}
					>
						|
					</Text>

					<Ph.ThumbsDownIcon size={14} />
					<Text style={{ fontSize: 12 }}>0</Text>
				</Pressable>

				<Pressable
					style={{
						backgroundColor: '#ececec',

						paddingHorizontal: 8,
						paddingVertical: 8,
						borderRadius: 50,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<Ph.ShareFatIcon size={14} />
					<Text style={{ fontSize: 12 }}>공유</Text>
				</Pressable>

				<Pressable
					style={{
						backgroundColor: '#ececec',

						paddingHorizontal: 8,
						paddingVertical: 8,
						borderRadius: 50,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<Ph.FlagIcon size={14} />
					<Text style={{ fontSize: 12 }}>신고</Text>
				</Pressable>

				<Pressable
					style={{
						backgroundColor: '#ececec',

						paddingHorizontal: 8,
						paddingVertical: 8,
						borderRadius: 50,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<Ph.BookmarkSimpleIcon size={14} />
					<Text style={{ fontSize: 12 }}>저장</Text>
				</Pressable>
			</View>
			<View
				style={{
					marginTop: 10,
					backgroundColor: '#f3f3f3',
					padding: 10,
					borderRadius: 10,
				}}
			>
				<View style={{ marginBottom: 5 }}>
					<Text style={{ fontSize: 12, fontWeight: '400' }}>실시간 채팅</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						gap: 10,
						alignItems: 'center',
					}}
				>
					<Image
						source={{
							uri: 'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
						}}
						style={{
							width: 34,
							aspectRatio: 1 / 1,
							borderRadius: 100,
							borderWidth: 1,
							borderColor: '#ececec',
						}}
					/>
					<View
						style={{
							backgroundColor: '#ffffff',
							padding: 8,
							borderRadius: 10,
							flex: 1,
						}}
					>
						<Text style={{ fontSize: 12 }}>네이버클라우드(으)로 채팅하기</Text>
					</View>
				</View>
			</View>
		</>
	);
}
