---
sidebar_position: 1
---
# SDK 가이드

Notifly SDK는 모바일 애플리케이션 개발자가 앱에 푸시 알림과 인앱 팝업을 쉽게 구현할 수 있도록 지원하는 소프트웨어 개발 키트입니다.  
SDK는 사용자 세션, 기기 정보, 푸시 토큰 등의 데이터를 자동으로 수집하며, 이를 통합해 **사용자 프로파일**을 생성합니다.  
이 프로파일을 활용하면 특정 사용자에게 맞춤화된 푸시 알림과 인앱 팝업을 타겟팅하여 보낼 수 있습니다.

:::info Firebase 프로젝트 필요
모든 SDK는 Firebase Cloud Messaging(FCM) 을 기반으로 동작합니다.
따라서 SDK를 설치하기 전에 반드시 Firebase 프로젝트를 생성하고 노티플라이와 연동해야 합니다. 👉 [Firebase 프로젝트 연동 가이드](docs/developer-docs/sdk/firebase-integration.md)
:::

import DocCard from '@site/src/components/DocCard';
import DocCardGrid from '@site/src/components/DocCardGrid';

<div className="doccards-blue">
<DocCardGrid cols={3}>
 <DocCard
    title="Firebase 연동"
    description="Firebase 연동하기"
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