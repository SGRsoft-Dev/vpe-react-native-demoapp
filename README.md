# VPE React Native SDK V2 DEMO APP for EXPO

React Native 를 지원하는 크로스플랫폼 비디오 플레이어 SDK (`vpe-react-native` V2) 의 기능을 한 화면씩 시연하는 Expo 데모 앱입니다.
JSON 레이아웃, 스트리밍 프로토콜, 반응형 디자인을 지원합니다.

<img src="https://tkmenfxu2702.edge.naverncp.com/profile/202604/652f7e2addef9dbe4420bf8f1b4d920e.png" style="width:480px">

## 개발자 가이드 문서
https://developer.vpe.naverncp.com/docs/rn/intro

---

## Video Player Enhancement 소개
https://www.ncloud.com/product/media/videoPlayerEnhancement

## 설명
- 네이버클라우드 플랫폼 제공 Video Player Enhancement 의 React Native SDK
- 해당 SDK는 Standard 요금제를 이용해야 사용 가능합니다.
- 본 데모 앱은 SDK V2 (`vpe-react-native@^2.1.1`) 를 사용합니다.

---

## Expo GO 지원 불가
- VPE RN SDK는 Expo GO 에서 동작하지 않습니다.
- development build 를 이용해주시기 바랍니다.

---

## SDK 의존성

이 데모 앱은 다음 peer dependency 를 사용합니다 (`package.json` 에 이미 포함됨).

```sh
yarn add vpe-react-native
yarn add @sgrsoft/react-native-video react-native-svg react-native-capture-protection \
         phosphor-react-native expo-screen-orientation expo-navigation-bar \
         expo-localization expo-application expo-network @miblanchard/react-native-slider
```

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

---

## 데모 화면 목록

`src/HomeScreen.js` 에서 모든 데모로 이동할 수 있습니다.

| 데모 | 내용 |
|---|---|
| **BasicDemo** | UGC 표준 사용 예 |
| **LayoutDemo** | 사용자 정의 layout (pc/mobile/fullscreen × vod/live) |
| **ControlsShowcase** | 모든 컨트롤 컴포넌트를 한 화면에서 디자인 검증 |
| **LiveDemo** | LL HLS 라이브 |
| **Drm / NcpDrm** | PallyCon / Ncloud DRM |
| **Pip** | Picture-in-Picture |
| **Watermark** | 워터마크 표시 |
| **ScreenRecordingPrevention** | 화면 녹화 방지 |
| **FullscreenDemo** | 풀스크린 동작 |
| **CustomButton / IconChange** | 컨트롤 아이콘 / 버튼 커스터마이징 |
| **Override / ErrorOverride** | 동작 / 에러 메시지 오버라이드 |
| **PlayerEvent** | 이벤트 콜백 검증 |
| **Method** | playerRef 메서드 호출 |
| **StartTime** | 시작 위치 지정 |
| **NoOption** | 옵션 없는 최소 구성 |
| **VTTPasre** | VTT 파싱 |
| **KeyChange** | 라이선스 키/AppId 런타임 변경 |

---

## 개발용 라이선스 키 설정 (`src/lib/lickeyhook.js`)

데모 앱은 모든 화면에서 `loadKey()` 훅을 통해 `accessKey` / `devTestAppId` 를 주입합니다.
키 값을 바꾸려면 `src/lib/lickeyhook.js` 의 디폴트 값을 수정하거나, `KeyChange` 데모로 런타임에 변경 후 AsyncStorage 에 저장할 수 있습니다.

```js
// src/lib/lickeyhook.js
const [testKey, setTestKey] = useState('YOUR_VPE_ACCESS_KEY');
const [testAppId, setTestAppId] = useState('YOUR_APP_ID');
const [isBeta, setIsBeta] = useState(false);  // beta 스테이지 여부
const [isGov, setIsGov] = useState(false);    // 공공 (gov) 여부
const [isDev, setIsDev] = useState(false);    // dev 모드 여부
```

각 데모 파일에서는 다음과 같이 사용됩니다:

```js
import { loadKey } from './lib/lickeyhook';

const lkey = loadKey();

<VpePlayer
    devTestAppId={lkey.testAppId}
    accessKey={lkey.testKey}
    platform={lkey.isGov ? 'gov' : 'pub'}
    stage={lkey.isBeta ? 'beta' : 'prod'}
    isDev={lkey.isDev ? true : false}
    {...rest}
/>
```

---

## V2 주요 변경 사항

V2는 layout-driven 컨트롤 시스템을 기반으로 재작성되었습니다. 기존 `PlayerControls` 컴포넌트는 삭제되었고, `<VpePlayer />` 는 항상 새 `ControlBar` 를 사용합니다.

| 항목 | 내용 |
|---|---|
| **Layout 시스템** | `layout` prop 으로 컨트롤 구성 자유 정의. responsive (pc/mobile/fullscreen × vod/live × breakpoint 768) |
| **PlayerContext** | 모든 컨트롤 컴포넌트가 prop drilling 없이 상태/액션 접근 (`isPlaying`/`isFullScreen`/`isLive`/`isPip` ··· `togglePlay`/`seek`/`next`/`prev`/`pip` ···) |
| **단위 컨트롤 컴포넌트 (22개)** | PlayBtn, BigPlayBtn, VolumeBtn, MuteBtn, TimeBtn, CurrentTimeBtn, DurationBtn, SeekBar, FullscreenBtn, SubtitleBtn, SettingBtn, PrevBtn, NextBtn, NextPrevBtn, MetaDesc, BackBtn, ShareBtn, SkipForwardBtn, SkipBackBtn, NextVideoInfo, Group, Blank |
| **IconOverrides 확장** | 18개 아이콘 키, 4가지 값 타입 지원 (`ReactNode \| string(URL) \| number(require) \| () => ReactNode`). `props.icon` → `options.icon` 으로 위치 이동 |
| **NextVideoInfo** | 영상 종료 후 다음 영상 카드 (썸네일 + 5초 카운트다운 자동 재생). BigPlayBtn 에 자동 통합 |
| **제스처 시스템** | 좌/중/우 1/3 영역 분할 더블탭 누적 seek (10초 단위, 500ms debounce), 방사형 SeekIndicator |
| **fade 애니메이션** | 컨트롤바 0.3 초 부드러운 페이드 인/아웃 |
| **Group 알약/원형 디자인** | `wrapper: 'Group'` 디폴트 알약 모양, 단일 자식이면 원형 |
| **i18n** | `ko` / `en` / `ja` / `zh` 자동 감지 |
| **events.backPress** | 백버튼 콜백 (이전 `props.backButton` 폐지). BackBtn 이 디폴트 layout top 최왼쪽에 자동 표시 |
| **PipBtn 폐지** | 명시적 PIP 버튼 제거. iOS 는 `playerRef.current.pip()`, Android 는 `allowsPictureInPicture` lifecycle 자동 진입 |

### V1 → V2 Migration

| 항목 | V1 | V2 |
|---|---|---|
| 백버튼 | `<VpePlayer backButton={() => <CustomBack/>}/>` | `<VpePlayer events={{ backPress: () => ... }}/>` (BackBtn 자동 렌더) |
| 아이콘 오버라이드 | `<VpePlayer icon={{ play: ... }}/>` | `<VpePlayer options={{ icon: { play: ... } }}/>` |
| 컨트롤바 | `PlayerControls` (삭제) | `ControlBar` 자동 — `layout` prop 으로 커스텀 |
| PIP 버튼 | `PipBtn` 컴포넌트 | 폐지. `playerRef.current.pip()` 또는 `allowsPictureInPicture` lifecycle |

---

## Usage (V2)

```js
import { VpePlayer } from 'vpe-react-native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loadKey } from './lib/lickeyhook';

export default function Player() {
    const navigation = useNavigation();
    const playerRef = useRef(null);
    const lkey = loadKey();
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={isFullScreen ? ['none'] : ['top', 'left', 'right']} />
            <StatusBar barStyle={'dark-content'} hidden={isFullScreen} />

            <VpePlayer
                ref={playerRef}
                devTestAppId={lkey.testAppId}
                accessKey={lkey.testKey}
                platform={lkey.isGov ? 'gov' : 'pub'}
                stage={lkey.isBeta ? 'beta' : 'prod'}
                isDev={lkey.isDev ? true : false}
                events={{
                    // V2 신규 — 백버튼 콜백 (이전 backButton prop 대체)
                    backPress: () => {
                        if (navigation.canGoBack()) navigation.goBack();
                    },
                    ready: () => console.log('player ready'),
                    fullScreen: (data) => setIsFullScreen(data.isFullScreen),
                    timeupdate: (data) => {
                        // duration / currentTime / percent / sourceType
                    },
                    play: () => console.log('play'),
                    pause: () => console.log('pause'),
                    ended: () => console.log('ended'),
                }}
                options={{
                    playlist: [
                        {
                            file: 'https://m4qgahqg2249.edge.naverncp.com/hls/.../master.m3u8',
                            poster: 'https://2ardrvaj2252.edge.naverncp.com/.../poster.jpg',
                            description: {
                                title: '네이버클라우드 소개 영상',
                                created_at: '2025.08.20',
                                profile_name: '네이버클라우드',
                                profile_image: 'https://.../profile.png',
                            },
                            vtt: [
                                { id: 'ko', file: 'https://.../ko.vtt', label: '한국어', default: true },
                                { id: 'en', file: 'https://.../en.vtt', label: 'English' },
                            ],
                        },
                    ],
                    autostart: true,
                    muted: true,
                    aspectRatio: '16/9',
                    objectFit: 'contain',
                    controls: true,
                    startMutedInfoNotVisible: false,
                    controlBtn: {
                        play: true,
                        fullscreen: true,
                        progressBar: true,
                        volume: true,
                        times: true,
                        pictureInPicture: true,
                        setting: true,
                        subtitle: true,
                    },
                    progressBarColor: '#ff0000',
                    controlActiveTime: 3000,
                    playRateSetting: [0.5, 0.75, 1, 1.5, 2],
                    playIndex: 0,
                    descriptionNotVisible: false,

                    // 리액트 네이티브 전용
                    screenRecordingPrevention: false,
                    allowsPictureInPicture: true,
                    autoPause: false,
                    modalFullscreen: false,

                    // V2 신규 — 아이콘 오버라이드 (이전 props.icon → options.icon)
                    icon: {
                        // play: <CustomPlayIcon/>,                       // ReactNode
                        // bigPlay: 'https://example.com/play.svg',       // 원격 URL
                        // back: require('./assets/back.png'),            // 로컬 require
                        // setting: () => <CustomSettingIcon/>,           // 함수형
                    },

                    captionStyle: {
                        fontSize: 12,
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        edgeStyle: 'dropshadow',
                    },
                }}
            />
        </SafeAreaProvider>
    );
}
```

---

## V2 신규 — events.backPress

이전의 `backButton` prop 은 폐지되고 `events.backPress` 콜백으로 대체되었습니다. 기본 `BackBtn` 컴포넌트가 디폴트 layout 의 top 최왼쪽에 자동 표시되며, 누르면 `events.backPress` 가 호출됩니다.

```js
events={{
    backPress: () => {
        if (navigation.canGoBack()) navigation.goBack();
    },
}}
```

---

## V2 신규 — layout 시스템

`layout` prop 미지정 시 디폴트 (`pcLayout` / `mobileLayout` / `fullscreenLayout`) 가 화면 크기 / 라이브 / 풀스크린 여부에 따라 자동 적용됩니다. 사용자 정의 시 일부 섹션만 override 해도 디폴트와 deep merge 됩니다.

```js
<VpePlayer
    layout={{
        pc: {
            vod: {
                iconSize: 20,                              // 이 layout 의 디폴트 아이콘 크기 (fullscreen 자동 +3)
                order: ['top', 'center', 'lower', 'bottom', 'seekbar'],
                top: [
                    { items: ['BackBtn'], wrapper: 'Group' },
                    { items: ['MetaDesc'], wrapper: 'Blank' },
                    { items: ['ShareBtn', 'SettingBtn'], wrapper: 'Group', cap: 2 },
                ],
                center: [{ items: ['BigPlayBtn'], align: 'center' }],
                lower: [
                    { items: ['TimeBtn'], wrapper: 'Group', align: 'left' },
                    { wrapper: 'Blank', align: 'left' },
                    { items: ['SubtitleBtn', 'FullscreenBtn'], wrapper: 'Group' },
                ],
                bottom: [],
                // 'seekbar' 슬롯이 order 에 있으면 화면 하단 풀폭 SeekBar 자동 표시
            },
            live: { /* ... */ },
        },
        mobile: { vod: { /* ... */ }, live: { /* ... */ } },
        fullscreen: { vod: { /* ... */ }, live: { /* ... */ } },
        breakpoint: 768, // 모바일 판정 기준 px
    }}
    {...rest}
/>
```

### 사용 가능한 컨트롤 아이템 이름

`PlayBtn`, `BigPlayBtn`, `VolumeBtn`, `MuteBtn`, `TimeBtn`, `CurrentTimeBtn`, `DurationBtn`, `SeekBar`, `FullscreenBtn`, `SubtitleBtn`, `SettingBtn`, `PrevBtn`, `NextBtn`, `NextPrevBtn`, `MetaDesc`, `BackBtn`, `ShareBtn`, `SkipForwardBtn`, `SkipBackBtn`, `NextVideoInfo`, `Blank`

### 그룹 wrapper

| wrapper | 동작 |
|---|---|
| `'Group'` (디폴트) | 알약 모양 (gray 0.4 배경, borderRadius). 단일 자식이면 원형 |
| `'Blank'` | spacer 또는 자식 정렬 wrapper. 자식 없으면 `flex: 1` |

### 그룹 옵션

| 옵션 | 설명 |
|---|---|
| `items` | 컨트롤 이름 배열 또는 ReactNode 배열 |
| `wrapper` | `'Group'` \| `'Blank'` |
| `align` | `'left'` \| `'right'` \| `'center'` |
| `cap` | 표시할 자식 최대 개수 (초과분 잘림) |
| `noPadding` | true 시 알약/원형 배경 끔 (단순 row) |
| `style` | 추가 ViewStyle override |

> `__DEV__` 에서 layout 정의가 잘못되면 console.warn 으로 즉시 알림 (알 수 없는 itemName, 잘못된 wrapper/align/order 등).

`LayoutDemo` 화면에서 6 가지 variant (pc/mobile/fullscreen × vod/live) 의 사용자 정의 layout 동작을 직접 확인할 수 있고, `ControlsShowcase` 에서 22 개 컨트롤이 한 화면에 모두 렌더링됩니다.

---

## V2 신규 — IconOverrides

`options.icon` 객체로 모든 아이콘을 자유롭게 override 할 수 있습니다. (`props.icon` 폐지)

### 키 (총 18개)

```
bigPlay, play, pause, replay, prev, next,
subtitle, subtitleOff,
fullscreen, fullscreenExit,
volumeFull, volumeMid, volumeMute,
setting,
back, share, skipForward, skipBack
```

### 값 타입 (4가지)

```js
options={{
    icon: {
        play: <CustomPlayIcon size={28} />,            // 1. ReactNode
        bigPlay: 'https://example.com/play-icon.svg',  // 2. string (원격 URL)
        back: require('./assets/back.png'),            // 3. number (require)
        setting: () => <DynamicSettingIcon />,         // 4. function
    },
}}
```

`IconChange` 데모에서 모든 키에 대한 override 결과를 직접 확인할 수 있습니다.

---

## playerRef API

```js
const playerRef = useRef(null);

playerRef.current.play();
playerRef.current.pause();
playerRef.current.currentTime(30);          // seek to 30s
playerRef.current.muted(true);
playerRef.current.fullscreen(true);
playerRef.current.next();                   // 다음 플레이리스트
playerRef.current.prev();                   // 이전 플레이리스트
playerRef.current.pip();                    // iOS PIP 진입
playerRef.current.destroy();                // 플레이어 해제
```

`Method` 데모에서 모든 ref API 호출을 한 화면에서 검증할 수 있습니다.

---

## app.json 설정

```js
{
  "expo": {
    "plugins": [
      [
        "react-native-capture-protection",
        { "captureType": "fullMediaCapture" }
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
      "infoPlist": {
        "UIBackgroundModes": ["audio", "fetch"]
      }
    },
    "android": {
      "edgeToEdgeEnabled": true,
      "supportsPictureInPicture": true,
      "permissions": [
        "android.permission.FOREGROUND_SERVICE"
      ]
    }
  }
}
```

---

## iOS Podfile 패치 (Xcode 16.3+ 대응)

Xcode 16.3 이상의 Clang 환경에서 `fmt` 라이브러리의 `consteval` 빌드 에러
(`call to consteval function ... is not a constant expression`) 가 발생할 수 있습니다.
본 데모 앱의 `ios/Podfile` 에는 다음 post_install 패치가 적용되어 있습니다 — `pod install` 시 자동으로 `Pods/fmt/include/fmt/base.h` 의 `FMT_USE_CONSTEVAL` 을 강제 0 으로 패치합니다.

```ruby
post_install do |installer|
  # ... (생략)

  # Workaround for fmt + Xcode 16.3 / Clang consteval incompatibility
  fmt_base = File.join(__dir__, 'Pods', 'fmt', 'include', 'fmt', 'base.h')
  if File.exist?(fmt_base)
    contents = File.read(fmt_base)
    patched = contents.sub(
      /\/\/ Detect consteval[^\n]*\n#if !defined\(__cpp_lib_is_constant_evaluated\).*?#endif\n/m,
      "// Patched: force-disable consteval (Xcode 16.3 / Clang incompatibility)\n#define FMT_USE_CONSTEVAL 0\n"
    )
    if patched != contents
      File.write(fmt_base, patched)
      Pod::UI.puts "Patched fmt/base.h to disable FMT_USE_CONSTEVAL".green
    end
  end
end
```

> Xcode 16.3 미만 환경에서는 패치가 적용되어도 동작에 영향이 없습니다.

> 참고: SDK example 워크스페이스 (`vpe-react-native/example/ios/Podfile`) 는 build setting 기반 (`CLANG_CXX_LANGUAGE_STANDARD = gnu++17` + `GCC_PREPROCESSOR_DEFINITIONS << 'FMT_USE_CONSTEVAL=0'`) 으로 처리합니다. 본 데모 앱은 `fmt/base.h` 가 매크로를 unconditionally 재정의하는 문제를 회피하기 위해 헤더 직접 패치 방식을 사용합니다.

---

## 라이선스 / 문의

- 문서: https://developer.vpe.naverncp.com/docs/rn/intro
- 제품 소개: https://www.ncloud.com/product/media/videoPlayerEnhancement
