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
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'notifly-user-guide',
    {
  type: 'category',
  label: '유저 여정',
  link: {
    type: 'doc',
    id: 'user-journey/index', // 👈 this points to docs/user-journey/index.md
  },
  items: [
    'user-journey/getting-started',
    'user-journey/basic-settings',
    'user-journey/status-and-modification',
    {
      type: 'category',
      label: '유저 여정 노드',
      link: {
        type: 'doc',
        id: 'user-journey/user-journey-nodes/index', // optional index page for subcategory
      },
      items: [],
    },
    'user-journey/statistics',
    'user-journey/utilization',
  ],
},
    {
      type: 'category',
      label: '노티플라이 캠페인',
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
      label: '발송 채널',
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
      label: '애널리틱스 연동',
      items: [
        'analytics/amplitude-integration/index',
        'analytics/mixpanel-integration/index',
      ],
    },
    'cafe24-integration/index',
    'webhook/index',
    'faq',
  ],
};

export default sidebars;