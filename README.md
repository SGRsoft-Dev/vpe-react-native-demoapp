# VPE React Native SDK DEMO APP

<img src="https://tkmenfxu2702.edge.naverncp.com/profile/202508/429ff9d50047cc5462a718b256cca734.png" style="width:480px">

## 개발자 가이드 문서
https://vpe.sgrsoft.com/blank/ade80b?mcode=1210&mmidx=0

---

## Video Player Enhancement 소개
https://www.ncloud.com/product/media/videoPlayerEnhancement

## 설명
- 네이버클라우드 플래폼 제공 Video Player Enhancement 의 React Native SDK
- 해당 SDK는 Standard 요금제를 이용해야 사용 가능합니다.

---

## Expo GO 지원 불가
- VPE RN SDK는 Expo GO 에서 동작하지 않습니다.
- development build 를 이용해주시기 바랍니다.
---

## 초기설정
```shell

yarn install
```

## iOS 개발 테스트
```shell

yarn run ios:prebuild

yarn run ios:dev
```

## Android 개발 테스트
```shell

yarn run android:prebuild

yarn run android:dev
```

## Usage

```js
import { VpePlayer } from 'vpe-react-native';
import { StatusBar , TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CaretLeftIcon } from 'phosphor-react-native';

const [isFullScreen, setIsFullScreen] = useState(false);

return (
        <SafeAreaProvider>
            <SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right', '']} />
            <StatusBar barStyle={'dark-content'} hidden={isFullScreen ? true : false} />
                <VpePlayer
                        devTestAppId={'TEST DEV AppID'} //EXPO GO 대응 , 개발모드에서만 사용됨
                        accessKey={'VPE ACCESS KEY'} //AppID 와 일치하는 Access Key
                        platform={'pub'} //pub : 민간 , gov : 공공
                        backButton={() => { //백버튼 추가
                            return (
                                    <TouchableOpacity
                                            onPress={() => {
                                                //뒤로가기 기능 구현
                                            }}
                                    >
                                        <CaretLeftIcon size={22} color={'#ffffff'} />
                                    </TouchableOpacity>
                            );
                        }}
                        events={{
                            ready: () => {
                                console.log('player ready')
                            },
                            fullScreen: (data) => {
                                setIsFullScreen(data.isFullScreen);
                            },
                            timeupdate: (data) => {
                                console.log('영상 전체 길이 (duration) : ', data.duration);
                                console.log('현재 재생 위치 (currentTime) : ', data.currentTime);
                                console.log('현재 재생 퍼센트 (percent) : ', data.percent);
                                console.log('누적 재생 시간 (viewingTime) : ', data.viewingTime);
                                console.log('재생소스 타입 (sourceType) : ', data.sourceType); // 재생소스 타입(vod, live)
                            },
                            nextTrack: (data) => {
                                console.log(data);
                            },
                            prevTrack: (data) => {
                                console.log(data);
                            },
                            volumechange: (data) => {
                                console.log(data);
                            },
                            play: () => {
                                console.log('play');
                            },
                            pause: () => {
                                console.log('pause');
                            },
                            ended: () => {
                                console.log('ended');
                            },
                            controlbarActive: () => {
                                console.log('controlbarActive');
                            },
                            controlbarDeactive: () => {
                                console.log('controlbarDeactive');
                            },

                        }}
                        options={{
                            playlist: [ //재생소스
                                {
                                    file: 'https://m4qgahqg2249.edge.naverncp.com/hls/a4oif2oPHP-HlGGWOFm29A__/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_AVC_,FHD_2Pass_30fps,HD_2Pass_30fps,SD_2Pass_30fps,.mp4.smil/master.m3u8',
                                    poster: 'https://2ardrvaj2252.edge.naverncp.com/endpoint/sample/221027_NAVER_Cloud_intro_Long_ver_01.jpg',
                                    description: {
                                        title: '네이버클라우드 소개 영상',
                                        created_at: '2025.08.20',
                                        profile_name: '네이버클라우드',
                                        profile_image:
                                                'https://nnbkegvqsbcu5297614.cdn.ntruss.com/profile/202208/d127c8db642716d84b3201f1d152e52a.png',
                                    },
                                    vtt: [
                                        {
                                            id: 'ko',
                                            file: 'https://vpe.sgrsoft.com/ncp_overview_script_kr_v2.vtt',
                                            label: '한국어',
                                            default: true,
                                        },
                                        {
                                            id: 'en',
                                            file: 'https://vpe.sgrsoft.com/ncp_overview_script_en_v2.vtt',
                                            label: 'English',
                                        },
                                    ],
                                },
                            ],
                            autostart: true, //자동재생 여부
                            muted: true, //음소거 여부
                            aspectRatio: '16/9', //화면비
                            objectFit: 'contain', //화면 표시 'contain' | 'cover' | 'fill' | 'scale-down'
                            controls: true, //컨트롤 UI 사용
                            repeat: false, //반복 여부
                            startMutedInfoNotVisible: false, //음소거 상태 알림 아이콘 사용안함
                            controlBtn: { //컨트롤 버튼
                                play: true,
                                fullscreen: true,
                                volume: false,
                                times: true,
                                pictureInPicture: true,
                                setting: true,
                                subtitle: true,
                            },
                            progressBarColor: '#ff0000', //프로그레스바 색상
                            controlActiveTime: 3000, //컨트롤바 활성화 시간 (ms)
                            playRateSetting: [0.5, 0.75, 1, 1.5, 2], //재생속도 설정
                            playIndex: 0, //시작 플레이 리스트
                            descriptionNotVisible: false, //메타데이터 노출 안함

                            //리액트 네이티브 전용
                            screenRecordingPrevention: false, //화면 녹화 방지 사용 여부
                            allowsPictureInPicture: true, //PIP 사용 여부
                            autoPause: false, //false => 백그라운드 재생 허용
                            modalFullscreen: false, //true : 플레이어 모달 , false : 커스텀 풀스크린

                            captionStyle: {   // 자막 환경설정
                                fontSize: 12,
                                color: '#FFFFFF',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                edgeStyle: 'dropshadow',
                            },
                        }}
                />
        </SafeAreaProvider>
      )
```

## app.json 설정


```js

{
  "expo": {
    ...
    "plugins": [
        [
            "react-native-capture-protection",
            {
                "captureType": "fullMediaCapture"
            }
        ],
        [
            "@sgrsoft/react-native-video",
            {
                "enableAndroidPictureInPicture": true,
                "enableNotificationControls": true
            }
        ]
    ],
    "ios": {
      ...
	    "infoPlist": {
		    "UIBackgroundModes": [
                        "audio",
                        "fetch"
		    ]
	    }
      ...
    },
    "android": {
      ...
      "edgeToEdgeEnabled": true,
      "supportsPictureInPicture": true,
      "permissions": [
            "android.permission.FOREGROUND_SERVICE"
      ]
      ...
    },
  }
}

```


