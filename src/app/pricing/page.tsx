'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa'; // Icon for the FAQ

// --- Data Constants (moved from the script for better organization) ---

const services = [
    { name: 'Dispatch', price: 75, id: 'Dispatch' },
    { name: 'Fleet', price: 20, id: 'Fleet' },
    { name: 'Hiring', price: 25, id: 'Hiring' },
    { name: 'HR', price: 25, id: 'HR' },
];

const faqData = [
    {
        question: "How does the Per Accepted Contract pricing work?",
        answer: "We keep billing straightforward and aligned with your usage. Each week, you're only billed for the contracts you accept. For example, if you have 17 contracted tractors but only accept 15 contracts, you'll only be billed for those 15. If you're using our dispatching service at $75 per contract, your weekly bill would be 15 x $75 = $1,125. For those on our Fantastic+ bundle, covering dispatch, hiring, HR, and fleet services, the rate is $125 per contract, so you'd pay 15 x $125 = $1,875. Our goal is to make billing transparent and flexible, matching your operational pace."
    },
    {
        question: "Why is Per Accepted Contract pricing beneficial to me?",
        answer: "Our per-accepted contract pricing provides flexibility and savings, ensuring you only pay for active operations. Unlike flat-rate models that charge regardless of tractor status, our approach aligns costs with your actual usage—no unnecessary charges if a tractor is down. This way, you maximize value, paying only for what's actively moving your business forward."
    },
    {
        question: "How will I be billed?",
        answer: "Clients are billed the Monday following the acceptance of their upcoming contracts, which are released and approved each Friday. Once contracts are finalized, Trucking 360 strategically plans dedicated staffing to meet your business needs. Billing is processed through our secure payment portal, offering two convenient options: automatic ACH debits from your account on file or credit card payments, based on your preference. You will receive a detailed invoice outlining the charges, along with a receipt once the payment has been successfully processed."
    },
    {
        question: "Will my pricing change if I add more tractors?",
        answer: "The rate per accepted contract stays consistent, so you know what to expect! However, accepting more contracts will increase the total amount billed, based on how many contracts you accept that week. For instance, if you accepted 14 contracts at our dispatching rate of $75, your bill would be 14 x $75 = $1,050. With 15 contracts, it would be 15 x $75 = $1,125. For Fantastic+ bundle users at $125 per accepted contract, the bill would be 14 x $125 = $1,750, and for 15 accepted contracts, 15 x $125 = $1,875. This predictable per-unit pricing scales with your operations while keeping costs transparent."
    },
    {
        question: "Will I pay for a rejected contract?",
        answer: "No, we only bill for contracts you accept. If a contract is rejected, there's no charge, regardless of whether you're on our Fantastic+ bundle or just the dispatching service. Our commitment is to ensure billing reflects the work accepted, so you can focus on what counts."
    },
    {
        question: "Why is it beneficial to bill per accepted contract for hiring, fleet, HR, and other services?",
        answer: "Our service billing is tied to your accepted contract count to adapt to your operational needs. If you're running fewer contracts, you won't pay a flat fee for services like hiring, HR, and fleet management. Instead, your costs decrease with usage, ensuring fair pricing without locking you into fixed rates. It's a flexible model designed to optimize your expenses as your operations fluctuate."
    },
    {
        question: "Why do you bill weekly?",
        answer: "Weekly billing is designed to stay in sync with your business. By billing per accepted contract each week, we offer precise billing that reflects any changes in your accepted contracts. This way, you're always paying accurately for what you actually use, supporting a flexible and transparent billing cycle."
    },
    {
        question: "Are there any hidden fees or setup costs?",
        answer: "Not at all—our pricing is completely transparent. You're billed based solely on the accepted contracts each week, with no hidden fees or setup costs. We want you to feel confident in exactly what you're paying for."
    },
    {
        question: "Am I locked into a contract?",
        answer: "No, you have complete flexibility. You can cancel at any time with just a one-week notice, giving you full control over your service commitments. We're here to support you as your needs evolve."
    },
    {
        question: "How does billing work if a tractor breaks down during the week?",
        answer: "If your tractor experiences a breakdown during an accepted contract, rest assured that you'll still be billed solely for the accepted contract amount, without any extra charges. Should you choose to continue the contract with a Permaloaner or a different tractor from your fleet, there's no need to worry—our goal is to ensure your operations can carry on smoothly without unexpected costs. We're here to support you through any challenges!"
    },
    {
        question: "How do you track the daily Operational Excellence Score?",
        answer: "We have proprietary technology that will enable us to provide you with a daily Operational Excellence Score that will take into account previous day acceptance and on-time metrics."
    }
];

const CheckmarkIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const PricingPage: React.FC = () => {
    const router = useRouter();

    // State for the customizable plan's price
    const [selectedServices, setSelectedServices] = useState({
        Dispatch: true,
        Fleet: true,
        Hiring: true,
        HR: true,
    });
    const [totalPrice, setTotalPrice] = useState(145);

    // State for the FAQ accordion
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // Effect to calculate the total price when checkboxes change
    useEffect(() => {
        const total = services.reduce((acc, service) => {
            // @ts-expect-error - selectedServices type needs to be properly typed
            if (selectedServices[service.id]) {
                return acc + service.price;
            }
            return acc;
        }, 0);
        setTotalPrice(total);
    }, [selectedServices]);

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
                        {/* Plan 1: Dashboard 360 */}
                        <div className="relative plan-card">
                            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between h-full mt-6">
                                <div className="flex flex-col justify-between flex-grow">
                                    <h3 className="text-2xl font-bold mb-4 text-primary">Dashboard 360</h3>
                                    <div className="flex items-center text-2xl font-bold mb-4">
                                        <span style={{ color: 'black' }}>Total:</span>
                                        <span className="total-wrapper ml-2">
                                            <span className="dollar-sign">$</span>
                                            <span>199</span>
                                        </span>
                                        <span className="per-contracted ml-2">Per Month</span>
                                    </div>
                                    <p className="text-gray-600 mb-4">Complete visibility into your business with real-time analytics and reporting.</p>
                                    <div className="border-l-4 border-primary pl-3 mb-4">
                                        <p className="text-gray-700">Get <span className="font-bold text-primary">50% OFF</span> when combined with any other service!</p>
                                    </div>
                                    <ul className="mb-6 space-y-2">
                                        <li className="flex items-start text-gray-700"><CheckmarkIcon /><span>Real-time performance tracking</span></li>
                                        <li className="flex items-start text-gray-700"><CheckmarkIcon /><span>Customizable reporting tools</span></li>
                                        <li className="flex items-start text-gray-700"><CheckmarkIcon /><span>Driver performance metrics</span></li>
                                    </ul>
                                </div>
                                <Link href="/form" id="dashboardLink">
                                    <button className="bg-primary text-white px-6 py-3 w-full rounded-lg font-medium hover:bg-opacity-80 transition duration-300 mt-4">
                                        Get Dashboard 360
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Plan 2: Customizable Plan */}
                        <div className="relative plan-card">
                            <div className="invisible bg-primary text-white text-center font-bold text-lg py-2 w-full absolute top-[-20px] left-0 rounded-t-lg shadow-md">Placeholder</div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between h-full mt-6">
                                <div className="flex flex-col justify-between flex-grow">
                                    <h3 className="text-2xl font-bold mb-4 text-primary">Customizable Plan</h3>
                                    <div className="flex items-center text-2xl font-bold mb-4">
                                        <span style={{ color: 'black' }}>Total:</span>
                                        <span className="total-wrapper ml-2">
                                            <span className="dollar-sign">$</span>
                                            <span id="total-price">{totalPrice}</span>
                                        </span>
                                        <span className="per-contracted ml-2">Per accepted contract</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">Build your own plan by selecting or unselecting the services below to perfectly match your business needs.</p>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-gray-700 font-medium">Select Services:</label>
                                        <div className="space-y-4">
                                            {services.map(service => (
                                                <label key={service.id} className="flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox text-primary focus:ring-primary h-4 w-4"
                                                        // @ts-expect-error - selectedServices type needs to be properly typed
                                                        checked={selectedServices[service.id]}
                                                        onChange={() => handleCheckboxChange(service.id)}
                                                    />
                                                    <span className="ml-2 text-gray-700">{service.name} (${service.price})</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Link href="/form" id="getStartedLink" onClick={handleGetStartedClick}>
                                    <button className="bg-primary text-white px-6 py-3 w-full rounded-lg font-medium hover:bg-opacity-80 transition duration-300 mt-4">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Plan 3: Fantastic+ Bundle */}
                        <div className="relative plan-card">
                            <div className="best-value-banner" data-aos="flip-right" data-aos-delay="800">Best Value</div>
                            <div className="bg-white rounded-2xl shadow-lg flex flex-col justify-between h-full mt-6 p-8">
                                <div className="flex flex-col justify-between flex-grow">
                                    <h3 className="text-2xl font-bold mb-4 text-primary">Fantastic+ Bundle</h3>
                                    <div className="flex items-center text-2xl font-bold mb-4">
                                        <span style={{ color: 'black' }}>Total:</span>
                                        <span className="total-wrapper-red ml-2">
                                            <span className="dollar-sign">$</span>
                                            <span>125</span>
                                        </span>
                                        <span className="per-contracted ml-2">Per accepted contract</span>
                                    </div>
                                    <p className="mb-4 text-gray-700">Save <span className="font-bold">$80 monthly</span> and <span className="font-bold">$4,160 annually</span> <span className="font-bold">Per accepted contract</span> by choosing the F+ Bundle plan.</p>
                                    <ul className="mb-6 space-y-4">
                                        <li className="flex items-start text-gray-700"><CheckmarkIcon /><span><strong>Dispatch</strong></span></li>
                                        <li className="flex items-start text-gray-700"><CheckmarkIcon /><span><strong>Fleet</strong></span></li>
                                        <li className="flex items-start text-gray-700"><CheckmarkIcon /><span><strong>Hiring</strong></span></li>
                                        <li className="flex items-start text-gray-700"><CheckmarkIcon /><span><strong>HR</strong></span></li>
                                    </ul>
                                </div>
                                <Link href="/form" id="fantasticBundleLink" onClick={handleFantasticBundleClick}>
                                    <button className="bg-secondary text-white px-6 py-3 w-full rounded-lg font-medium hover:bg-opacity-80 transition duration-300 mt-4 self-end">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-16 py-16" data-aos="fade-left" data-aos-delay="500">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
                        <table className="w-full text-sm text-gray-900 border border-gray-300">
                            {/* Dispatching Services Header */}
                            <thead>
                                <tr className="bg-primary text-white border-b border-gray-300 ">
                                    <th colSpan="2" className="text-2xl font-bold px-6 py-4">
                                        Dispatching Services
                                    </th>
                                </tr>
                                <tr className="bg-primary border-b border-gray-300 bg-opacity-50">
                                    <th scope="col" className="px-6 py-3">Service</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                </tr>
                            </thead>
                            {/* Dispatching Services Body */}
                            <tbody>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Talk & Text Availability 24/7</td>
                                    <td className="px-6 py-4">Ensures dedicated support availability to your drivers around the
                                        clock via prompt responses to calls and messages.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">24/7 On Road Monitoring</td>
                                    <td className="px-6 py-4">Ensures drivers are monitored around the clock with real-time updates
                                        for safe and seamless operations.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Hours of Service Compliance Management</td>
                                    <td className="px-6 py-4">Comprehensive monitoring and support for drivers, ensuring compliance
                                        with HOS regulations by tracking hours, optimizing scheduling, reconciling exceptions
                                        like shift time, adverse conditions, Yard Move, and Personal Conveyance allowances.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Performance Disputes</td>
                                    <td className="px-6 py-4">Handles performance disputes impacting the AFP&apos;s Operational Score,
                                        preventing negative effects from Amazon-controllable factors.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Reconcile Unassigned Drive Time</td>
                                    <td className="px-6 py-4">Reconciles unassigned drive time to maintain compliance with Amazon
                                        policy and FMCSA regulations ensuring accurate records at all times.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Daily & Weekly Reporting</td>
                                    <td className="px-6 py-4">Delivers detailed reports on Acceptance, On-Time Performance, and
                                        Operational Excellence Scores on a daily and weekly cadence to stay up to date with your
                                        company’s KPI’s.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Driver Safety Checks</td>
                                    <td className="px-6 py-4">Requires drivers to report key updates to ensure timely assistance,
                                        conflict resolution and reassurance of safe driving practices.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Schedule Reminders</td>
                                    <td className="px-6 py-4">Provides timely schedule reminders to drivers, helping them stay on
                                        track and proactively address potential operational challenges before the scheduled
                                        departure time.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">ROC Communication</td>
                                    <td className="px-6 py-4">Handles ROC communications, including case creation and conflict
                                        resolution, for seamless workflow allowing for drivers to focus more on driving.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Relay Load Notes</td>
                                    <td className="px-6 py-4">Maintains detailed load notes to safeguard AFPs&apos; scores and
                                        operational performance so key stakeholders are informed of what transpired during the
                                        respective tour.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Tracking Comdata Cards and Purchases</td>
                                    <td className="px-6 py-4">Actively manages Comdata cards, resolves issues, and ensures secure
                                        transactions.</td>
                                </tr>

                                {/* Safety Header */}
                                <tr className="bg-secondary text-white border-b border-gray-300">
                                    <th colSpan="2" className="text-lg font-bold px-6 py-4">
                                        Safety features are included
                                    </th>
                                </tr>

                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Accident / Incident Investigation & Reporting</td>
                                    <td className="px-6 py-4">Manages accident and incident processes, ensuring thorough
                                        documentation and resolution from start to finish.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Netradyne Reports</td>
                                    <td className="px-6 py-4">Monitors Netradyne reports and provides real-time updates on driver
                                        behavior.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Real Time Safety Coachings (Netradyne and/or Organic)
                                    </td>
                                    <td className="px-6 py-4">Delivers driver coaching through Netradyne and other channels to
                                        improve safety scores and awareness (Netradyne is optional).</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Safety Campaigns</td>
                                    <td className="px-6 py-4">Creates engaging campaigns that promote driver safety using impactful
                                        tools and methods on a consistent cadence.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Smith System Training Coordination & Selection</td>
                                    <td className="px-6 py-4">Coordinates Smith System training for selected drivers and tracks
                                        their progress post-completion.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Weather Monitoring</td>
                                    <td className="px-6 py-4">Monitors weather conditions along the path of a driver’s tour and
                                        adjusts plans strategically to prioritize driver safety.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
                        <table className="w-full text-sm text-gray-900 border border-gray-300">
                            {/* Fleet Services Header */}
                            <thead>
                                <tr className="bg-primary text-white border-b border-gray-300">
                                    <th colSpan="2" className="text-2xl font-bold px-6 py-4">
                                        Fleet Services
                                    </th>
                                </tr>
                                <tr className="bg-primary border-b border-gray-300 bg-opacity-50">
                                    <th scope="col" className="px-6 py-3">Service</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                </tr>
                            </thead>
                            {/* Fleet Services Body */}
                            <tbody>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Annual Inspections Tracking</td>
                                    <td className="px-6 py-4">Ensures trucks&apos; annual inspections are tracked and kept current to
                                        meet DOT requirements by identifying inspections nearing expiration, coordinating with
                                        on-site maintenance vendors and providing updated documentation.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Repair Orders' Invoice Tracking</td>
                                    <td className="px-6 py-4">Tracks all repair orders for tractors, including dates, vendors, and
                                        costs, providing a comprehensive record of fleet-related expenses.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Maintenance Allowance Tracking</td>
                                    <td className="px-6 py-4">Monitors maintenance allowance and compares it with report data to
                                        identify and prevent unnecessary expenditures.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Partner-Managed Repairs Reimbursement Tracking</td>
                                    <td className="px-6 py-4">Issues reimbursement documentation for partner-managed repairs and
                                        tracks payments until completion, ensuring accuracy and accountability.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Partner-Managed Repairs Archive</td>
                                    <td className="px-6 py-4">Maintains an archive of partner-managed repair reimbursements,
                                        providing a detailed history of received amounts and timelines.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Work Order Creation & Tracking</td>
                                    <td className="px-6 py-4">Oversees the creation, tracking, and closure of work orders while
                                        ensuring units return to active status promptly for maximum tractor uptime.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Escalations</td>
                                    <td className="px-6 py-4">Handles escalations for unresolved issues through proper channels,
                                        ensuring swift and effective resolutions.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Mechanical Tractor Disputes</td>
                                    <td className="px-6 py-4">Manages disputes related to mechanical tractor issues that are not
                                        carrier-controllable to ensure the highest operational excellence score is achieved.
                                    </td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">24/7 On-Site Maintenance Vendor Communication</td>
                                    <td className="px-6 py-4">Provides 24/7 availability for on-site maintenance vendor
                                        communications, ensuring timely responses and repairs.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">DSS Communication 24/7</td>
                                    <td className="px-6 py-4">Offers around-the-clock support for DSS communications to address
                                        inquiries and concerns promptly.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Driver Damage Report</td>
                                    <td className="px-6 py-4">Tracks driver-related incidents, accidents, false reports, and
                                        damages, delivering actionable data for fleet management and accountability.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Defects Data Archive</td>
                                    <td className="px-6 py-4">Maintains and organizes truck defect records, providing AFPs with
                                        accurate, up-to-date information to support informed decisions, streamline maintenance,
                                        and ensure compliance.</td>
                                </tr>

                                {/* Safety Header */}
                                <tr className="bg-secondary text-white border-b border-gray-300">
                                    <th colSpan="2" className="text-lg font-bold px-6 py-4">
                                        Safety features are included
                                    </th>
                                </tr>

                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Tractor Health Report</td>
                                    <td className="px-6 py-4">Provides comprehensive updates on tractor health, including defect
                                        causes, repair timelines, and ongoing maintenance needs.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Tractor Care & Handling Training</td>
                                    <td className="px-6 py-4">Develops and shares training content to educate drivers on proper
                                        tractor care, handling and maintenance for optimal performance and overall fleet health.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
                        <table className="w-full text-sm text-gray-900 border border-gray-300">
                            {/* Hiring Services Header */}
                            <thead>
                                <tr className="bg-primary text-white border-b border-gray-300">
                                    <th colSpan="2" className="text-2xl font-bold px-6 py-4">
                                        Hiring Services
                                    </th>
                                </tr>
                                <tr className="bg-primary border-b border-gray-300 bg-opacity-50">
                                    <th scope="col" className="px-6 py-3">Service</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                </tr>
                            </thead>
                            {/* Hiring Services Body */}
                            <tbody>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Job Postings & Advertising</td>
                                    <td className="px-6 py-4">Creates and manages job postings and advertising campaigns to attract
                                        the right talent from various platforms.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Fountain Management</td>
                                    <td className="px-6 py-4">Oversees the management of Fountain to optimize hiring workflows,
                                        organization and candidate experience.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">One-Way Interviews</td>
                                    <td className="px-6 py-4">Facilitates one-way virtual interviews to streamline the candidate
                                        screening process.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Phone Screening</td>
                                    <td className="px-6 py-4">Performs phone screenings to evaluate candidate qualifications and
                                        fit for the role.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Expiring Driver Document Tracking</td>
                                    <td className="px-6 py-4">Monitors and tracks expiring driver documents to ensure timely
                                        renewal and compliance.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">JJ Keller Support & Assistance</td>
                                    <td className="px-6 py-4">Provides support and coordination with JJ Keller for compliance and
                                        driver management solutions.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">CDL & Finishing School Programs</td>
                                    <td className="px-6 py-4">Manages the partnership for CDL and finishing school programs to
                                        build a qualified driver pipeline and ensure reimbursement.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Maintain Healthy Pipeline</td>
                                    <td className="px-6 py-4">Implements strategies to maintain a robust pipeline of qualified
                                        candidates to ensure staffing is never an issue.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">EEO Guidelines & Best Practices</td>
                                    <td className="px-6 py-4">Ensures adherence to Equal Employment Opportunity guidelines and best
                                        practices in recruitment and hiring.</td>
                                </tr>

                                {/* Safety Header */}
                                <tr className="bg-secondary text-white border-b border-gray-300">
                                    <th colSpan="2" className="text-lg font-bold px-6 py-4">
                                        Safety features are included
                                    </th>
                                </tr>

                                {/* Safety Services */}
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">MVR Review</td>
                                    <td className="px-6 py-4">Reviews Motor Vehicle Reports (MVR) to ensure compliance with safety
                                        and qualification standards, tailored to the AFPs desires.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">SPHRR Review</td>
                                    <td className="px-6 py-4">Conducts Safety Performance History Record Request reviews to
                                        identify and address potential hiring risks.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Drug Test Follow-Up</td>
                                    <td className="px-6 py-4">Coordinates and tracks drug test follow-ups to meet regulatory and
                                        company requirements.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-12">
                        <table className="w-full text-sm text-gray-900 border border-gray-300">
                            {/* HR Services Header */}
                            <thead>
                                <tr className="bg-primary text-white border-b border-gray-300">
                                    <th colSpan="2" className="text-2xl font-bold px-6 py-4">
                                        HR Services
                                    </th>
                                </tr>
                                <tr className="bg-primary border-b border-gray-300 bg-opacity-50">
                                    <th scope="col" className="px-6 py-3">Service</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                </tr>
                            </thead>
                            {/* HR Services Body */}
                            <tbody>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Scheduling Assistance</td>
                                    <td className="px-6 py-4">Offers tailored scheduling support to assign trips efficiently while
                                        meeting Hours of Service requirements, minimizing downtime and maintaining on-time
                                        performance.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Payroll Administration</td>
                                    <td className="px-6 py-4">Handles payroll administration by tracking hours worked through Relay
                                        and ADP, ensuring drivers are paid accurately and on time, streamlining processes and
                                        reducing errors.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Virtual Orientation</td>
                                    <td className="px-6 py-4">Provides a comprehensive onboarding experience covering company
                                        policies, safety protocols, and operational procedures to prepare drivers for success in
                                        a remote, professional format.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Intermodal Training</td>
                                    <td className="px-6 py-4">Provides specialized training programs for intermodal operations to
                                        enhance driver skills and performance of transporting intermodal containers.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Driver Scorecards (Daily, Weekly, Monthly)</td>
                                    <td className="px-6 py-4">Generates detailed driver performance scorecards to track and enhance
                                        operational metrics at a micro and macro level.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Driver Integration</td>
                                    <td className="px-6 py-4">Manages the setup of driver profiles in platforms such as Relay, ADP,
                                        UIIA, and Netradyne, ensuring accurate data tracking and compliance.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Health Benefits Tracking</td>
                                    <td className="px-6 py-4">Administers and monitors health benefit enrollments, updates, and
                                        expirations, ensuring uninterrupted access and regulatory compliance.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Insurance Reviews</td>
                                    <td className="px-6 py-4">Conducts thorough reviews of insurance policies to ensure optimal
                                        coverage and compliance, at the best premium price.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">CAPs (Optional)</td>
                                    <td className="px-6 py-4">Develops tailored Corrective Action Plans with clear actions,
                                        deadlines, and follow-ups to support performance improvement and accountability among
                                        drivers.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Just-Cause Terminations</td>
                                    <td className="px-6 py-4">Facilitates just-cause terminations in compliance with legal and
                                        organizational standards, approved by the AFP Business Owner.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Employee File Tracking & Documentation</td>
                                    <td className="px-6 py-4">Maintains accurate and organized employee files and documentation for
                                        compliance and operational efficiency.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Employee Engagement Program</td>
                                    <td className="px-6 py-4">Develops initiatives to boost employee engagement, morale, and
                                        retention through strategic programming.</td>
                                </tr>

                                {/* Safety Header */}
                                <tr className="bg-secondary text-white border-b border-gray-300">
                                    <th colSpan="2" className="text-lg font-bold px-6 py-4">
                                        Safety features are included
                                    </th>
                                </tr>

                                {/* Safety Services */}
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Workplace Injury Tracking & Mitigation</td>
                                    <td className="px-6 py-4">Tracks workplace injuries, identifies trends, addresses root causes,
                                        and develops mitigation strategies, including OSHA reporting to ensure safety and
                                        compliance.</td>
                                </tr>
                                <tr className="bg-primary/10 border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Netradyne Feedback (Safety Disputes)</td>
                                    <td className="px-6 py-4">Handles safety feedback and disputes through Netradyne, ensuring
                                        fairness and compliance.</td>
                                </tr>
                                <tr className="bg-white border-b border-gray-300">
                                    <td className="px-6 py-4 font-medium">Safety Competitions</td>
                                    <td className="px-6 py-4">Organizes safety competitions to promote healthy competition, best
                                        practices and driver engagement in safety protocols.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </section>


       

                {/* FAQ Section */}
                <section id="faq" className="py-20 bg-gray-100 px-4 py-8" data-aos="fade-up" data-aos-delay="600">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-primary mb-12">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto space-y-4" id="faq-accordion">
                            {faqData.map((faq, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md">
                                    <button
                                        className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
                                        onClick={() => handleFaqToggle(index)}
                                        onKeyDown={(e) => handleFaqKeyDown(e, index)}
                                        aria-expanded={openFaqIndex === index}
                                        aria-controls={`faq-answer-${index}`}
                                    >
                                        <span className="text-lg font-semibold text-primary">{faq.question}</span>
                                        <FaChevronDown 
                                            className={`text-secondary transition-transform duration-300 ${
                                                openFaqIndex === index ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <div 
                                        className={`p-4 border-t transition-all duration-300 ${
                                            openFaqIndex === index ? 'block' : 'hidden'
                                        }`}
                                        id={`faq-answer-${index}`}
                                    >
                                        <p className="text-primary">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-6 text-center">
                        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg inline-block">
                            <h2 className="text-3xl font-bold text-primary mb-4">Ready to Take Your Logistics to the Next Level?</h2>
                            <p className="text-gray-700 mb-6">Let’s discuss tailored solutions to maximize your efficiency.</p>
                            <Link href="/bookings/create" className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300">
                                Book a Meeting
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

export default PricingPage;
