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
      name: 'Home - Trucking 360 Solutions',
    },
    {
      url: `${baseUrl}/why-trucking-360`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      name: 'Why Choose Trucking 360 - Your Partner to Fantastic Plus',
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      name: 'Pricing Plans - Trucking 360 Solutions',
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      name: 'Contact Us - Trucking 360 Solutions',
    },
    {
      url: `${baseUrl}/dashboard360`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      name: 'Dashboard 360 - Real-Time Analytics & Performance Tracking',
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      name: 'Book a Consultation - Trucking 360 Solutions',
    },
    // Newsletter main page
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      name: 'Newsletter - Trucking 360 Solutions',
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
        name: `${article.title} - Newsletter - Trucking 360`,
      }))
    }
  } catch (error) {
    console.error('Error fetching newsletter data for sitemap:', error)
    // If newsletter fetch fails, continue with static routes only
  }

  // Combine static routes with dynamic newsletter routes
  return [...staticRoutes, ...newsletterRoutes]
}