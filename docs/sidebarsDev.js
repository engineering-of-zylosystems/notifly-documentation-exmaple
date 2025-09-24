// sidebarsDev.js
const sidebars = {
  devSidebar: [
    {
      type: 'category',
      label: 'Client SDK',
      items: [
        'sdk/overview',
        {
          type: 'category',
          label: 'iOS',
          items: [
            'sdk/ios/install',
            'sdk/ios/init',
            'sdk/ios/token',
            'sdk/ios/user',
            'sdk/ios/events',
            'sdk/ios/test'
          ],
        },
        {
          type: 'category',
          label: 'Android',
          items: [
            'sdk/android/install',
            'sdk/android/init',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/permission-consent',
        'advanced/inapp-event-listener',
        'advanced/rich-push',
        'advanced/deeplink-actions',
        'advanced/troubleshooting',
        'advanced/compatibility',
      ],
    },
    'http-api',
  ],
};

export default sidebars;