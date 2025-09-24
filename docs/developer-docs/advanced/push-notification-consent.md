---
sidebar_position: 2
---

# 푸시 알림 사전 동의

푸시 알림 권한을 요청하기 전에 사용자에게 동의를 구하는 방법을 안내합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

## iOS 사전 동의

### 권한 요청 전 동의 받기
```swift
// 사용자에게 푸시 알림의 가치를 설명하는 UI 표시
func showPushConsentDialog() {
    let alert = UIAlertController(
        title: "알림 허용",
        message: "새로운 소식과 중요한 업데이트를 받아보시겠습니까?",
        preferredStyle: .alert
    )
    
    alert.addAction(UIAlertAction(title: "허용", style: .default) { _ in
        self.requestPushPermission()
    })
    
    alert.addAction(UIAlertAction(title: "나중에", style: .cancel))
    
    present(alert, animated: true)
}

// 실제 권한 요청
func requestPushPermission() {
    Notifly.requestPushPermission { granted in
        print("Push permission granted: \(granted)")
    }
}
```

### 권한 상태 확인
```swift
Notifly.getPushPermissionStatus { status in
    switch status {
    case .notDetermined:
        // 아직 요청하지 않음
        showPushConsentDialog()
    case .denied:
        // 거부됨 - 설정으로 안내
        showSettingsAlert()
    case .authorized:
        // 허용됨
        break
    }
}
```

</TabItem>
<TabItem value="android" label="Android">

## Android 사전 동의

### 권한 요청 전 동의 받기
```java
// 사용자에게 푸시 알림의 가치를 설명
private void showPushConsentDialog() {
    new AlertDialog.Builder(this)
        .setTitle("알림 허용")
        .setMessage("새로운 소식과 중요한 업데이트를 받아보시겠습니까?")
        .setPositiveButton("허용", (dialog, which) -> {
            requestPushPermission();
        })
        .setNegativeButton("나중에", null)
        .show();
}

// 실제 권한 요청 (Android 13+)
private void requestPushPermission() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) 
            != PackageManager.PERMISSION_GRANTED) {
            
            ActivityCompat.requestPermissions(this, 
                new String[]{Manifest.permission.POST_NOTIFICATIONS}, 
                NOTIFICATION_PERMISSION_REQUEST_CODE);
        }
    } else {
        // Android 12 이하에서는 자동으로 허용됨
        Notifly.initialize(this, "PROJECT_ID");
    }
}
```

### 권한 결과 처리
```java
@Override
public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    if (requestCode == NOTIFICATION_PERMISSION_REQUEST_CODE) {
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            // 권한 허용됨
            Notifly.initialize(this, "PROJECT_ID");
        } else {
            // 권한 거부됨
            showPermissionDeniedDialog();
        }
    }
}
```

</TabItem>
<TabItem value="flutter" label="Flutter">

## Flutter 사전 동의

### 권한 요청 전 동의 받기
```dart
// 사용자에게 푸시 알림의 가치를 설명
Future<void> showPushConsentDialog() async {
  final result = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('알림 허용'),
      content: Text('새로운 소식과 중요한 업데이트를 받아보시겠습니까?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(false),
          child: Text('나중에'),
        ),
        TextButton(
          onPressed: () => Navigator.of(context).pop(true),
          child: Text('허용'),
        ),
      ],
    ),
  );

  if (result == true) {
    await requestPushPermission();
  }
}

// 실제 권한 요청
Future<void> requestPushPermission() async {
  final granted = await Notifly.requestPushPermission();
  print('Push permission granted: $granted');
}
```

### 권한 상태 확인
```dart
Future<void> checkPushPermissionStatus() async {
  final status = await Notifly.getPushPermissionStatus();
  
  switch (status) {
    case PushPermissionStatus.notDetermined:
      await showPushConsentDialog();
      break;
    case PushPermissionStatus.denied:
      await showSettingsDialog();
      break;
    case PushPermissionStatus.authorized:
      // 이미 허용됨
      break;
  }
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

## React Native 사전 동의

### 권한 요청 전 동의 받기
```javascript
import { Alert } from 'react-native';

// 사용자에게 푸시 알림의 가치를 설명
const showPushConsentDialog = () => {
  Alert.alert(
    '알림 허용',
    '새로운 소식과 중요한 업데이트를 받아보시겠습니까?',
    [
      {
        text: '나중에',
        style: 'cancel',
      },
      {
        text: '허용',
        onPress: requestPushPermission,
      },
    ]
  );
};

// 실제 권한 요청
const requestPushPermission = async () => {
  try {
    const granted = await Notifly.requestPushPermission();
    console.log('Push permission granted:', granted);
  } catch (error) {
    console.error('Push permission error:', error);
  }
};
```

### 권한 상태 확인
```javascript
const checkPushPermissionStatus = async () => {
  try {
    const status = await Notifly.getPushPermissionStatus();
    
    switch (status) {
      case 'notDetermined':
        showPushConsentDialog();
        break;
      case 'denied':
        showSettingsAlert();
        break;
      case 'authorized':
        // 이미 허용됨
        break;
    }
  } catch (error) {
    console.error('Permission status error:', error);
  }
};
```

</TabItem>
</Tabs>