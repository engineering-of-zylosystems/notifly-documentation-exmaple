---
sidebar_position: 1
---

# 시작하기

import DocCard from '@site/src/components/DocCard';
import DocCardGrid from '@site/src/components/DocCardGrid';

## 유저 여정이란?

유저 여정은 특정 조건과 이벤트에 따라 고객에게 메시지를 자동 발송하는 **CRM 자동화 시나리오**입니다.  

<div className="infobox">
  <div className="infobox__header">유저 여정 예시</div>
  <div className="infobox__body">
    <p>회원가입 후 1일 뒤 환영 메시지 발송</p>
    <p>장바구니에 상품을 담고 구매하지 않은 고객에게 리마인드 알림 발송</p>
  </div>
</div>


이처럼 고객 행동과 속성에 맞춰 메시지를 적절한 시점에 보내어 **효과적인 상호작용과 높은 전환율**을 달성할 수 있습니다.

<div className="figure">
<figure>
  <img src="/img/user-journey-reminder.png" alt="유저 여정 리마인드 예시" />
</figure>
<p>
  유저 여정 리마인드 예시 — 장바구니에 담고 구매하지 않은 고객에게 메시지를 발송
</p>
</div>

## 유저 여정에 사용되는 개념

유저 여정은 다음의 핵심 요소들로 구성됩니다.

| 용어 | 설명 |
|------|------|
| **노드 (Node)** | 여정의 단위 단계. 예: 메시지 노드, 딜레이 노드 |
| **대상 (Target)** | 여정에 포함될 유저 조건 |
| **시작 조건 (Starting Condition)** | 여정을 시작시키는 트리거 (일회성, 반복, 이벤트 기반) |
| **이탈 조건 (Exit Condition)** | 유저가 여정 중 도중에 이탈하는 조건 |
| **전환 (Conversion)** | 미리 지정된 목표 이벤트 달성 여부 (예: 구매 완료) |
| **세션 (Session)** | 유저가 여정을 시작할 때 생성되는 기록 단위 |
| **종료 (Complete)** | 유저가 마지막 노드에 도달했을 때 기록되는 상태 |

## 유저 여정의 목표

유저 여정은 캠페인과 달리 **장기간 자동으로 운영**되며 다양한 메시지를 조합해 전환을 이끌어낼 수 있습니다.  

<div className="infobox">
  <div className="infobox__header">유저 여정의 목표</div>
  <div className="infobox__body">
    <p>회원가입 전환율 개선 </p>
    <p>재구매율 높이기</p>
    <p>휴면 고객 재활성화  </p>
  </div>
</div> 

목표를 설정해 두면 시나리오 설계가 더 명확해지고, 성과 분석 또한 용이합니다.

## 다음 단계

[유저 여정 기본 설정](/docs/user-journey/basic-settings) 문서로 이동해, 첫 번째 여정을 직접 만들어 보세요.