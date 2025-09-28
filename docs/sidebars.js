// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
// sidebars.js
const sidebars = {
  productSidebar: [
    'notifly-user-guide',
    {
      type: 'category',
      label: '튜토리얼',
      link: { type: 'doc', id: 'tutorial/index' },
      items: [
        'tutorial/a-min-kakao-alarm-talk-setting',
        'tutorial/a-min-marketing-funnel-creation',
      ],
    },
    {
      type: 'category',
      label: '하우 투 가이드',
      // link: { type: 'doc', id: 'how-to/index' },
      items: [
        {
          type: 'category',
          label: '유저 여정 설정하기',
          link: { type: 'doc', id: 'user-journey/index' },
          items: [
            'user-journey/getting-started',
            'user-journey/basic-settings',
            'user-journey/status-and-modification',
            {
              type: 'category',
              label: '유저 여정 노드',
              link: { type: 'doc', id: 'user-journey/user-journey-nodes/index' },
              items: [],
            },
            'user-journey/statistics',
            'user-journey/utilization',
          ],
        },
        {
          type: 'category',
          label: '캠페인 실행하기',
          items: [
            'notifly-campaign/getting-started',
            {
              type: 'category',
              label: '메시지 개인화',
              items: ['notifly-campaign/message-personalization/index'],
            },
            {
              type: 'category',
              label: '캠페인 발송 대상 설정',
              items: ['notifly-campaign/campaign-target-settings/index'],
            },
            'notifly-campaign/ab-testing',
            'notifly-campaign/campaign-dashboard',
          ],
        },
        {
          type: 'category',
          label: '발송 채널 선택하기',
          items: [
            'channels/app-push-notifications/index',
            'channels/web-push-notifications/index',
            'channels/messages/index',
            'channels/kakao-friends-alimtalk/index',
            'channels/email/index',
            'channels/web-popup/index',
            'channels/in-app-popup/index',
          ],
        },
        {
          type: 'category',
          label: '통합 연동하기',
          items: [
            {
              type: 'category',
              label: '애널리틱스 연동',
              items: [
                'analytics/amplitude-integration/index',
                'analytics/mixpanel-integration/index',
              ],
            },
            'cafe24-integration/index',
            'webhook/index',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '학습 자료',
      // link: { type: 'doc', id: 'background/index' },
      items: [
        'campaign/what-is-campaign',
        'campaign/a-b-test-utilization',
      ],
    },
    'faq',
  ],
};

export default sidebars;