export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: [ '/anime/', '/api/' ],
      },
      sitemap: 'https://app.1anime.co/sitemap.xml',
    }
  }