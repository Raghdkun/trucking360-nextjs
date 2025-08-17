'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import { PricingProvider, usePricing } from '@/contexts/PricingContext';

const CheckmarkIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

// Define a proper type for the selected services
type SelectedServicesType = {
    [key: string]: boolean;
};

const PricingPageContent: React.FC = () => {
    const router = useRouter();
    const { data, loading, error } = usePricing();

    // State for the customizable plan's price
    const [selectedServices, setSelectedServices] = useState<SelectedServicesType>({
        Dispatch: true,
        Fleet: true,
        Hiring: true,
        HR: true,
    });
    const [totalPrice, setTotalPrice] = useState(145);

    // State for the FAQ accordion
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // Default services for customizable plan calculation
    const defaultServices = [
        { name: 'Dispatch', price: 75, id: 'Dispatch' },
        { name: 'Fleet', price: 20, id: 'Fleet' },
        { name: 'Hiring', price: 25, id: 'Hiring' },
        { name: 'HR', price: 25, id: 'HR' },
    ];

    // Effect to calculate the total price when checkboxes change
    useEffect(() => {
        const total = defaultServices.reduce((acc, service) => {
            if (selectedServices[service.id]) {
                return acc + service.price;
            }
            return acc;
        }, 0);
        setTotalPrice(total);
    }, [selectedServices, defaultServices]);

    const handleCheckboxChange = (serviceId: string) => {
        setSelectedServices(prev => ({
            ...prev,
            [serviceId]: !prev[serviceId],
        }));
    };

    const handleFaqToggle = (index: number) => {
        setOpenFaqIndex(prevIndex => prevIndex === index ? null : index);
    };

    const handleFaqKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleFaqToggle(index);
        }
    };

    // --- LocalStorage Handlers ---
    const handleGetStartedClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
        router.push(e.currentTarget.href);
    };

    const handleFantasticBundleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        localStorage.setItem('Bundle', 'true');
        router.push(e.currentTarget.href);
    };

    // Helper function to strip HTML tags
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, '');
    };

    // Helper function to parse features
    const parseFeatures = (features: string | null) => {
        if (!features) return [];
        return features.split('\n').filter(feature => feature.trim());
    };

    if (loading) {
        return (
            <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading pricing data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading pricing data: {error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center">
                <p className="text-gray-600">No pricing data available.</p>
            </div>
        );
    }

    // Sort plans by order
    const sortedPlans = [...data.plans].sort((a, b) => a.order - b.order);
    
    // Sort FAQs by order
    const sortedFaqs = [...data.faqs].sort((a, b) => a.order - b.order);

    return (
        <div className="bg-gray-100 font-sans" style={{ overflow: 'hidden' }}>
            <main className="container mx-auto px-4 py-8 con">
                {/* Hero Section */}
                <section className="text-center py-16 bg-gray-100" data-aos="fade-up" data-aos-delay="200">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6" style={{ color: '#2e368f' }}>
                            Straightforward Pricing, Unmatched Value
                        </h2>
                        <div className="features-container">
                            <div className="feature-item">Straightforward pricing</div>
                            <div className="feature-item">Safety features are included for free in all plans</div>
                            <div className="feature-item">No hidden charges</div>
                        </div>
                    </div>
                </section>

                {/* Plans Section */}
                <section className="mb-16 px-4" data-aos="fade-up" data-aos-delay="600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                        {sortedPlans.map((plan) => {
                            const features = parseFeatures(plan.features);
                            const isCustomizable = plan.is_customizable;
                            const isBestValue = plan.is_best_value;
                            
                            return (
                                <div key={plan.id} className="relative plan-card">
                                    {isBestValue && (
                                        <div className="best-value-banner" data-aos="flip-right" data-aos-delay="800">Best Value</div>
                                    )}
                                    {!isBestValue && !isCustomizable && (
                                        <div className="invisible bg-primary text-white text-center font-bold text-lg py-2 w-full absolute top-[-20px] left-0 rounded-t-lg shadow-md">Placeholder</div>
                                    )}
                                    <div className={`bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between h-full mt-6 ${isBestValue ? '' : ''}`}>
                                        <div className="flex flex-col justify-between flex-grow">
                                            <h3 className="text-2xl font-bold mb-4 text-primary">{plan.name}</h3>
                                            <div className="flex items-center text-2xl font-bold mb-4">
                                                <span style={{ color: 'black' }}>Total:</span>
                                                <span className={`ml-2 ${isBestValue ? 'total-wrapper-red' : 'total-wrapper'}`}>
                                                    <span className="dollar-sign">$</span>
                                                    <span id={isCustomizable ? 'total-price' : ''}>
                                                        {isCustomizable ? totalPrice : plan.total_value}
                                                    </span>
                                                </span>
                                                <span className="per-contracted ml-2">Per {plan.per_text}</span>
                                            </div>
                                            <p className={`mb-4 ${isCustomizable ? 'text-gray-600 text-sm' : 'text-gray-600'}`} 
                                               dangerouslySetInnerHTML={{ __html: plan.description }}>
                                            </p>
                                            
                                            {plan.highlighted_text && (
                                                <div className="border-l-4 border-primary pl-3 mb-4">
                                                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: plan.highlighted_text }}></p>
                                                </div>
                                                
                                            )}
                                            
                                            {isCustomizable ? (
                                                <div className="mb-4">
                                                    <label className="block mb-2 text-gray-700 font-medium">Select Services:</label>
                                                    <div className="space-y-4">
                                                        {defaultServices.map(service => (
                                                            <label key={service.id} className="flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox text-primary focus:ring-primary h-4 w-4"
                                                                    checked={selectedServices[service.id]}
                                                                    onChange={() => handleCheckboxChange(service.id)}
                                                                />
                                                                <span className="ml-2 text-gray-700">{service.name} (${service.price})</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <ul className="mb-6 space-y-2">
                                                    {features.map((feature, index) => (
                                                        <li key={index} className="flex items-start text-gray-700">
                                                            <CheckmarkIcon />
                                                            <span><strong>{feature}</strong></span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <Link 
                                            href={plan.button_link} 
                                            id={plan.name === 'Dashboard 360' ? 'dashboardLink' : plan.name === 'Customizable Plan' ? 'getStartedLink' : 'fantasticBundleLink'}
                                            onClick={plan.name === 'Customizable Plan' ? handleGetStartedClick : plan.name === 'Fantastic+ Bundle' ? handleFantasticBundleClick : undefined}
                                        >
                                            <button 
                                                className={`text-white px-6 py-3 w-full rounded-lg font-medium hover:bg-opacity-80 transition duration-300 mt-4 ${isBestValue ? 'bg-secondary' : 'bg-primary'}`}
                                                style={plan.button_bg_color ? { backgroundColor: plan.button_bg_color } : {}}
                                            >
                                                {plan.button_text}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Tables Section */}
                <section className="mb-16 py-16" data-aos="fade-left" data-aos-delay="500">
                    {data.tables.map((table) => (
                        <div key={table.id} className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
                            <table className="w-full text-sm text-gray-900 border border-gray-300">
                                <thead>
                                    <tr className="bg-primary text-white border-b border-gray-300">
                                        <th colSpan={2} className="text-2xl font-bold px-6 py-4">
                                            {table.title}
                                        </th>
                                    </tr>
                                    <tr className="bg-primary border-b border-gray-300 bg-opacity-50">
                                        <th scope="col" className="px-6 py-3">Service</th>
                                        <th scope="col" className="px-6 py-3">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.contents.map((content, index) => (
                                        <tr key={content.id} className={index % 2 === 0 ? "bg-white border-b border-gray-300" : "bg-primary/10 border-b border-gray-300"}>
                                            <td className="px-6 py-4 font-medium">{content.service_name}</td>
                                            <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: content.description }}></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </section>

                {/* FAQ Section */}
                <section className="mb-16" data-aos="fade-up" data-aos-delay="400">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#2e368f' }}>Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {sortedFaqs.map((faq, index) => (
                                <div key={faq.id} className="bg-white rounded-lg shadow-md">
                                    <button
                                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-lg"
                                        onClick={() => handleFaqToggle(index)}
                                        onKeyDown={(e) => handleFaqKeyDown(e, index)}
                                        aria-expanded={openFaqIndex === index}
                                    >
                                        <span className="font-medium text-gray-900">{faq.title}</span>
                                        <FaChevronDown 
                                            className={`text-primary transition-transform duration-200 ${
                                                openFaqIndex === index ? 'transform rotate-180' : ''
                                            }`} 
                                        />
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-700">{faq.description}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Booking Section */}
               <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-6 text-center">
                        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg inline-block">
                            <h2 className="text-3xl font-bold text-primary mb-4">Ready to Take Your Logistics to the Next Level?</h2>
                            <p className="text-gray-700 mb-6">Let’s discuss tailored solutions to maximize your efficiency.</p>
                            <Link href={data.booking.btn_link}>
                            <button className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300">
                                {data.booking.btn_name}
                            </button>
                        </Link>
                        </div>
                    </div>
                </section>
            </main>
              <style >{`
                /* All custom styles from the original <style> block are placed here */
                .con {
                    padding-top: 5rem;
                }
                .best-value-banner {
                    position: absolute;
                    top: -15px;
                    left: 0;
                    width: 100%;
                    background-color: #2e368f; /* Primary color */
                    color: white;
                    text-align: center;
                    font-weight: bold;
                    font-size: 1.125rem; /* text-lg */
                    padding: 0.5rem;
                    border-radius: 0.5rem 0.5rem 0 0;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                .total-wrapper {
                    background: #2e368f;
                    border-radius: 8px;
                    text-align: center;
                    padding: 1px 6px;
                    color: white;
                    display: inline-flex;
                    align-items: center;
                    gap: 2px;
                }
                .total-wrapper-red {
                    background: #e93232;
                    border-radius: 8px;
                    text-align: center;
                    padding: 1px 6px;
                    color: white;
                    display: inline-flex;
                    align-items: center;
                    gap: 2px;
                }
                .dollar-sign {
                    color: white;
                    font-weight: bold;
                }
                .per-contracted {
                    font-size: 0.9rem;
                    color: #555;
                    margin-left: 8px;
                }
                .feature-item {
                    position: relative;
                    display: inline-block;
                    padding-left: 2.5rem;
                    text-align: center;
                    font-weight: bold;
                    color: #28a745;
                }
                .feature-item::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    width: 1.5rem;
                    height: 1.5rem;
                    background: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2328a745%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M5 13l4 4L19 7%27/%3E%3C/svg%3E') no-repeat center center;
                    background-size: contain;
                }
                @media (min-width: 768px) {
                    .features-container {
                        display: flex;
                        justify-content: space-between;
                        max-width: 100%;
                    }
                }
                @media (max-width: 767px) {
                    .features-container {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        text-align: left;
                    }
                    .feature-item {
                        padding-left: 2.5rem;
                    }
                    .plan-card {
                        margin-bottom: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

const PricingPage: React.FC = () => {
    return (
        <PricingProvider>
            <PricingPageContent />
        </PricingProvider>
    );
};

export default PricingPage;
