// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Notifly',
  tagline: '',
  favicon: 'img/favicon.ico',
  future: { v4: true },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  // TODO: set these to your real repo
  organizationName: 'notifly',     // e.g. your GitHub org/user
  projectName: 'notifly-docs',     // e.g. your repo name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          // ✅ use 'docs' (no leading slash)
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/your-org/your-repo/edit/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],

  // ✅ second docs instance for developer docs
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'developer-docs',
        path: 'developer-docs',
        routeBasePath: 'developer-docs',
        sidebarPath: './sidebars-developer.js',
        editUrl:
          'https://github.com/your-org/your-repo/edit/main/',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '노티플라이',
      logo: { alt: 'Notifly', src: 'img/logo.svg' },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'productSidebar',   // from sidebars.js
          position: 'left',
          label: '노티플라이 가이드',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'developer-docs', 
          sidebarId: 'developerSidebar',  // from sidebars-developer.js
          position: 'left',
          label: '개발/연동 가이드',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: '제품 문서', to: '/docs/notifly-user-guide' },
            { label: '개발 문서', to: '/developer-docs' },
          ],
        },
        {
          title: 'More',
          items: [{ label: 'Website', href: 'https://notifly.com' }],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Built with Docusaurus.`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  },
};

export default config;
