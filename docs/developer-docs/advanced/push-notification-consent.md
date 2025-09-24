---
sidebar_position: 2
---

# 푸시 알림 사전 동의

Notifly SDK는 **푸시 알림 권한 요청을 자동으로 처리하지 않습니다.**  
즉, 사용자가 알림을 받을 수 있도록 **앱에서 직접 권한 요청 로직을 구현해야 합니다.**

아래는 플랫폼별 구현 방법입니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="android" label="Android">

## Android 푸시 알림 사전 동의

- Android **TIRAMISU(API 33)** 이상에서는 런타임 권한 요청이 필수입니다.  
- Notifly Android SDK와는 별개로, 앱에서 직접 권한 요청 코드를 작성해야 합니다.

👉 [Android Developers: Notification runtime permission](https://developer.android.com/develop/ui/views/notifications/notification-permission)

```kotlin
// 권한 요청 예시 (Kotlin)
private fun askNotificationPermission() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
        ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.POST_NOTIFICATIONS
        ) != PackageManager.PERMISSION_GRANTED
    ) {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.POST_NOTIFICATIONS),
            101
        )
    }
}
```
</TabItem>
<TabItem value="flutter" label="Flutter">

## Flutter 푸시 알림 사전 동의

	•	Notifly Flutter Plugin도 자체적으로 권한을 요청하지 않습니다.
	•	FirebaseMessaging의 requestPermission() API를 사용해 직접 권한 요청을 구현해야 합니다.

  👉 [FlutterFire Messaging requestPermission](https://firebase.flutter.dev/docs/messaging/usage/#request-permissions)

```dart
FirebaseMessaging messaging = FirebaseMessaging.instance;
NotificationSettings settings = await messaging.requestPermission(
  alert: true,
  badge: true,
  sound: true,
);
```
</TabItem>
<TabItem value="react-native" label="React Native">

## React Native 푸시 알림 사전 동의

👉 [React Native Firebase: Request permissions](https://rnfirebase.io/messaging/usage#requesting-permissions)

```javascript
import messaging from '@react-native-firebase/messaging';

await messaging().requestPermission();
```
</TabItem>
</Tabs>