import { Metadata } from 'next'
import { API_CONFIG } from '@/config/constants'

interface Props {
  params: Promise<{ id: string }>
}

// Function to fetch article data for metadata generation
async function getArticle(id: string) {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NEWSLETTER}`, {
      headers: API_CONFIG.HEADERS,
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch newsletter data')
    }
    
    const data = await response.json()
    const articleId = parseInt(id)
    const article = data.data.articles.find((a: any) => a.id === articleId)
    
    return article
  } catch (error) {
    console.error('Error fetching article for metadata:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const article = await getArticle(id)
  
  if (!article) {
    return {
      title: 'Article Not Found - Trucking 360 Solutions',
      description: 'The requested article could not be found.',
    }
  }
  
  // Format the date for better SEO
  const publishedDate = new Date(article.custom_date).toISOString()
  
  // Create a clean excerpt from the description or content
  const description = article.description || 
    (article.content ? article.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : 
    'Read the latest insights and industry trends from Trucking 360 Solutions.')
  
  return {
    title: `${article.title} - Newsletter - Trucking 360 Solutions`,
    description,
    keywords: [
      'trucking newsletter',
      'transportation industry',
      'logistics insights',
      'trucking business',
      'fleet management',
      'trucking 360 solutions',
      'supply chain',
      'commercial trucking',
      article.title.toLowerCase().split(' ').slice(0, 3).join(', ')
    ],
    authors: [{ name: 'Trucking 360 Solutions' }],
    publisher: 'Trucking 360 Solutions',
    openGraph: {
      title: `${article.title} - Newsletter - Trucking 360 Solutions`,
      description,
      type: 'article',
      publishedTime: publishedDate,
      authors: ['Trucking 360 Solutions'],
      siteName: 'Trucking 360 Solutions',
      images: [
        {
          url: article.featured_image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} - Newsletter - Trucking 360 Solutions`,
      description,
      images: [article.featured_image],
    },
    alternates: {
      canonical: `/newsletter/${article.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:published_time': publishedDate,
      'article:author': 'Trucking 360 Solutions',
      'article:section': 'Newsletter',
      'article:tag': 'trucking, logistics, transportation',
    },
  }
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="article-layout">
      {children}
    </div>
  )
}