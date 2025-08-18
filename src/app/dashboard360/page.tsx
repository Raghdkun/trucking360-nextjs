'use client';

import Link from 'next/link';
import { Dashboard360Provider, useDashboard360 } from '@/contexts/Dashboard360Context';
import { getVideoUrl } from '@/config/constants';
import  Spinner  from '@/components/Spinner';

// Function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

function Dashboard360Content() {
  const { dashboard360Data, loading, error } = useDashboard360();

  if (loading) {
    return (
      <section id="dashboard360" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="dashboard360" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading Dashboard360 data: {error}</p>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Static fallback data
  const fallbackData = {
    title: "Unlock the Power of Dashboard360",
    description: "Discover how Dashboard360 transforms operations with real-time insights, and simplified reporting. Watch the video to see why Dashboard360 outperforms the rest - and why top-performing teams choose it to stay ahead.",
    video: "/videos/T360.mp4",
    btn_text: "Get Started",
    btn_link: "/pricing"
  };

  const data = dashboard360Data || fallbackData;

  return (
    <section id="dashboard360" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Video */}
          <div 
            className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-xl" 
            data-aos="fade-in"
            data-aos-duration="800" 
            data-aos-delay="200"
          >
            <video 
              className="w-full h-full object-cover" 
              controls 
              data-aos="fade-in" 
              data-aos-delay="0"
              data-aos-duration="500"
            >
              <source 
                src={dashboard360Data ? getVideoUrl(data.video) : data.video} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 md:pl-8" data-aos="fade-in" data-aos-duration="800">
            <h2 
              className="text-3xl md:text-4xl font-bold text-primary leading-tight" 
              data-aos="fade-up"
              data-aos-delay="200" 
              data-aos-duration="500"
            >
              {data.title.includes('Dashboard360') ? (
                <>
                  {data.title.split('Dashboard360')[0]}
                  Dashboard<span className="text-secondary">360</span>
                  {data.title.split('Dashboard360')[1]}
                </>
              ) : (
                data.title
              )}
            </h2>

            <div className="space-y-4" data-aos="fade-in" data-aos-delay="400" data-aos-duration="500">
              <div className="text-lg text-gray-700 leading-relaxed">
                {stripHtmlTags(data.description)}
              </div>
            </div>

            {/* Get Started Button */}
            <div className="pt-4" data-aos="fade-in" data-aos-delay="600" data-aos-duration="500">
              <Link
                href={data.btn_link}
                className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300 inline-block"
              >
                {data.btn_text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard360Page() {
  return (
    <Dashboard360Provider>
      <Dashboard360Content />
    </Dashboard360Provider>
  );
}