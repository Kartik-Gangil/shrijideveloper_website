// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',      // Admin panel ko block karein
                '/dashboard',  // User dashboard ko block karein
                '/login',      // Login page ko block karein
                '/api/',       // Saare backend API routes ko block karein
            ],
        },
        sitemap: 'https://shrijideveloper.in/sitemap.xml',
    }
}