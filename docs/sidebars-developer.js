/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  developerSidebar: [
    'index',
    {
      type: 'category',
      label: 'Client SDK',
      collapsible: true,
      items: [
        'sdk/index',
        'sdk/client-sdk',
        'sdk/ios-sdk',
        'sdk/android-sdk',
        'sdk/react-native-sdk',
        'sdk/flutter-sdk',
        'sdk/javascript-sdk',
      ],
    },
    {
      type: 'category',
      label: '연동 가이드',
      collapsible: true,
      items: [
        'firebase-integration',
        'google-tag-manager',
        'integration-test',
      ],
    },
    'http-api',
  ],
};

export default sidebars;