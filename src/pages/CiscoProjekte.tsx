import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { ciscoProjects } from "@/data/portfolio";
import { ArrowRight, Network, Server, Shield, Activity, Globe, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const CiscoProjekte = () => {
    return (
        <Layout>
            <Helmet>
                <title>Cisco Projects | Gökhan Zehirlioglu</title>
                <meta name="description" content="My Cisco Networking Academy projects and Packet Tracer labs." />
            </Helmet>

            <div className="min-h-screen bg-slate-50 relative font-sans">

                {/* Hero Section - Modern & Dark */}
                <section className="relative bg-gradient-to-r from-slate-900 via-[#005073] to-slate-900 text-white overflow-hidden pb-16 pt-20">
                    {/* Abstract Background Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    </div>
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>


                    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl">
                                {/* Cisco Logo Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-sm font-medium text-teal-300">
                                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                                    Cisco Networking Academy Portfolio
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                                    Network Engineering <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                                        Excellence
                                    </span>
                                </h1>

                                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                                    A curated collection of my Cisco Packet Tracer labs, demonstrating expertise in Routing, Switching, VLANs, and Network Security.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                        <Activity className="text-teal-400" size={20} />
                                        <span className="text-sm">Packet Tracer 8.2</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                        <Shield className="text-teal-400" size={20} />
                                        <span className="text-sm">Security & VPN</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                        <Globe className="text-teal-400" size={20} />
                                        <span className="text-sm">WAN Tech</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Graphic / Cisco Logo */}
                            <div className="hidden md:flex flex-col items-center justify-center relative">
                                <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full"></div>
                                {/* SVG Cisco Logo - White/Transparent */}
                                <svg
                                    viewBox="0 0 64 32"
                                    className="w-64 h-32 md:w-80 md:h-40 text-white relative z-10"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7.2 15.4c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4c1.3 0 2.4-1.1 2.4-2.4S8.5 15.4 7.2 15.4zM3.2 24.1c1.1 0 2-0.9 2-2H1.2C1.2 23.2 2.1 24.1 3.2 24.1zM11.2 24.1c1.1 0 2-0.9 2-2H9.2C9.2 23.2 10.1 24.1 11.2 24.1zM15.2 10.5c-2.2 0-4 1.8-4 4s1.8 4 4 4c2.2 0 4-1.8 4-4S17.4 10.5 15.2 10.5zM12.9 24.1c1.1 0 2-0.9 2-2h-3.9C11 23.2 11.8 24.1 12.9 24.1zM20.8 24.1c1.1 0 2-0.9 2-2h-3.9C18.9 23.2 19.8 24.1 20.8 24.1zM23.2 5.6C20 5.6 17.3 8.2 17.3 11.5s2.7 5.9 5.9 5.9 5.9-2.7 5.9-5.9S26.4 5.6 23.2 5.6zM27 24.1c1.1 0 2-0.9 2-2H25C25 23.2 25.9 24.1 27 24.1zM31.2 0.7C26.9 0.7 23.4 4.3 23.4 8.6c0 4.3 3.5 7.9 7.9 7.9 4.3 0 7.9-3.5 7.9-7.9C39.1 4.3 35.6 0.7 31.2 0.7zM34.9 24.1c1.1 0 2-0.9 2-2H33C33 23.2 33.8 24.1 34.9 24.1zM39.2 5.6c-3.2 0-5.9 2.7-5.9 5.9s2.7 5.9 5.9 5.9c3.2 0 5.9-2.7 5.9-5.9S42.4 5.6 39.2 5.6zM41.6 24.1c1.1 0 2-0.9 2-2h-3.9C39.7 23.2 40.5 24.1 41.6 24.1zM47.2 10.5c-2.2 0-4 1.8-4 4s1.8 4 4 4c2.2 0 4-1.8 4-4S49.4 10.5 47.2 10.5zM47.8 24.1c1.1 0 2-0.9 2-2h-3.9C45.9 23.2 46.8 24.1 47.8 24.1zM55.2 15.4c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4c1.3 0 2.4-1.1 2.4-2.4S56.6 15.4 55.2 15.4zM53.6 24.1c1.1 0 2-0.9 2-2h-3.9C51.6 23.2 52.5 24.1 53.6 24.1zM59.3 24.1c1.1 0 2-0.9 2-2h-3.9C57.4 23.2 58.2 24.1 59.3 24.1z" />
                                </svg>
                                <span className="font-mono text-teal-400 mt-4 tracking-[0.2em] text-sm uppercase opacity-80">Empower the Internet</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Info Bar */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-6">
                            <span>Total Projects: <span className="text-slate-900 font-bold">{ciscoProjects.length}</span></span>
                            <span className="hidden sm:inline-block w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="hidden sm:inline">Last Updated: <span className="text-slate-900 font-bold">Feb 2026</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-teal-600">
                            <Server size={16} />
                            <span>Lab Environment Active</span>
                        </div>
                    </div>
                </div>

                {/* Projects Grid Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
                    <div className="flex items-center mb-10 gap-4">
                        <div className="h-8 w-1 bg-gradient-to-b from-[#005073] to-teal-400 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-slate-800">Available Labs</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ciscoProjects.length > 0 ? (
                            ciscoProjects.map((project, index) => (
                                <Link
                                    key={index}
                                    to={project.path}
                                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-teal-400/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
                                >
                                    {/* Card Header Gradient */}
                                    <div className="h-1.5 w-full bg-gradient-to-r from-[#005073] to-teal-400"></div>

                                    <div className="p-6 flex flex-col h-full relative">
                                        {/* Status Tag */}
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                COMPLETED
                                            </span>
                                        </div>

                                        {/* Icon */}
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            {project.logos && project.logos[0] ? (
                                                <img src={project.logos[0]} alt="Lab Icon" className="w-6 h-6 object-contain" />
                                            ) : (
                                                <Network className="text-[#005073]" size={24} />
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
                                            {project.label}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Action Area */}
                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                                <Cpu size={14} />
                                                <span>Topology</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm font-bold text-[#005073] group-hover:translate-x-1 transition-transform">
                                                Open Lab
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                                <Link to="/" className="inline-flex flex-col items-center group">
                                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors">
                                        <Network size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-700">No Projects Found</h3>
                                    <p className="text-slate-400 text-sm mt-1">Check back later for updates</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer Badge */}
                <div className="bg-slate-900 border-t border-slate-800 py-8 text-center">
                    <p className="text-slate-500 text-xs font-mono">
                        POWERED BY CISCO PACKET TRACER &middot; NETWORK ENGINEERING PORTFOLIO
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default CiscoProjekte;
