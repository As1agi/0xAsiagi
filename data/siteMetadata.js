/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Joseph Asiagi',
  author: 'Joseph Asiagi',
  authorLong: 'University student and learning enthusiast in cybersecurity and backend development',
  headerTitle: '0xAsiagi',
  description: 'Thoughts and experiments on cybersecurity, backend systems, and learning tech deeply',
  skills: 'Python, Node.js, C++, Cryptography, Backend Development, Databases, Machine Learning',
  descriptionLong:
    'A personal space where I share my journey learning cybersecurity, backend development, cryptography, and tech experiments.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.0xasiagi.com',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.jpg',
  socialBanner: '/static/images/logo.png',
  email: '0xn00bi3@gmail.com',
  github: 'https://github.com/As1agi',
  twitter: 'https://x.com/0xAsiagi',
  linkedin: 'https://www.linkedin.com/in/thetalhatahir',
  locale: 'en-US',
  analytics: {
    googleAnalytics: {
      googleAnalyticsId: 'G-TVD4T8Q6FC',
    },
  },
  newsletter: {
    provider: 'mailchimp',
  },
  comments: {
    provider: undefined,
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    },
  },
}

module.exports = siteMetadata
