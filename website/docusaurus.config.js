/** @type {import('@docusaurus/types').DocusaurusConfig} */
const { cleanDocs } = require("./scripts/clean-docs");

module.exports = {
  title: "SSL Pinning",
  tagline: "SSL Pinning for any hybrid mobile app",
  url: "https://ionic.io",
  trailingSlash: false,
  baseUrl: "/docs/ssl-pinning/",
  baseUrlIssueBanner: false,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/ssl-pinning-icon.svg",
  organizationName: "ionic-team",
  projectName: "enterprise-ssl-pinning",
  titleDelimiter: "-",
  themeConfig: {
    navbar: {
      title: "SSL Pinning",
      logo: {
        alt: "Auth Connect Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docsVersionDropdown",
        },
        {
          label: "Platform",
          position: "right",
          items: [
            {
              href: "https://capacitorjs.com/docs",
              label: "Capacitor",
              target: "_blank",
              rel: null,
              className: "link--outbound",
            },
            {
              href: "https://ionicframework.com/docs",
              label: "Framework",
              target: "_blank",
              rel: null,
              className: "link--outbound",
            },
            {
              href: "https://ionic.io/docs/appflow",
              label: "Appflow",
              target: null,
              rel: null,
            },
            {
              href: "https://ionic.io/docs/identity-vault",
              label: "Identity Vault",
              target: null,
              rel: null,
            },
            {
              to: "/",
              label: "SSL Pinning",
            },
            {
              href: "https://ionic.io/docs/secure-storage",
              label: "Secure Storage",
              target: null,
              rel: null,
            },
          ],
        },
      ],
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    tagManager: {
      trackingID: "GTM-TKMGCBC",
    },
    prism: {
      theme: { plain: {}, styles: [] },
      additionalLanguages: [
        "shell-session",
        "kotlin",
        "groovy",
        "java",
        "swift",
        "ruby",
      ],
    },
    imageZoom: {
      selector: ".markdown em > img",
      options: {
        margin: 24,
        background: "#eee",
        scrollOffset: 0,
      },
    },
  },
  plugins: [
    "@ionic-internal/docusaurus-plugin-tag-manager",
    "docusaurus-plugin-sass",
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["../packages/capacitor-plugin/src/index.ts"],
        tsconfig: "../packages/capacitor-plugin/tsconfig.json",
        watch: process.env.TYPEDOC_WATCH,
        out: ".",
        readme: "none",
        excludeExternals: true,
        hideGenerator: true,
        disableSources: true,
      },
    ],
    () => ({
      loadContent() {
        cleanDocs();
      },
    }),
  ],
  themes: ["@ionic-internal/docusaurus-theme"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          lastVersion: "current",
          versions: {
            current: {
              label: "1.x",
            },
          },
        },
        blog: false,
        pages: false,
        theme: {
          customCss: [
            require.resolve("prismjs/themes/prism-tomorrow.css"),
            require.resolve("./src/styles/custom.css"),
          ],
        },
      },
    ],
  ],
};
