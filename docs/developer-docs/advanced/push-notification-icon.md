---
sidebar_position: 1
---

# 푸시 알림 아이콘 설정

푸시 알림에 표시되는 아이콘을 커스터마이징하는 방법을 안내합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

## iOS 아이콘 설정

### 앱 아이콘 사용
기본적으로 iOS는 앱 아이콘을 푸시 알림에 사용합니다.

### 커스텀 아이콘 설정
```swift
// UNNotificationContent 확장을 통한 아이콘 설정
let content = UNMutableNotificationContent()
content.title = "알림 제목"
content.body = "알림 내용"

// 앱 번들의 이미지 사용
if let imageURL = Bundle.main.url(forResource: "notification-icon", withExtension: "png") {
    let attachment = try UNNotificationAttachment(identifier: "icon", url: imageURL, options: nil)
    content.attachments = [attachment]
}
```

### 아이콘 요구사항
- 크기: 20x20, 40x40, 60x60 포인트
- 형식: PNG
- 투명 배경 권장

</TabItem>
<TabItem value="android" label="Android">

## Android 아이콘 설정

### 기본 아이콘 설정
```java
// NotificationCompat.Builder를 통한 아이콘 설정
NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.large_icon))
    .setContentTitle("알림 제목")
    .setContentText("알림 내용");
```

### Notifly SDK를 통한 설정
```java
// 기본 아이콘 설정
Notifly.setDefaultNotificationIcon(R.drawable.ic_notification);

// 큰 아이콘 설정
Notifly.setDefaultLargeIcon(R.drawable.large_icon);
```

### 아이콘 요구사항
- Small Icon: 24x24dp (벡터 드로어블 권장)
- Large Icon: 256x256px
- 형식: PNG, 벡터 드로어블

</TabItem>
<TabItem value="flutter" label="Flutter">

## Flutter 아이콘 설정

### 플랫폼별 아이콘 설정
```dart
// iOS 설정
await Notifly.setNotificationIcon(
  ios: NotificationIconConfig(
    bundleImageName: 'notification-icon',
  ),
);

// Android 설정
await Notifly.setNotificationIcon(
  android: NotificationIconConfig(
    smallIcon: 'ic_notification',
    largeIcon: 'large_icon',
  ),
);
```

### 리소스 추가
```yaml
# pubspec.yaml
flutter:
  assets:
    - assets/icons/notification-icon.png
```

</TabItem>
<TabItem value="react-native" label="React Native">

## React Native 아이콘 설정

### 기본 아이콘 설정
```javascript
// 기본 아이콘 설정
await Notifly.setDefaultNotificationIcon({
  ios: 'notification-icon',
  android: {
    smallIcon: 'ic_notification',
    largeIcon: 'large_icon'
  }
});
```

### 동적 아이콘 설정
```javascript
// 특정 알림에 대한 아이콘 설정
Notifly.onNotificationReceived((notification) => {
  notification.setIcon({
    ios: 'custom-icon',
    android: 'ic_custom'
  });
});
```

</TabItem>
</Tabs>