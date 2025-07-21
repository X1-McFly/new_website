import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, MapPin, Clock, Briefcase, Users, Search, Filter } from "lucide-react";
import { Job } from "@/lib/database";
import { jobsAPI } from "@/lib/api";

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const activeJobs = await jobsAPI.getActiveJobs();
        setJobs(activeJobs);
        setFilteredJobs(activeJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }

    // Location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter(job => job.level === selectedLevel);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedDepartment, selectedLocation, selectedLevel]);

  const departments = Array.from(new Set(jobs.map(job => job.department)));
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const levels = Array.from(new Set(jobs.map(job => job.level)));

  const formatSalary = (salary?: string) => {
    return salary ? `${salary} annually` : "Competitive salary";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'entry': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'mid': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'senior': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'executive': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <a 
                href="/" 
                className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </a>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Join Our Team
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Help us build the future of robotics. Join BIOCOM and work on cutting-edge technology that will shape tomorrow's world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{jobs.length}+</div>
                  <div className="text-white/60">Open Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{departments.length}</div>
                  <div className="text-white/60">Departments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{locations.length}</div>
                  <div className="text-white/60">Locations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-black text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white/60"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-4 flex-wrap">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-white/20 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-white/20 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="all">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>

                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-white/20 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="all">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  Loading positions...
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center text-white/60">
                  No positions found matching your criteria.
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-gray-900 rounded-xl border border-white/10 p-6 hover:border-white/30 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs border ${getLevelColor(job.level)}`}>
                              {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm mb-4">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {job.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.type.replace('-', ' ')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Posted {formatDate(job.posted_date)}
                            </div>
                          </div>
                          
                          <p className="text-white/80 mb-4 line-clamp-3">
                            {job.description}
                          </p>
                          
                          <div className="text-white font-medium">
                            {formatSalary(job.salary_range)}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button className="button-primary">
                            Apply Now
                          </button>
                          <button className="text-white/60 hover:text-white text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Don't See a Perfect Match?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                We're always looking for talented individuals. Send us your resume and tell us how you'd like to contribute to the future of robotics.
              </p>
              <a 
                href="mailto:careers@biocom.tech" 
                className="button-primary inline-flex items-center justify-center"
              >
                Send Resume
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
