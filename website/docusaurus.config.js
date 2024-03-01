const { themes } = require("prism-react-renderer");

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
    logo: {
      alt: "SSL Pinning Logo",
      src: "img/logo-dark.png",
      srcDark: "img/logo-light.png",
      width: 121,
      height: 24,
    },
    navbar: {
      items: [
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
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: [
        "shell-session",
        "bash",
        "kotlin",
        "groovy",
        "java",
        "swift",
        "ruby",
        "json",
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
    sidebar: {
      versionDropdown: {},
      productDropdown: {
        title: "SSL Pinning Docs",
        logo: {
          width: 20,
          height: 20,
          alt: "SSL Pinning Logo",
          src: "img/components/product-dropdown/logo-dark.png",
          srcDark: "img/components/product-dropdown/logo-light.png",
        },
      },
      backButton: {
        url: {
          href: "/docs",
        },
      },
    },
  },
  plugins: [
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
  presets: [
    [
      "@ionic-docs/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          lastVersion: "current",
          breadcrumbs: false,
          versions: {
            current: {
              label: "1.x",
            },
          },
        },
        googleTagManager: {
          containerId: "GTM-TKMGCBC",
        },
        theme: {
          customCss: [require.resolve("./src/styles/custom.scss")],
        },
      },
    ],
  ],
};
