/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  developerSidebar: [
    'index',
    {
      type: 'category',
      label: 'Client SDK',
      collapsible: true,
      link: {
        type: 'doc',
        id: 'sdk/index',
      },
      items: [
        'sdk/firebase-integration',
        'sdk/ios-sdk',
        'sdk/android-sdk',
        'sdk/react-native-sdk',
        'sdk/flutter-sdk',
        'sdk/javascript-sdk',
        'integration-test',
      ],
    },
    {
      type: 'category',
      label: '심화 연동',
      collapsible: true,
      link: {
        type: 'doc',
        id: 'advanced/index',
      },
      items: [
        'advanced/push-notification-icon',
        'advanced/push-notification-consent',
        'advanced/push-notification-click-events',
        'advanced/push-notification-interceptor',
        'advanced/inapp-popup-event-listener',
        'advanced/webview',
      ],
    },
        {
      type: 'category',
      label: 'Google Tag Manager',
      collapsible: true,
      items: [
        'google-tag-manager',
      ],
    },
    'http-api',
  ],
};

export default sidebars;