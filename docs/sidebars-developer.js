/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developerSidebar: [
    // Client SDK overview lives at developer-docs/sdk/index.md
    { type: 'doc', id: 'sdk/index', label: 'Client SDK 개요' },

    {
      type: 'category',
      label: '플랫폼별 SDK',
      collapsible: true,
      items: [
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
        'sdk/firebase-integration',
        'sdk/google-tag-manager',
      ],
    },

    // Advanced docs (these must exist in developer-docs/advanced/)
    {
      type: 'category',
      label: 'Advanced',
      collapsible: true,
      items: [
        'advanced/permission-consent',
        'advanced/inapp-event-listener',
        'advanced/rich-push',
        'advanced/deeplink-actions',
        'advanced/troubleshooting',
        'advanced/compatibility',
      ],
    },

    // This must exist as developer-docs/http-api.md
    'http-api',
  ],
};

export default sidebars;