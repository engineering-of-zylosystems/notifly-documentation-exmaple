---
sidebar_position: 5
---

# Android SDK

Notifly Android SDK를 사용하여 Android 앱에 푸시 알림 기능을 쉽게 통합하세요.

## 설치

### Gradle 설정

```gradle
dependencies {
    implementation 'com.notifly:android-sdk:latest-version'
}
```

### 권한 설정

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

## 초기화

### Application 클래스에서 초기화

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        Notifly.initialize(this, "YOUR_PROJECT_ID");
    }
}
```

## 주요 기능

### 사용자 등록
```java
Notifly.setUserId("user123");
Notifly.setUserProperties(properties);
```

### 이벤트 추적
```java
Notifly.track("purchase", eventProperties);
```

### 푸시 토큰 관리
```java
Notifly.setPushToken(token);
```

## 고급 설정

- 커스텀 알림 스타일
- 딥링크 처리
- 백그라운드 알림 처리
- 분석 데이터 수집