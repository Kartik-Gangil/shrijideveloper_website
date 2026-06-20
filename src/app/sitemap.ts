// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://shrijideveloper.in'

    let propertiesUrls: MetadataRoute.Sitemap = []

    try {
        const res = await fetch(`${baseUrl}/api/properties`, { next: { revalidate: 3600 } })

        if (res.ok) {
            const data = await res.json()

            // ERROR FIX: Check karein ki data khud array hai, ya data ke andar koi array hai (jaise data.properties)
            const propertiesArray = Array.isArray(data) ? data : (Array.isArray(data.properties) ? data.properties : [])

            if (propertiesArray.length > 0) {
                propertiesUrls = propertiesArray.map((post: any) => {
                    // MongoDB ki ID ko string mein convert karne ke liye .toString() use karein
                    const propertyId = post._id ? post._id.toString() : post.id;

                    return {
                        // FIX: Yahan post.slug ki jagah propertyId use kiya hai
                        url: `${baseUrl}/properties/${propertyId}`,
                        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.7,
                    };
                });
            } else {
                console.warn("Warning: API se array nahi mila ya array khaali hai", data)
            }
        }
    } catch (error) {
        console.error("Sitemap fetch error:", error)
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
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...propertiesUrls // Agar API fail bhi ho, toh purane static pages render honge
    ]
}