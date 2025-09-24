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
      label: 'Google Tag Manager',
      collapsible: true,
      items: [
        'google-tag-manager',
      ],
    },
    {
      type: 'category',
      label: '심화 기능',
      collapsible: true,
      items: [
        'advanced/index',
      ],
    },
    'http-api',
  ],
};

export default sidebars;