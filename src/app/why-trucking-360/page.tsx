"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { WhyTrucking360Provider, useWhyTrucking360 } from '@/contexts/WhyTrucking360Context';
import { getImageUrl } from '@/config/constants';
import LoadingOverlay from '@/components/LoadingOverlay';

// Replace with your actual image path or import
const leadershipImage = '/images/nickpic.jpg';
const missionImage = '/images/3.1.gif'; // Add this for the mission section

const corePrinciples = [
  {
    title: 'Customer Obsession',
    content: (
      <>
        We put our customers at the center of everything we do, making their needs and goals our top priority. By maintaining open communication, understanding their unique challenges, and tailoring our services to address them, we strive to exceed expectations and deliver exceptional service. Every action we take is driven by a commitment to helping our customers succeed in their operations.
      </>
    ),
  },
  {
    title: 'Employee Obsession',
    content: (
      <>
        We are dedicated to engaging and empowering our customers' employees, recognizing that they are the backbone of success in every operation. Through tailored safety campaigns, we prioritize the well-being of drivers and staff, equipping them with the knowledge and tools to maintain high safety standards. Our engagement initiatives are designed to boost morale, encourage professional growth, and foster a sense of belonging within the team. By creating a productive and supportive work environment, we help drive success, ensuring employees feel valued, motivated, and aligned with their company's goals.
      </>
    ),
  },
  {
    title: 'Ownership',
    content: (
      <>
        We take full ownership of our actions, holding ourselves accountable for every decision and outcome. By providing clear direction, we ensure that our strategies and solutions align with your goals and operational needs. We collaborate closely with your dedicated Account Success Managers (ASM) to maintain seamless communication and foster a proactive partnership. This approach allows us to address challenges swiftly, implement effective solutions, and consistently deliver results that support the growth and efficiency of your operations.
      </>
    ),
  },
  {
    title: 'Invent & Simplify',
    content: (
      <>
        We are committed to innovation and simplicity. By leveraging cutting-edge technology and fresh ideas, we streamline processes, reduce complexities, and create efficient solutions. We believe that the best ideas often come from rethinking the basics, making things easier for everyone—our team, our customers, and our partners.
      </>
    ),
  },
  {
    title: 'Learn & Be Curious',
    content: (
      <>
        We foster a culture of curiosity and continuous learning, encouraging exploration and innovation at every level. By offering assistance with pilot programs, we help our customers test and adopt new strategies that drive growth and adaptability. We deeply value feedback and constructive criticism, viewing them as essential tools for improvement and progress, enabling us to refine our services and exceed expectations consistently.
      </>
    ),
  },
  {
    title: 'Hire & Develop the Best',
    content: (
      <>
        We are dedicated to hiring and developing top talent to best serve our customers, ensuring that our team is equipped with the skills, knowledge, and passion needed to deliver exceptional service. This same principle is seamlessly passed along to our customers' businesses through customized hiring services designed to meet their specific needs. Whether it's sourcing qualified drivers, selecting skilled dispatchers, or onboarding HR professionals, we tailor our approach to align with the unique demands of your operations. Beyond hiring, we focus on the development and retention of top talent, offering training programs, performance coaching, and continuous support to help employees excel and thrive in their roles. By investing in people, we empower businesses to achieve long-term success.
      </>
    ),
  },
  {
    title: 'Insist on the Highest Standards - Fantastic+ Status',
    content: (
      <>
        We hold ourselves to the highest standards in every aspect of our operations, ensuring that excellence is not just a goal but a way of doing business. Striving to achieve and maintain a Fantastic+ status, we align our processes, services, and results with the rigorous expectations set by the AFP program. Every effort is directed toward delivering unmatched quality and reliability. By continuously evaluating and refining our practices, we aim not only to meet but exceed the limits that define AFP success, helping our customers achieve and sustain their Fantastic+ rating.
      </>
    ),
  },
  {
    title: 'Bias for Action',
    content: (
      <>
        We strive to earn trust by consistently delivering on our promises with speed and quality, understanding that action and reliability are key to building strong partnerships. Our commitment to taking action means we do what we say we will do, ensuring every effort is executed with precision, purpose, and a sense of urgency. We embrace calculated risks when they prioritize the success of your business. Whether it's resolving issues swiftly, implementing innovative solutions, or responding to challenges, we act proactively and effectively to keep your operations running smoothly. By combining a sense of responsibility with a focus on outcomes, we help you stay ahead in the dynamic AFP world.
      </>
    ),
  },
  {
    title: 'Frugality - Value Added Partners & Cost Savings',
    content: (
      <>
        We prioritize cost savings by partnering with value-driven solutions, enabling us to deliver more with less without compromising quality or service. Our per-accepted contract cost structure ensures that our customers are in good hands, only paying for what they use, which maximizes efficiency and value at every step. As a trusted partner, we are committed to providing exceptional support while ensuring cost efficiency that drives long-term success for your operations.
      </>
    ),
  },
  {
    title: 'Earn Trust',
    content: (
      <>
        We work diligently to build and uphold trust through honesty, transparency, and consistent value delivery. By offering thoughtful, reliable guidance and fostering meaningful, long-term relationships, we aim to create a foundation of trust that drives success for all parties involved. Your confidence in us is not just earned—it's continuously nurtured.
      </>
    ),
  },
  {
    title: 'Dive Deep - Accident Investigation & Customer Supply Chain Analysis',
    content: (
      <>
        We dive deep into every detail, leaving no stone unturned to ensure accuracy. We conduct thorough accident investigations including comprehensive root cause analysis and implementing actionable solutions to prevent recurrence. In addition, we analyze customer supply chains to identify inefficiencies, optimize processes, and drive continuous improvement. By leveraging data-driven insights we help our customers enhance safety, operational excellence score, and overall efficiency, ensuring their operations are robust and future-ready.
      </>
    ),
  },
  {
    title: 'Deliver Results - Whatever it Takes to be Fantastic+, Safely',
    content: (
      <>
        We are dedicated to delivering outstanding results, doing whatever it takes to safely achieve Fantastic+ status and drive our customers' businesses forward. With a focus on safety, efficiency, and overall excellence scores, we align every effort with the high standards required. By maintaining accountability and prioritizing customer success, we help businesses not only reach but sustain their goals, building a strong foundation for long-term growth and excellence.
      </>
    ),
  },
];

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    className={`w-5 h-5 text-secondary transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const WhyChooseUsAndLeadership: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { whyT360Data, loading, error } = useWhyTrucking360();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Why Choose Us Section (placed first) */}
      <section id="why" className="py-20 text-primary bg-gray-100">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl font-semibold text-center mb-2"
            data-aos="fade-up"
          >
            {whyT360Data?.why_choose_us?.title || 'Our Commitment to Excellence'}
          </h2>
          <h1
            className="text-4xl font-bold text-center mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {whyT360Data?.why_choose_us?.subtitle || 'Why Choose Us!'}
          </h1>
          <p
            className="text-center mb-12 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {whyT360Data?.why_choose_us?.description || 'Discover why we\'re the preferred choice for AFPs. With a client-first approach, we deliver efficient, tailored solutions that drive your business toward achieving a Fantastic Plus rating. Our team combines expertise, transparency, and accountability to ensure your success, supported by consistent performance and comprehensive services.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyT360Data?.why_choose_us?.features?.length ? (
              whyT360Data.why_choose_us.features.map((feature, index) => (
                <div
                  key={feature.id}
                  className=" bg-primary p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={300 + (index * 100)}
                >
                  <div className="mb-4">
                    <Image
                      src={feature.icon ? getImageUrl(feature.icon) : "/images/reliability.svg"}
                      alt={`${feature.title} Icon`}
                      width={48}
                      height={48}
                      className="feature-icon"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))
            ) : (
              // Fallback to static content
              <>
                <div
                  className=" bg-primary p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  <div className="mb-4">
                    <Image
                      src="/images/reliability.svg"
                      alt="Reliability Icon"
                      width={48}
                      height={48}
                      className="feature-icon"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Reliability
                  </h3>
                  <p className="text-gray-300">
                    We guarantee that your loads are managed efficiently, meeting
                    Amazon&apos;s strict schedules and safety standards on every trip.
                  </p>
                </div>
                <div
                  className=" bg-primary p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="feature-icon w-12 h-12 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Cost Efficiency
                  </h3>
                  <p className="text-gray-300">
                    Through optimized dispatching and proactive planning, we help you
                    keep costs down while maintaining the highest level of service.
                  </p>
                </div>
                <div
                  className="bg-primary p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="mb-4">
                    <Image
                      src="/images/safety.svg"
                      alt="Safety Icon"
                      width={48}
                      height={48}
                      className="feature-icon"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Safety-Driven Focus
                  </h3>
                  <p className="text-gray-300">
                    Our expert safety team offers detailed reports and guidance,
                    helping to minimize violations and protect your drivers and
                    business reputation.
                  </p>
                </div>
                <div
                  className="bg-primary p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2"
                  data-aos="fade-left"
                  data-aos-delay="600"
                >
                  <div className="mb-4">
                    <Image
                      src="/images/solutions.svg"
                      alt="Customized Solutions Icon"
                      width={48}
                      height={48}
                      className="feature-icon"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Customized Solutions
                  </h3>
                  <p className="text-gray-300">
                    We understand that every AFP has unique needs. Our flexible
                    solutions are designed to your specific goals, ensuring alignment
                    with Amazon&apos;s high expectations.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8" data-aos="fade-up" data-aos-duration="800">
          <div className="max-w-2xl" data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {whyT360Data?.mission?.title ? (
                whyT360Data.mission.title.includes('Mission') ? (
                  whyT360Data.mission.title.replace('Mission', '<span class="text-secondary">Mission</span>')
                ) : (
                  whyT360Data.mission.title
                )
              ) : (
                <>Our <span className="text-secondary">Mission</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl text-primary font-semibold leading-relaxed">
              {whyT360Data?.mission?.description || 'To empower AFPs by delivering top-tier management solutions tailored to enhance operational efficiency, elevate excellence performance metrics, and secure high evaluations from Amazon. We are dedicated to fostering a culture of continuous improvement, ensuring mutual growth, success, and long-term partnerships that drive excellence across every aspect of your operations.'}
            </p>
          </div>
          <div className="mission-image max-w-[25%] ml-auto md:max-w-full md:ml-0 md:text-center">
            <Image 
              src={whyT360Data?.mission?.image ? getImageUrl(whyT360Data.mission.image) : missionImage} 
              alt="Mission Image" 
              width={400}
              height={300}
              className="w-full h-auto object-contain md:w-4/5 md:mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="flex flex-col lg:flex-row gap-12 items-start" data-aos="fade-up" data-aos-duration="800">
          <div className="w-full lg:w-1/2 mt-4 lg:mt-[1%]" data-aos="fade-in" data-aos-duration="1300">
            <Image
              src={whyT360Data?.leadership?.image ? getImageUrl(whyT360Data.leadership.image) : leadershipImage}
              alt={`Leadership ${whyT360Data?.leadership?.name || 'Nicholas Krave'}`}
              width={600}
              height={800}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="w-full lg:w-1/2" data-aos="fade-in" data-aos-duration="1500">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {whyT360Data?.leadership?.name || 'Nicholas Krave'}
            </h2>
            <h3 className="text-2xl font-bold text-primary mb-6">
              {whyT360Data?.leadership?.title ? (
                whyT360Data.leadership.title.includes('360') ? (
                  whyT360Data.leadership.title.split('360').map((part, index, array) => (
                    index === array.length - 1 ? part : (
                      <React.Fragment key={index}>
                        {part}<span className="text-secondary">360</span>
                      </React.Fragment>
                    )
                  ))
                ) : (
                  whyT360Data.leadership.title
                )
              ) : (
                <>President, Trucking <span className="text-secondary">360</span></>
              )}
            </h3>
            <div className="space-y-6 text-primary">
              {whyT360Data?.leadership?.bio_paragraphs?.length ? (
                whyT360Data.leadership.bio_paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed font-semibold">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p className="leading-relaxed font-semibold">
                    Hi, my name is Nick, and I'm proud to serve as the President of Trucking <span className="text-secondary">360</span>. I am an Ohio native with my degree from Ferris State University in Big Rapids, Michigan. After college, I developed a deep passion for logistics and everything it takes to keep things moving smoothly. Throughout my career, I've been dedicated to creating efficient, customer-centered solutions that prioritize flexibility and operational excellence.
                  </p>
                  <p className="leading-relaxed font-semibold">
                    Beyond logistics, I have a big love for dogs and believe that genuine connections and clear communication make all the difference. Not only with dogs but, in business too! That's why you can always count on me being just one call away whenever you need support.
                  </p>
                  <p className="leading-relaxed font-semibold">
                    With Trucking <span className="text-secondary">360</span>, I've worked hard to build a team that shares my obsession with customer success and excellence. You can count on my team and I to be focused on doing whatever it takes to ensure you achieve and maintain a Fantastic Plus rating. Together, we're here to be more than just a service provider—we're your partner, fully committed to helping your business thrive.
                  </p>
                  <p className="leading-relaxed font-semibold">
                    We proudly align our leadership principles with those of Amazon to best serve our customers. These principles guide every action we take, from putting our customers first and fostering engagement within their teams, to delivering with speed, precision, and integrity. Our commitment ensures we consistently provide value and exceptional results to our customers.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Accordion */}
      <section id="faq" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12" data-aos="fade-up">
            Our Core Principles
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {(whyT360Data?.core_principles?.length ? whyT360Data.core_principles : corePrinciples).map((item, idx) => (
              <div
                key={item.title}
                className="bg-white rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left accordion-header focus:outline-none"
                  onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-content-${idx}`}
                  id={`faq-header-${idx}`}
                  type="button"
                >
                  <span className="text-lg font-semibold text-primary">{item.title}</span>
                  <ChevronIcon open={openIndex === idx} />
                </button>
                {openIndex === idx && (
                  <div
                    id={`faq-content-${idx}`}
                    className="p-4 border-t animate-fadeInSlide"
                    style={{
                      animation: 'fadeInSlide 0.3s ease-out forwards'
                    }}
                    aria-labelledby={`faq-header-${idx}`}
                  >
                    <p className="text-primary">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default function WhyTrucking360Page() {
  return (
    <WhyTrucking360Provider>
      <WhyChooseUsAndLeadership />
    </WhyTrucking360Provider>
  );
}
