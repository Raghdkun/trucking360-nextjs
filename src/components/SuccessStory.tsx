'use client'
import React from 'react'
import { useHomepage } from '@/contexts/HomepageContext'
import { getVideoUrl } from '@/config/constants'

const SuccessStory = () => {
  const { homepageData, loading } = useHomepage();

  if (loading) {
    return (
      <section className="mx-auto px-6 py-16 md:py-24 lg:px-8 bg-gray-100">
        <div className="text-center">Loading video section...</div>
      </section>
    );
  }

  const videoData = homepageData?.video;
  const videoUrl = videoData?.video ? getVideoUrl(videoData.video) : '/videos/success-story.mp4';
  const title = videoData?.title || 'Hear directly from our partners and their drivers:';
  const description = videoData?.description || 'Go beyond the numbers and listen to real stories from the people who experience our services firsthand.';

  return (
    <section className="mx-auto px-6 py-16 md:py-24 lg:px-8 bg-gray-100">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-xl" data-aos="fade-in"
          data-aos-duration="800" data-aos-delay="200">
          <video
            className="w-full h-auto"
            controls
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="space-y-8 md:pl-8" data-aos="fade-in" data-aos-duration="800">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight" data-aos="fade-in"
              data-aos-delay="400" data-aos-duration="500">
              <span className="text-primary">{title}</span>
            </h2>

            <div 
              className="text-lg text-gray-700 leading-relaxed" 
              data-aos="fade-in" 
              data-aos-delay="500" 
              data-aos-duration="500"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-4" data-aos="fade-in" data-aos-delay="600" data-aos-duration="500">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Updated regularly with new testimonials</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuccessStory