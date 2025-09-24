---
sidebar_position: 3
---

# 푸시 알림 클릭 이벤트

푸시 알림을 클릭했을 때의 이벤트를 처리하는 방법을 안내합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

## iOS 클릭 이벤트 처리

### 기본 클릭 이벤트
```swift
// AppDelegate에서 알림 클릭 처리
func userNotificationCenter(_ center: UNUserNotificationCenter, 
                          didReceive response: UNNotificationResponse, 
                          withCompletionHandler completionHandler: @escaping () -> Void) {
    
    let userInfo = response.notification.request.content.userInfo
    
    // Notifly 알림인지 확인
    if Notifly.isNotiflyNotification(userInfo) {
        Notifly.handleNotificationClick(userInfo) { result in
            // 클릭 처리 결과
            print("Notification click handled: \(result)")
        }
    }
    
    completionHandler()
}
```

### 커스텀 클릭 처리
```swift
// 클릭 이벤트 리스너 등록
Notifly.setNotificationClickListener { notification in
    print("Notification clicked: \(notification.title)")
    
    // 딥링크 처리
    if let deeplink = notification.deeplink {
        handleDeeplink(deeplink)
    }
    
    // 커스텀 데이터 처리
    if let customData = notification.customData {
        handleCustomData(customData)
    }
}
```

### 인터페이스
```swift
// NotificationClickListener 프로토콜
protocol NotificationClickListener {
    func onNotificationClicked(_ notification: NotiflyNotification)
}

// NotiflyNotification 구조체
struct NotiflyNotification {
    let id: String
    let title: String
    let body: String
    let deeplink: String?
    let customData: [String: Any]?
    let imageUrl: String?
}
```

</TabItem>
<TabItem value="android" label="Android">

## Android 클릭 이벤트 처리

### 기본 클릭 이벤트
```java
// MainActivity에서 인텐트 처리
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    // 알림 클릭으로 앱이 시작된 경우
    Intent intent = getIntent();
    if (Notifly.isNotiflyIntent(intent)) {
        Notifly.handleNotificationClick(intent, new NotificationClickCallback() {
            @Override
            public void onSuccess(NotificationClickResult result) {
                // 클릭 처리 성공
                Log.d("Notifly", "Notification click handled: " + result.toString());
            }
            
            @Override
            public void onError(Exception error) {
                // 클릭 처리 실패
                Log.e("Notifly", "Notification click error", error);
            }
        });
    }
}
```

### 커스텀 클릭 처리
```java
// 클릭 이벤트 리스너 등록
Notifly.setNotificationClickListener(new NotificationClickListener() {
    @Override
    public void onNotificationClicked(NotiflyNotification notification) {
        Log.d("Notifly", "Notification clicked: " + notification.getTitle());
        
        // 딥링크 처리
        String deeplink = notification.getDeeplink();
        if (deeplink != null) {
            handleDeeplink(deeplink);
        }
        
        // 커스텀 데이터 처리
        Map<String, Object> customData = notification.getCustomData();
        if (customData != null) {
            handleCustomData(customData);
        }
    }
});
```

### 인터페이스
```java
// NotificationClickListener 인터페이스
public interface NotificationClickListener {
    void onNotificationClicked(NotiflyNotification notification);
}

// NotiflyNotification 클래스
public class NotiflyNotification {
    private String id;
    private String title;
    private String body;
    private String deeplink;
    private Map<String, Object> customData;
    private String imageUrl;
    
    // Getter 메서드들
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getBody() { return body; }
    public String getDeeplink() { return deeplink; }
    public Map<String, Object> getCustomData() { return customData; }
    public String getImageUrl() { return imageUrl; }
}
```

</TabItem>
<TabItem value="flutter" label="Flutter">

## Flutter 클릭 이벤트 처리

### 기본 클릭 이벤트
```dart
// 앱 초기화 시 클릭 이벤트 리스너 등록
void initializeNotifly() async {
  await Notifly.initialize('PROJECT_ID');
  
  // 클릭 이벤트 스트림 구독
  Notifly.onNotificationClicked.listen((notification) {
    print('Notification clicked: ${notification.title}');
    handleNotificationClick(notification);
  });
}

// 클릭 처리 함수
void handleNotificationClick(NotiflyNotification notification) {
  // 딥링크 처리
  if (notification.deeplink != null) {
    handleDeeplink(notification.deeplink!);
  }
  
  // 커스텀 데이터 처리
  if (notification.customData != null) {
    handleCustomData(notification.customData!);
  }
}
```

### 앱이 종료된 상태에서 클릭 처리
```dart
// main 함수에서 초기 알림 확인
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // 앱이 종료된 상태에서 알림 클릭으로 시작된 경우
  final initialNotification = await Notifly.getInitialNotification();
  if (initialNotification != null) {
    // 초기 알림 처리
    handleNotificationClick(initialNotification);
  }
  
  runApp(MyApp());
}
```

### 인터페이스
```dart
// NotiflyNotification 클래스
class NotiflyNotification {
  final String id;
  final String title;
  final String body;
  final String? deeplink;
  final Map<String, dynamic>? customData;
  final String? imageUrl;
  
  NotiflyNotification({
    required this.id,
    required this.title,
    required this.body,
    this.deeplink,
    this.customData,
    this.imageUrl,
  });
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

## React Native 클릭 이벤트 처리

### 기본 클릭 이벤트
```javascript
import { useEffect } from 'react';

// 컴포넌트에서 클릭 이벤트 리스너 등록
const App = () => {
  useEffect(() => {
    // 클릭 이벤트 리스너 등록
    const unsubscribe = Notifly.onNotificationClicked((notification) => {
      console.log('Notification clicked:', notification.title);
      handleNotificationClick(notification);
    });
    
    // 컴포넌트 언마운트 시 리스너 해제
    return unsubscribe;
  }, []);
  
  return (
    // 앱 컴포넌트
  );
};

// 클릭 처리 함수
const handleNotificationClick = (notification) => {
  // 딥링크 처리
  if (notification.deeplink) {
    handleDeeplink(notification.deeplink);
  }
  
  // 커스텀 데이터 처리
  if (notification.customData) {
    handleCustomData(notification.customData);
  }
};
```

### 앱이 종료된 상태에서 클릭 처리
```javascript
// 앱 시작 시 초기 알림 확인
useEffect(() => {
  const checkInitialNotification = async () => {
    try {
      const initialNotification = await Notifly.getInitialNotification();
      if (initialNotification) {
        handleNotificationClick(initialNotification);
      }
    } catch (error) {
      console.error('Initial notification error:', error);
    }
  };
  
  checkInitialNotification();
}, []);
```

### 인터페이스
```typescript
// NotiflyNotification 타입
interface NotiflyNotification {
  id: string;
  title: string;
  body: string;
  deeplink?: string;
  customData?: Record<string, any>;
  imageUrl?: string;
}

// 클릭 이벤트 리스너 타입
type NotificationClickListener = (notification: NotiflyNotification) => void;
```

</TabItem>
</Tabs>