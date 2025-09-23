---
slug: react-native-sdk
title: Client SDK - React Native
date: 2024-01-13
authors: []
tags: [react-native, sdk, mobile]
---

# React Native SDK

Notifly React Native SDK를 사용하여 크로스 플랫폼 앱에 푸시 알림 기능을 통합하세요.

<!-- truncate -->

## 설치

```bash
npm install @notifly/react-native-sdk
# or
yarn add @notifly/react-native-sdk
```

### iOS 추가 설정

```bash
cd ios && pod install
```

## 초기화

```javascript
import Notifly from '@notifly/react-native-sdk';

// App.js
export default function App() {
  useEffect(() => {
    Notifly.initialize('YOUR_PROJECT_ID');
  }, []);

  return (
    // Your app content
  );
}
```

## 주요 기능

### 사용자 등록
```javascript
Notifly.setUserId('user123');
Notifly.setUserProperties({
  name: 'John Doe',
  email: 'john@example.com'
});
```

### 이벤트 추적
```javascript
Notifly.track('purchase', {
  product_id: 'item123',
  price: 29.99,
  currency: 'USD'
});
```

### 푸시 알림 처리
```javascript
// 포그라운드 알림 처리
Notifly.onNotificationReceived((notification) => {
  console.log('Notification received:', notification);
});

// 알림 클릭 처리
Notifly.onNotificationClicked((notification) => {
  console.log('Notification clicked:', notification);
});
```

## 플랫폼별 설정

### Android
- Firebase 설정 파일 추가
- 권한 설정

### iOS
- APNs 인증서 설정
- 백그라운드 모드 활성화