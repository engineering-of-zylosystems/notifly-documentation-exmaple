---
slug: ios-sdk
title: Client SDK - iOS
authors: []
tags: [ios, sdk, mobile]
---

# iOS SDK

Notifly iOS SDK를 사용하여 iOS 앱에 푸시 알림 기능을 쉽게 통합하세요.

<!-- truncate -->

## 설치

### CocoaPods

```ruby
pod 'NotiflySDK'
```

### Swift Package Manager

```swift
dependencies: [
    .package(url: "https://github.com/notifly/ios-sdk.git", from: "1.0.0")
]
```

## 초기화

### AppDelegate에서 초기화

```swift
import NotiflySDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    Notifly.initialize(projectId: "YOUR_PROJECT_ID")
    
    return true
}
```

## 주요 기능

### 사용자 등록
```swift
Notifly.setUserId("user123")
Notifly.setUserProperties(properties)
```

### 이벤트 추적
```swift
Notifly.track("purchase", properties: eventProperties)
```

### 푸시 알림 권한 요청
```swift
Notifly.requestPushPermission { granted in
    print("Push permission granted: \(granted)")
}
```

## 고급 설정

- 리치 알림 (Rich Notifications)
- 알림 액션 버튼
- 사일런트 푸시
- 백그라운드 앱 새로고침
- 분석 데이터 수집