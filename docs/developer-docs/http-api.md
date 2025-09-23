---
sidebar_position: 3
---

# HTTP API

Notifly HTTP API를 사용하여 서버에서 직접 알림을 발송하고 사용자 데이터를 관리하세요.

## 인증

모든 API 요청에는 API 키가 필요합니다.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     https://api.notifly.tech/v1/
```

## 사용자 관리

### 사용자 등록/업데이트

```bash
POST /v1/users
```

```json
{
  "user_id": "user123",
  "properties": {
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+821012345678",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 사용자 조회

```bash
GET /v1/users/{user_id}
```

### 사용자 삭제

```bash
DELETE /v1/users/{user_id}
```

## 이벤트 추적

### 이벤트 발송

```bash
POST /v1/events
```

```json
{
  "user_id": "user123",
  "event_name": "purchase",
  "properties": {
    "product_id": "item123",
    "price": 29.99,
    "currency": "USD"
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### 배치 이벤트 발송

```bash
POST /v1/events/batch
```

```json
{
  "events": [
    {
      "user_id": "user123",
      "event_name": "page_view",
      "properties": {"page": "/home"}
    },
    {
      "user_id": "user456",
      "event_name": "signup",
      "properties": {"source": "google"}
    }
  ]
}
```

## 캠페인 관리

### 캠페인 생성

```bash
POST /v1/campaigns
```

```json
{
  "name": "Welcome Campaign",
  "type": "push",
  "message": {
    "title": "Welcome!",
    "body": "Thanks for joining us",
    "image": "https://example.com/image.jpg"
  },
  "targeting": {
    "user_ids": ["user123", "user456"]
  },
  "schedule": {
    "type": "immediate"
  }
}
```

### 캠페인 상태 조회

```bash
GET /v1/campaigns/{campaign_id}
```

### 캠페인 통계

```bash
GET /v1/campaigns/{campaign_id}/stats
```

## 세그먼트 관리

### 세그먼트 생성

```bash
POST /v1/segments
```

```json
{
  "name": "Active Users",
  "conditions": [
    {
      "property": "last_active",
      "operator": "gte",
      "value": "2024-01-01"
    }
  ]
}
```

### 세그먼트 사용자 조회

```bash
GET /v1/segments/{segment_id}/users
```

## 응답 형식

### 성공 응답

```json
{
  "success": true,
  "data": {
    // 응답 데이터
  }
}
```

### 오류 응답

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid user_id format"
  }
}
```

## 상태 코드

- `200` - 성공
- `201` - 생성됨
- `400` - 잘못된 요청
- `401` - 인증 실패
- `403` - 권한 없음
- `404` - 리소스 없음
- `429` - 요청 한도 초과
- `500` - 서버 오류

## 요청 제한

- 분당 1,000 요청
- 배치 요청당 최대 100개 이벤트
- 요청 크기 최대 1MB

## SDK vs API

| 기능 | Client SDK | HTTP API |
|------|------------|----------|
| 실시간 이벤트 | ✅ | ✅ |
| 사용자 관리 | ✅ | ✅ |
| 캠페인 발송 | ❌ | ✅ |
| 세그먼트 관리 | ❌ | ✅ |
| 자동 세션 추적 | ✅ | ❌ |
| 오프라인 큐 | ✅ | ❌ |