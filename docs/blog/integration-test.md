---
slug: integration-test
title: Client SDK - 연동 Test
date: 2024-01-19
authors: []
tags: [test, integration, debugging]
---

# 연동 테스트

Notifly SDK 연동이 올바르게 작동하는지 테스트하는 방법을 안내합니다.

<!-- truncate -->

## 기본 연동 테스트

### 1. SDK 초기화 확인

**브라우저 개발자 도구**에서 다음 명령어로 확인:

```javascript
// 웹 SDK
console.log(Notifly.isInitialized());

// 모바일 앱에서는 로그 확인
```

### 2. 사용자 등록 테스트

```javascript
// 테스트 사용자 등록
Notifly.setUserId('test_user_123');
Notifly.setUserProperties({
  name: 'Test User',
  email: 'test@example.com',
  test_mode: true
});
```

### 3. 이벤트 추적 테스트

```javascript
// 테스트 이벤트 발송
Notifly.track('test_event', {
  test_property: 'test_value',
  timestamp: new Date().toISOString()
});
```

## 푸시 알림 테스트

### 웹 푸시 테스트

1. **권한 요청 테스트**
```javascript
Notifly.requestPermission().then(permission => {
  console.log('Permission:', permission);
});
```

2. **구독 상태 확인**
```javascript
Notifly.isSubscribed().then(subscribed => {
  console.log('Subscribed:', subscribed);
});
```

3. **테스트 알림 발송**
   - Notifly 대시보드에서 테스트 캠페인 생성
   - 특정 사용자 ID로 타겟팅
   - 즉시 발송으로 설정

### 모바일 푸시 테스트

1. **토큰 등록 확인**
   - 앱 로그에서 푸시 토큰 확인
   - Notifly 대시보드에서 디바이스 등록 상태 확인

2. **테스트 알림 발송**
   - 개발/스테이징 환경에서 테스트
   - 프로덕션 인증서로 최종 테스트

## 디버깅 도구

### 로그 레벨 설정

```javascript
// 웹 SDK
Notifly.setLogLevel('debug');

// 모바일 SDK (개발 빌드에서만)
Notifly.enableDebugMode(true);
```

### 네트워크 요청 확인

브라우저 개발자 도구의 Network 탭에서:
- Notifly API 호출 확인
- 응답 상태 코드 확인
- 요청/응답 데이터 검증

### 일반적인 문제 해결

1. **SDK 초기화 실패**
   - 프로젝트 ID 확인
   - 네트워크 연결 상태 확인
   - CORS 설정 확인

2. **이벤트가 전송되지 않음**
   - 사용자 ID 설정 확인
   - 이벤트 데이터 형식 확인
   - API 키 권한 확인

3. **푸시 알림이 오지 않음**
   - 권한 상태 확인
   - 토큰 등록 상태 확인
   - 캠페인 타겟팅 조건 확인

## 테스트 체크리스트

- [ ] SDK 초기화 성공
- [ ] 사용자 등록 완료
- [ ] 이벤트 추적 작동
- [ ] 푸시 권한 획득
- [ ] 테스트 알림 수신
- [ ] 딥링크 작동 (모바일)
- [ ] 분석 데이터 수집