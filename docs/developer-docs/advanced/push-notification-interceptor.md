---
sidebar_position: 4
---

# 푸시 알림 인터셉터

푸시 알림을 수신하기 전에 가로채서 커스터마이징하는 방법을 안내합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

## iOS 알림 인터셉터

### 기본 인터셉터 설정
```swift
// 알림 수신 전 인터셉터 등록
Notifly.setNotificationInterceptor { notification, completion in
    // 알림 내용 수정
    var modifiedNotification = notification
    
    // 제목 수정
    if notification.title.contains("긴급") {
        modifiedNotification.title = "🚨 " + notification.title
    }
    
    // 커스텀 로직 실행
    if shouldShowNotification(notification) {
        completion(.show(modifiedNotification))
    } else {
        completion(.hide)
    }
}

// 알림 표시 여부 결정 로직
func shouldShowNotification(_ notification: NotiflyNotification) -> Bool {
    // 앱이 포그라운드에 있을 때는 숨김
    if UIApplication.shared.applicationState == .active {
        return false
    }
    
    // 특정 조건에 따른 필터링
    return !notification.customData?["silent"] as? Bool ?? false
}
```

### 고급 인터셉터 기능
```swift
// 알림 그룹핑
Notifly.setNotificationInterceptor { notification, completion in
    var modifiedNotification = notification
    
    // 카테고리별 그룹핑
    if let category = notification.customData?["category"] as? String {
        modifiedNotification.threadIdentifier = "group_\(category)"
    }
    
    // 우선순위 설정
    if notification.customData?["priority"] as? String == "high" {
        modifiedNotification.interruptionLevel = .timeSensitive
    }
    
    completion(.show(modifiedNotification))
}
```

### 인터셉터 인터페이스
```swift
// NotificationInterceptor 타입 정의
typealias NotificationInterceptor = (NotiflyNotification, @escaping (InterceptorResult) -> Void) -> Void

// InterceptorResult 열거형
enum InterceptorResult {
    case show(NotiflyNotification)  // 수정된 알림 표시
    case hide                       // 알림 숨김
    case delay(TimeInterval)        // 지연 후 표시
}

// NotiflyNotification 확장
extension NotiflyNotification {
    var threadIdentifier: String? { get set }
    var interruptionLevel: UNNotificationInterruptionLevel { get set }
    var relevanceScore: Double { get set }
}
```

</TabItem>
<TabItem value="android" label="Android">

## Android 알림 인터셉터

### 기본 인터셉터 설정
```java
// 알림 수신 전 인터셉터 등록
Notifly.setNotificationInterceptor(new NotificationInterceptor() {
    @Override
    public void onNotificationReceived(NotiflyNotification notification, 
                                     InterceptorCallback callback) {
        // 알림 내용 수정
        NotiflyNotification.Builder builder = notification.toBuilder();
        
        // 제목 수정
        if (notification.getTitle().contains("긴급")) {
            builder.setTitle("🚨 " + notification.getTitle());
        }
        
        // 커스텀 로직 실행
        if (shouldShowNotification(notification)) {
            callback.show(builder.build());
        } else {
            callback.hide();
        }
    }
});

// 알림 표시 여부 결정 로직
private boolean shouldShowNotification(NotiflyNotification notification) {
    // 앱이 포그라운드에 있을 때는 숨김
    if (isAppInForeground()) {
        return false;
    }
    
    // 특정 조건에 따른 필터링
    Map<String, Object> customData = notification.getCustomData();
    return !(Boolean) customData.getOrDefault("silent", false);
}
```

### 고급 인터셉터 기능
```java
// 알림 채널 및 그룹 설정
Notifly.setNotificationInterceptor(new NotificationInterceptor() {
    @Override
    public void onNotificationReceived(NotiflyNotification notification, 
                                     InterceptorCallback callback) {
        NotiflyNotification.Builder builder = notification.toBuilder();
        
        // 카테고리별 채널 설정
        String category = (String) notification.getCustomData().get("category");
        if (category != null) {
            builder.setChannelId("channel_" + category);
            builder.setGroupKey("group_" + category);
        }
        
        // 우선순위 설정
        String priority = (String) notification.getCustomData().get("priority");
        if ("high".equals(priority)) {
            builder.setPriority(NotificationCompat.PRIORITY_HIGH);
        }
        
        callback.show(builder.build());
    }
});
```

### 인터셉터 인터페이스
```java
// NotificationInterceptor 인터페이스
public interface NotificationInterceptor {
    void onNotificationReceived(NotiflyNotification notification, 
                              InterceptorCallback callback);
}

// InterceptorCallback 인터페이스
public interface InterceptorCallback {
    void show(NotiflyNotification notification);  // 수정된 알림 표시
    void hide();                                   // 알림 숨김
    void delay(long delayMillis);                  // 지연 후 표시
}

// NotiflyNotification.Builder 클래스
public static class Builder {
    public Builder setTitle(String title);
    public Builder setBody(String body);
    public Builder setChannelId(String channelId);
    public Builder setGroupKey(String groupKey);
    public Builder setPriority(int priority);
    public NotiflyNotification build();
}
```

</TabItem>
<TabItem value="flutter" label="Flutter">

## Flutter 알림 인터셉터

### 기본 인터셉터 설정
```dart
// 알림 수신 전 인터셉터 등록
void setupNotificationInterceptor() {
  Notifly.setNotificationInterceptor((notification) async {
    // 알림 내용 수정
    var modifiedNotification = notification.copyWith();
    
    // 제목 수정
    if (notification.title.contains('긴급')) {
      modifiedNotification = modifiedNotification.copyWith(
        title: '🚨 ${notification.title}',
      );
    }
    
    // 커스텀 로직 실행
    if (await shouldShowNotification(notification)) {
      return InterceptorResult.show(modifiedNotification);
    } else {
      return InterceptorResult.hide();
    }
  });
}

// 알림 표시 여부 결정 로직
Future<bool> shouldShowNotification(NotiflyNotification notification) async {
  // 앱이 포그라운드에 있을 때는 숨김
  final appState = await Notifly.getAppState();
  if (appState == AppState.foreground) {
    return false;
  }
  
  // 특정 조건에 따른 필터링
  final customData = notification.customData ?? {};
  return !(customData['silent'] as bool? ?? false);
}
```

### 고급 인터셉터 기능
```dart
// 알림 그룹핑 및 우선순위 설정
Notifly.setNotificationInterceptor((notification) async {
  var modifiedNotification = notification.copyWith();
  
  // 카테고리별 그룹핑
  final category = notification.customData?['category'] as String?;
  if (category != null) {
    modifiedNotification = modifiedNotification.copyWith(
      groupKey: 'group_$category',
      channelId: 'channel_$category',
    );
  }
  
  // 우선순위 설정
  final priority = notification.customData?['priority'] as String?;
  if (priority == 'high') {
    modifiedNotification = modifiedNotification.copyWith(
      priority: NotificationPriority.high,
    );
  }
  
  return InterceptorResult.show(modifiedNotification);
});
```

### 인터셉터 인터페이스
```dart
// NotificationInterceptor 타입 정의
typedef NotificationInterceptor = Future<InterceptorResult> Function(NotiflyNotification notification);

// InterceptorResult 열거형
enum InterceptorResult {
  show(NotiflyNotification notification),  // 수정된 알림 표시
  hide(),                                   // 알림 숨김
  delay(Duration delay),                    // 지연 후 표시
}

// NotiflyNotification 확장
extension NotiflyNotificationCopy on NotiflyNotification {
  NotiflyNotification copyWith({
    String? title,
    String? body,
    String? groupKey,
    String? channelId,
    NotificationPriority? priority,
  }) {
    return NotiflyNotification(
      id: id,
      title: title ?? this.title,
      body: body ?? this.body,
      groupKey: groupKey ?? this.groupKey,
      channelId: channelId ?? this.channelId,
      priority: priority ?? this.priority,
      customData: customData,
    );
  }
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

## React Native 알림 인터셉터

### 기본 인터셉터 설정
```javascript
// 알림 수신 전 인터셉터 등록
const setupNotificationInterceptor = () => {
  Notifly.setNotificationInterceptor(async (notification) => {
    // 알림 내용 수정
    const modifiedNotification = { ...notification };
    
    // 제목 수정
    if (notification.title.includes('긴급')) {
      modifiedNotification.title = `🚨 ${notification.title}`;
    }
    
    // 커스텀 로직 실행
    if (await shouldShowNotification(notification)) {
      return { action: 'show', notification: modifiedNotification };
    } else {
      return { action: 'hide' };
    }
  });
};

// 알림 표시 여부 결정 로직
const shouldShowNotification = async (notification) => {
  // 앱이 포그라운드에 있을 때는 숨김
  const appState = await Notifly.getAppState();
  if (appState === 'active') {
    return false;
  }
  
  // 특정 조건에 따른 필터링
  const customData = notification.customData || {};
  return !customData.silent;
};
```

### 고급 인터셉터 기능
```javascript
// 알림 그룹핑 및 우선순위 설정
Notifly.setNotificationInterceptor(async (notification) => {
  const modifiedNotification = { ...notification };
  
  // 카테고리별 그룹핑
  const category = notification.customData?.category;
  if (category) {
    modifiedNotification.groupKey = `group_${category}`;
    modifiedNotification.channelId = `channel_${category}`;
  }
  
  // 우선순위 설정
  const priority = notification.customData?.priority;
  if (priority === 'high') {
    modifiedNotification.priority = 'high';
  }
  
  return { action: 'show', notification: modifiedNotification };
});
```

### 인터셉터 인터페이스
```typescript
// NotificationInterceptor 타입 정의
type NotificationInterceptor = (notification: NotiflyNotification) => Promise<InterceptorResult>;

// InterceptorResult 타입
type InterceptorResult = 
  | { action: 'show'; notification: NotiflyNotification }  // 수정된 알림 표시
  | { action: 'hide' }                                      // 알림 숨김
  | { action: 'delay'; delay: number };                     // 지연 후 표시 (밀리초)

// NotiflyNotification 인터페이스 확장
interface NotiflyNotification {
  id: string;
  title: string;
  body: string;
  groupKey?: string;
  channelId?: string;
  priority?: 'default' | 'high' | 'low';
  customData?: Record<string, any>;
  imageUrl?: string;
}
```

</TabItem>
</Tabs>