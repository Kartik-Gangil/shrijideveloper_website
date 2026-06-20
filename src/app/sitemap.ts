// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://shrijideveloper.in'

    let propertiesUrls: MetadataRoute.Sitemap = []

    try {
        // Dhyaan dein: Yeh URL aapki backend API ka hona chahiye jo JSON data deti hai
        const res = await fetch(`${baseUrl}/api/properties`, { next: { revalidate: 3600 } })

        if (res.ok) {
            const properties = await res.json()

            propertiesUrls = properties.map((post: any) => ({
                url: `${baseUrl}/properties/${post.slug}`,
                // Agar updatedAt database mein nahi hai, toh fallback mein naye Date() ka use karein
                lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            }))
        }
    } catch (error) {
        console.error("Sitemap fetch error:", error)
        // Agar API fail bhi ho jaye, toh website crash nahi hogi, baaki pages ka sitemap ban jayega
    }

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/properties`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...propertiesUrls // Yahan par aapke saare dynamic properties ke links jud jayenge
    ]
}