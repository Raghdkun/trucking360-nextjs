import { MetadataRoute } from 'next'
import { apiService } from '@/services/apiService'
import { API_CONFIG, NewsletterApiResponse } from '@/config/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://trucking360solutions.com' // Replace with your actual domain
  
  // Define all your static pages with their metadata
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/why-trucking-360`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard360`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Newsletter main page
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Note: Excluding /comingsoon as it's likely a placeholder page
  ]

  // Fetch newsletter articles dynamically
  let newsletterRoutes: MetadataRoute.Sitemap = []
  
  try {
    const response = await apiService.get<NewsletterApiResponse>(API_CONFIG.ENDPOINTS.NEWSLETTER)
    
    if (response.data && response.data.success && response.data.data.articles) {
      newsletterRoutes = response.data.data.articles.map(article => ({
        url: `${baseUrl}/newsletter/${article.id}`,
        lastModified: new Date(article.custom_date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error fetching newsletter data for sitemap:', error)
    // If newsletter fetch fails, continue with static routes only
  }

  // Combine static routes with dynamic newsletter routes
  return [...staticRoutes, ...newsletterRoutes]
}