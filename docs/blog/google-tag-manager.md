---
slug: google-tag-manager
title: Client SDK - Google Tag Manager
date: 2024-01-18
authors: []
tags: [gtm, google-tag-manager, web]
---

# Google Tag Manager 연동

Google Tag Manager를 통해 코드 수정 없이 Notifly를 쉽게 연동하세요.

<!-- truncate -->

## GTM 태그 설정

### 1. Notifly 초기화 태그

**태그 유형**: 사용자 정의 HTML

```html
<script>
(function() {
  var script = document.createElement('script');
  script.src = 'https://cdn.notifly.tech/sdk/notifly.min.js';
  script.onload = function() {
    Notifly.initialize('YOUR_PROJECT_ID');
  };
  document.head.appendChild(script);
})();
</script>
```

**트리거**: All Pages

### 2. 사용자 식별 태그

**태그 유형**: 사용자 정의 HTML

```html
<script>
if (typeof Notifly !== 'undefined') {
  Notifly.setUserId('{{User ID}}');
  Notifly.setUserProperties({
    email: '{{User Email}}',
    name: '{{User Name}}'
  });
}
</script>
```

**트리거**: User Login

### 3. 이벤트 추적 태그

**태그 유형**: 사용자 정의 HTML

```html
<script>
if (typeof Notifly !== 'undefined') {
  Notifly.track('{{Event Name}}', {
    category: '{{Event Category}}',
    value: '{{Event Value}}'
  });
}
</script>
```

**트리거**: Custom Event

## 변수 설정

### 데이터 레이어 변수
- User ID
- User Email
- User Name
- Event Name
- Event Category
- Event Value

### 상수 변수
- Notifly Project ID

## 트리거 설정

### 페이지뷰 트리거
- 모든 페이지에서 Notifly 초기화

### 사용자 정의 이벤트 트리거
- 구매 완료
- 회원가입
- 로그인
- 장바구니 추가

## 디버깅

GTM 미리보기 모드를 사용하여 태그가 올바르게 실행되는지 확인하세요.

1. GTM 미리보기 모드 활성화
2. 웹사이트 방문
3. 태그 실행 상태 확인
4. 브라우저 개발자 도구에서 Notifly 로그 확인