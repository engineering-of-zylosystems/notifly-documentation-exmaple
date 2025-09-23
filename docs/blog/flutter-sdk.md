---
slug: flutter-sdk
title: Client SDK - Flutter
date: 2024-01-16
authors: []
tags: [flutter, sdk, mobile]
---

# Flutter SDK

Notifly Flutter SDK를 사용하여 Flutter 앱에 푸시 알림 기능을 통합하세요.

<!-- truncate -->

## 설치

### pubspec.yaml

```yaml
dependencies:
  notifly_flutter: ^latest_version
```

```bash
flutter pub get
```

## 초기화

```dart
import 'package:notifly_flutter/notifly_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Notifly.initialize('YOUR_PROJECT_ID');
  
  runApp(MyApp());
}
```

## 주요 기능

### 사용자 등록
```dart
await Notifly.setUserId('user123');
await Notifly.setUserProperties({
  'name': 'John Doe',
  'email': 'john@example.com'
});
```

### 이벤트 추적
```dart
await Notifly.track('purchase', {
  'product_id': 'item123',
  'price': 29.99,
  'currency': 'USD'
});
```

### 푸시 알림 처리
```dart
// 알림 수신 리스너
Notifly.onNotificationReceived.listen((notification) {
  print('Notification received: $notification');
});

// 알림 클릭 리스너
Notifly.onNotificationClicked.listen((notification) {
  print('Notification clicked: $notification');
  // 딥링크 처리
});
```

## 플랫폼 설정

### Android 설정
- `android/app/build.gradle` 설정
- Firebase 구성 파일 추가

### iOS 설정
- `ios/Runner/Info.plist` 설정
- APNs 인증서 구성