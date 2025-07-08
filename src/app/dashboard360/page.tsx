'use client';

import Link from 'next/link';

export default function Dashboard360Page() {
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
              <source src="/videos/T360.mp4" type="video/mp4" />
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
              Unlock the Power of Dashboard<span className="text-secondary">360</span>
            </h2>

            <div className="space-y-4" data-aos="fade-in" data-aos-delay="400" data-aos-duration="500">
              <p className="text-lg text-gray-700 leading-relaxed">
                Discover how Dashboard360 transforms operations with real-time insights, and simplified
                reporting. Watch the video to see why Dashboard360 outperforms the rest - and why top-performing
                teams choose it to stay ahead.
              </p>
            </div>

            {/* Get Started Button */}
            <div className="pt-4" data-aos="fade-in" data-aos-delay="600" data-aos-duration="500">
              <Link
                href="/pricing"
                className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300 inline-block"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}