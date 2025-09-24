---
sidebar_position: 1
---
# SDK 가이드

Notifly SDK는 모바일 애플리케이션 개발자가 앱에 푸시 알림과 인앱 팝업을 쉽게 구현할 수 있도록 지원하는 소프트웨어 개발 키트입니다.  
SDK는 사용자 세션, 기기 정보, 푸시 토큰 등의 데이터를 자동으로 수집하며, 이를 통합해 **사용자 프로파일**을 생성합니다.  
이 프로파일을 활용하면 특정 사용자에게 맞춤화된 푸시 알림과 인앱 팝업을 타겟팅하여 보낼 수 있습니다.

import DocCard from '@site/src/components/DocCard';
import DocCardGrid from '@site/src/components/DocCardGrid';

<div className="doccards-blue">
<DocCardGrid cols={3}>
 <DocCard
    title="Firebase 연동"
    description=""
    href="/developer-docs/firebase-integration"
    icon="🔥"
  />
  <DocCard
    title="iOS SDK"
    description="APNs 기반 iOS 네이티브 연동"
    href="/developer-docs/sdk/ios-sdk"
    icon="📱"
  />
  <DocCard
    title="Android SDK"
    description="Android 연동"
    href="/developer-docs/sdk/android-sdk"
    icon="🤖"
  />
  <DocCard
    title="React Native SDK"
    description="크로스 플랫폼 앱 연동"
    href="/developer-docs/sdk/react-native-sdk"
    icon="⚛️"
  />
  <DocCard
    title="Flutter SDK"
    description="Flutter 기반 크로스 플랫폼 앱 연동"
    href="/developer-docs/sdk/flutter-sdk"
    icon="💙"
  />
  <DocCard
    title="JavaScript SDK"
    description="웹 브라우저 연동"
    href="/developer-docs/sdk/javascript-sdk"
    icon="🌐"
  />
</DocCardGrid>
</div>

## 지원 플랫폼

### 모바일 플랫폼
- **Android SDK**: Firebase 기반 Android 네이티브 연동
- **iOS SDK**: APNs 기반 iOS 네이티브 연동
- **React Native**: 크로스 플랫폼 모바일 개발 지원
- **Flutter**: 크로스 플랫폼 모바일 개발 지원

### 웹 플랫폼
- **JavaScript SDK**: 웹 브라우저 연동
- **Google Tag Manager**: GTM을 통한 간편 연동

### 테스트
- **연동 테스트**: 실제 서비스 배포 전에 사전 검증 및 디버깅

## 시작하기

사용 중인 플랫폼에 맞는 SDK를 선택하고, 각 가이드를 따라 연동을 시작하세요.  
Notifly SDK는 다음 기능들을 제공합니다:

- 손쉬운 설치 및 초기 설정  
- 다양한 이벤트 추적 기능  
- 사용자 세분화 기능  
- 실시간 분석  
- A/B 테스트 지원  