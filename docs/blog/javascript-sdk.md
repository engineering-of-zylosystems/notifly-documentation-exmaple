---
slug: javascript-sdk
title: Client SDK - Javascript
authors: []
tags: [javascript, sdk, web]
---

# JavaScript SDK

Notifly JavaScript SDK를 사용하여 웹사이트에 푸시 알림 기능을 통합하세요.

<!-- truncate -->

## 설치

### CDN

```html
<script src="https://cdn.notifly.tech/sdk/notifly.min.js"></script>
```

### NPM

```bash
npm install @notifly/web-sdk
```

```javascript
import Notifly from '@notifly/web-sdk';
```

## 초기화

```javascript
Notifly.initialize('YOUR_PROJECT_ID', {
  serviceWorkerPath: '/notifly-sw.js'
});
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
Notifly.track('page_view', {
  page: '/product/123',
  category: 'electronics'
});
```

### 웹 푸시 구독
```javascript
// 푸시 권한 요청
Notifly.requestPermission()
  .then(permission => {
    if (permission === 'granted') {
      console.log('Push permission granted');
    }
  });

// 구독 상태 확인
Notifly.isSubscribed()
  .then(subscribed => {
    console.log('Subscription status:', subscribed);
  });
```

### 인앱 메시지
```javascript
// 인앱 메시지 표시
Notifly.showInAppMessage('welcome_message');

// 인앱 메시지 이벤트 처리
Notifly.onInAppMessageAction((action, message) => {
  console.log('In-app message action:', action, message);
});
```

## Service Worker 설정

```javascript
// notifly-sw.js
importScripts('https://cdn.notifly.tech/sdk/notifly-sw.js');

Notifly.initializeServiceWorker('YOUR_PROJECT_ID');
```