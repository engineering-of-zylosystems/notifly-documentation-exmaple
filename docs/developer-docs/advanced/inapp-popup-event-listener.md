---
sidebar_position: 5
---

# 인앱 팝업 이벤트 리스너

인앱 팝업의 다양한 이벤트를 처리하는 방법을 안내합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

## iOS 인앱 팝업 이벤트

### 기본 이벤트 리스너 설정
```swift
// 인앱 팝업 이벤트 리스너 등록
Notifly.setInAppPopupEventListener { event in
    switch event.type {
    case .shown:
        print("인앱 팝업 표시됨: \(event.popupId)")
        
    case .clicked:
        print("인앱 팝업 클릭됨: \(event.popupId)")
        handlePopupClick(event)
        
    case .dismissed:
        print("인앱 팝업 닫힘: \(event.popupId)")
        
    case .actionClicked:
        print("액션 버튼 클릭됨: \(event.actionId)")
        handleActionClick(event)
    }
}

// 팝업 클릭 처리
func handlePopupClick(_ event: InAppPopupEvent) {
    if let deeplink = event.deeplink {
        // 딥링크 처리
        handleDeeplink(deeplink)
    }
}

// 액션 버튼 클릭 처리
func handleActionClick(_ event: InAppPopupEvent) {
    guard let actionId = event.actionId else { return }
    
    switch actionId {
    case "confirm":
        // 확인 버튼 처리
        confirmAction(event.popupId)
    case "cancel":
        // 취소 버튼 처리
        cancelAction(event.popupId)
    default:
        // 기타 액션 처리
        handleCustomAction(actionId, event.popupId)
    }
}
```

### 고급 이벤트 처리
```swift
// 팝업 표시 전 이벤트
Notifly.setInAppPopupWillShowListener { popup in
    print("팝업 표시 예정: \(popup.id)")
    
    // 표시 조건 확인
    if shouldShowPopup(popup) {
        return .show
    } else {
        return .hide
    }
}

// 팝업 표시 후 이벤트
Notifly.setInAppPopupDidShowListener { popup in
    print("팝업 표시 완료: \(popup.id)")
    
    // 분석 이벤트 전송
    Analytics.track("inapp_popup_shown", properties: [
        "popup_id": popup.id,
        "popup_type": popup.type
    ])
}
```

### 인터페이스
```swift
// InAppPopupEventListener 프로토콜
protocol InAppPopupEventListener {
    func onInAppPopupEvent(_ event: InAppPopupEvent)
}

// InAppPopupEvent 구조체
struct InAppPopupEvent {
    let type: InAppPopupEventType
    let popupId: String
    let actionId: String?
    let deeplink: String?
    let customData: [String: Any]?
    let timestamp: Date
}

// InAppPopupEventType 열거형
enum InAppPopupEventType {
    case shown          // 팝업 표시됨
    case clicked        // 팝업 클릭됨
    case dismissed      // 팝업 닫힘
    case actionClicked  // 액션 버튼 클릭됨
    case timeout        // 타임아웃으로 닫힘
    case error          // 오류 발생
}
```

### 이벤트 목록

| 이벤트 타입 | 설명 | 발생 시점 |
|-------------|------|-----------|
| `shown` | 팝업이 화면에 표시됨 | 팝업 애니메이션 완료 후 |
| `clicked` | 팝업 영역 클릭됨 | 사용자가 팝업을 터치했을 때 |
| `dismissed` | 팝업이 닫힘 | X 버튼 클릭 또는 외부 영역 터치 |
| `actionClicked` | 액션 버튼 클릭됨 | CTA 버튼 등 액션 버튼 클릭 시 |
| `timeout` | 타임아웃으로 닫힘 | 설정된 시간 후 자동으로 닫힘 |
| `error` | 오류 발생 | 팝업 로딩 또는 표시 중 오류 |

</TabItem>
<TabItem value="android" label="Android">

## Android 인앱 팝업 이벤트

### 기본 이벤트 리스너 설정
```java
// 인앱 팝업 이벤트 리스너 등록
Notifly.setInAppPopupEventListener(new InAppPopupEventListener() {
    @Override
    public void onInAppPopupEvent(InAppPopupEvent event) {
        switch (event.getType()) {
            case SHOWN:
                Log.d("Notifly", "인앱 팝업 표시됨: " + event.getPopupId());
                break;
                
            case CLICKED:
                Log.d("Notifly", "인앱 팝업 클릭됨: " + event.getPopupId());
                handlePopupClick(event);
                break;
                
            case DISMISSED:
                Log.d("Notifly", "인앱 팝업 닫힘: " + event.getPopupId());
                break;
                
            case ACTION_CLICKED:
                Log.d("Notifly", "액션 버튼 클릭됨: " + event.getActionId());
                handleActionClick(event);
                break;
        }
    }
});

// 팝업 클릭 처리
private void handlePopupClick(InAppPopupEvent event) {
    String deeplink = event.getDeeplink();
    if (deeplink != null) {
        // 딥링크 처리
        handleDeeplink(deeplink);
    }
}

// 액션 버튼 클릭 처리
private void handleActionClick(InAppPopupEvent event) {
    String actionId = event.getActionId();
    if (actionId == null) return;
    
    switch (actionId) {
        case "confirm":
            // 확인 버튼 처리
            confirmAction(event.getPopupId());
            break;
        case "cancel":
            // 취소 버튼 처리
            cancelAction(event.getPopupId());
            break;
        default:
            // 기타 액션 처리
            handleCustomAction(actionId, event.getPopupId());
            break;
    }
}
```

### 고급 이벤트 처리
```java
// 팝업 표시 전 이벤트
Notifly.setInAppPopupWillShowListener(new InAppPopupWillShowListener() {
    @Override
    public InAppPopupAction onInAppPopupWillShow(InAppPopup popup) {
        Log.d("Notifly", "팝업 표시 예정: " + popup.getId());
        
        // 표시 조건 확인
        if (shouldShowPopup(popup)) {
            return InAppPopupAction.SHOW;
        } else {
            return InAppPopupAction.HIDE;
        }
    }
});

// 팝업 표시 후 이벤트
Notifly.setInAppPopupDidShowListener(new InAppPopupDidShowListener() {
    @Override
    public void onInAppPopupDidShow(InAppPopup popup) {
        Log.d("Notifly", "팝업 표시 완료: " + popup.getId());
        
        // 분석 이벤트 전송
        Map<String, Object> properties = new HashMap<>();
        properties.put("popup_id", popup.getId());
        properties.put("popup_type", popup.getType());
        Analytics.track("inapp_popup_shown", properties);
    }
});
```

### 인터페이스
```java
// InAppPopupEventListener 인터페이스
public interface InAppPopupEventListener {
    void onInAppPopupEvent(InAppPopupEvent event);
}

// InAppPopupEvent 클래스
public class InAppPopupEvent {
    private InAppPopupEventType type;
    private String popupId;
    private String actionId;
    private String deeplink;
    private Map<String, Object> customData;
    private long timestamp;
    
    // Getter 메서드들
    public InAppPopupEventType getType() { return type; }
    public String getPopupId() { return popupId; }
    public String getActionId() { return actionId; }
    public String getDeeplink() { return deeplink; }
    public Map<String, Object> getCustomData() { return customData; }
    public long getTimestamp() { return timestamp; }
}

// InAppPopupEventType 열거형
public enum InAppPopupEventType {
    SHOWN,          // 팝업 표시됨
    CLICKED,        // 팝업 클릭됨
    DISMISSED,      // 팝업 닫힘
    ACTION_CLICKED, // 액션 버튼 클릭됨
    TIMEOUT,        // 타임아웃으로 닫힘
    ERROR           // 오류 발생
}
```

### 이벤트 목록

| 이벤트 타입 | 설명 | 발생 시점 |
|-------------|------|-----------|
| `SHOWN` | 팝업이 화면에 표시됨 | 팝업 애니메이션 완료 후 |
| `CLICKED` | 팝업 영역 클릭됨 | 사용자가 팝업을 터치했을 때 |
| `DISMISSED` | 팝업이 닫힘 | X 버튼 클릭 또는 외부 영역 터치 |
| `ACTION_CLICKED` | 액션 버튼 클릭됨 | CTA 버튼 등 액션 버튼 클릭 시 |
| `TIMEOUT` | 타임아웃으로 닫힘 | 설정된 시간 후 자동으로 닫힘 |
| `ERROR` | 오류 발생 | 팝업 로딩 또는 표시 중 오류 |

</TabItem>
<TabItem value="flutter" label="Flutter">

## Flutter 인앱 팝업 이벤트

### 기본 이벤트 리스너 설정
```dart
// 인앱 팝업 이벤트 리스너 등록
void setupInAppPopupEventListener() {
  Notifly.onInAppPopupEvent.listen((event) {
    switch (event.type) {
      case InAppPopupEventType.shown:
        print('인앱 팝업 표시됨: ${event.popupId}');
        break;
        
      case InAppPopupEventType.clicked:
        print('인앱 팝업 클릭됨: ${event.popupId}');
        handlePopupClick(event);
        break;
        
      case InAppPopupEventType.dismissed:
        print('인앱 팝업 닫힘: ${event.popupId}');
        break;
        
      case InAppPopupEventType.actionClicked:
        print('액션 버튼 클릭됨: ${event.actionId}');
        handleActionClick(event);
        break;
    }
  });
}

// 팝업 클릭 처리
void handlePopupClick(InAppPopupEvent event) {
  if (event.deeplink != null) {
    // 딥링크 처리
    handleDeeplink(event.deeplink!);
  }
}

// 액션 버튼 클릭 처리
void handleActionClick(InAppPopupEvent event) {
  final actionId = event.actionId;
  if (actionId == null) return;
  
  switch (actionId) {
    case 'confirm':
      // 확인 버튼 처리
      confirmAction(event.popupId);
      break;
    case 'cancel':
      // 취소 버튼 처리
      cancelAction(event.popupId);
      break;
    default:
      // 기타 액션 처리
      handleCustomAction(actionId, event.popupId);
      break;
  }
}
```

### 고급 이벤트 처리
```dart
// 팝업 표시 전 이벤트
void setupInAppPopupWillShowListener() {
  Notifly.onInAppPopupWillShow.listen((popup) {
    print('팝업 표시 예정: ${popup.id}');
    
    // 표시 조건 확인
    if (shouldShowPopup(popup)) {
      return InAppPopupAction.show;
    } else {
      return InAppPopupAction.hide;
    }
  });
}

// 팝업 표시 후 이벤트
void setupInAppPopupDidShowListener() {
  Notifly.onInAppPopupDidShow.listen((popup) {
    print('팝업 표시 완료: ${popup.id}');
    
    // 분석 이벤트 전송
    Analytics.track('inapp_popup_shown', properties: {
      'popup_id': popup.id,
      'popup_type': popup.type,
    });
  });
}
```

### 인터페이스
```dart
// InAppPopupEvent 클래스
class InAppPopupEvent {
  final InAppPopupEventType type;
  final String popupId;
  final String? actionId;
  final String? deeplink;
  final Map<String, dynamic>? customData;
  final DateTime timestamp;
  
  InAppPopupEvent({
    required this.type,
    required this.popupId,
    this.actionId,
    this.deeplink,
    this.customData,
    required this.timestamp,
  });
}

// InAppPopupEventType 열거형
enum InAppPopupEventType {
  shown,          // 팝업 표시됨
  clicked,        // 팝업 클릭됨
  dismissed,      // 팝업 닫힘
  actionClicked,  // 액션 버튼 클릭됨
  timeout,        // 타임아웃으로 닫힘
  error,          // 오류 발생
}

// InAppPopupAction 열거형
enum InAppPopupAction {
  show,   // 팝업 표시
  hide,   // 팝업 숨김
}
```

### 이벤트 목록

| 이벤트 타입 | 설명 | 발생 시점 |
|-------------|------|-----------|
| `shown` | 팝업이 화면에 표시됨 | 팝업 애니메이션 완료 후 |
| `clicked` | 팝업 영역 클릭됨 | 사용자가 팝업을 터치했을 때 |
| `dismissed` | 팝업이 닫힘 | X 버튼 클릭 또는 외부 영역 터치 |
| `actionClicked` | 액션 버튼 클릭됨 | CTA 버튼 등 액션 버튼 클릭 시 |
| `timeout` | 타임아웃으로 닫힘 | 설정된 시간 후 자동으로 닫힘 |
| `error` | 오류 발생 | 팝업 로딩 또는 표시 중 오류 |

</TabItem>
<TabItem value="react-native" label="React Native">

## React Native 인앱 팝업 이벤트

### 기본 이벤트 리스너 설정
```javascript
import { useEffect } from 'react';

// 인앱 팝업 이벤트 리스너 등록
const setupInAppPopupEventListener = () => {
  useEffect(() => {
    const unsubscribe = Notifly.onInAppPopupEvent((event) => {
      switch (event.type) {
        case 'shown':
          console.log('인앱 팝업 표시됨:', event.popupId);
          break;
          
        case 'clicked':
          console.log('인앱 팝업 클릭됨:', event.popupId);
          handlePopupClick(event);
          break;
          
        case 'dismissed':
          console.log('인앱 팝업 닫힘:', event.popupId);
          break;
          
        case 'actionClicked':
          console.log('액션 버튼 클릭됨:', event.actionId);
          handleActionClick(event);
          break;
      }
    });
    
    return unsubscribe;
  }, []);
};

// 팝업 클릭 처리
const handlePopupClick = (event) => {
  if (event.deeplink) {
    // 딥링크 처리
    handleDeeplink(event.deeplink);
  }
};

// 액션 버튼 클릭 처리
const handleActionClick = (event) => {
  const { actionId, popupId } = event;
  if (!actionId) return;
  
  switch (actionId) {
    case 'confirm':
      // 확인 버튼 처리
      confirmAction(popupId);
      break;
    case 'cancel':
      // 취소 버튼 처리
      cancelAction(popupId);
      break;
    default:
      // 기타 액션 처리
      handleCustomAction(actionId, popupId);
      break;
  }
};
```

### 고급 이벤트 처리
```javascript
// 팝업 표시 전 이벤트
useEffect(() => {
  const unsubscribe = Notifly.onInAppPopupWillShow((popup) => {
    console.log('팝업 표시 예정:', popup.id);
    
    // 표시 조건 확인
    if (shouldShowPopup(popup)) {
      return 'show';
    } else {
      return 'hide';
    }
  });
  
  return unsubscribe;
}, []);

// 팝업 표시 후 이벤트
useEffect(() => {
  const unsubscribe = Notifly.onInAppPopupDidShow((popup) => {
    console.log('팝업 표시 완료:', popup.id);
    
    // 분석 이벤트 전송
    Analytics.track('inapp_popup_shown', {
      popup_id: popup.id,
      popup_type: popup.type,
    });
  });
  
  return unsubscribe;
}, []);
```

### 인터페이스
```typescript
// InAppPopupEvent 인터페이스
interface InAppPopupEvent {
  type: InAppPopupEventType;
  popupId: string;
  actionId?: string;
  deeplink?: string;
  customData?: Record<string, any>;
  timestamp: number;
}

// InAppPopupEventType 타입
type InAppPopupEventType = 
  | 'shown'          // 팝업 표시됨
  | 'clicked'        // 팝업 클릭됨
  | 'dismissed'      // 팝업 닫힘
  | 'actionClicked'  // 액션 버튼 클릭됨
  | 'timeout'        // 타임아웃으로 닫힘
  | 'error';         // 오류 발생

// InAppPopupAction 타입
type InAppPopupAction = 'show' | 'hide';

// 이벤트 리스너 타입
type InAppPopupEventListener = (event: InAppPopupEvent) => void;
type InAppPopupWillShowListener = (popup: InAppPopup) => InAppPopupAction;
type InAppPopupDidShowListener = (popup: InAppPopup) => void;
```

### 이벤트 목록

| 이벤트 타입 | 설명 | 발생 시점 |
|-------------|------|-----------|
| `shown` | 팝업이 화면에 표시됨 | 팝업 애니메이션 완료 후 |
| `clicked` | 팝업 영역 클릭됨 | 사용자가 팝업을 터치했을 때 |
| `dismissed` | 팝업이 닫힘 | X 버튼 클릭 또는 외부 영역 터치 |
| `actionClicked` | 액션 버튼 클릭됨 | CTA 버튼 등 액션 버튼 클릭 시 |
| `timeout` | 타임아웃으로 닫힘 | 설정된 시간 후 자동으로 닫힘 |
| `error` | 오류 발생 | 팝업 로딩 또는 표시 중 오류 |

</TabItem>
</Tabs>