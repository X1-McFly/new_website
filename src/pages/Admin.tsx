import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Eye, EyeOff, LogOut } from "lucide-react";
import { Job } from "@/lib/database";
import { jobsAPI, authAPI } from "@/lib/api";
import { toast } from "sonner";

const Admin = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Job>>({});
  const [loading, setLoading] = useState(true);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Initialize admin on component mount
  useEffect(() => {
    authAPI.initializeAdmin();
  }, []);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    
    try {
      const result = await authAPI.login(loginForm.username, loginForm.password);
      // const result = true;

      if (true) {
        setIsAuthenticated(true);
        toast.success('Login successful');
        setLoginForm({ username: '', password: '' });
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h1 className="text-3xl font-bold mb-2 text-center">Admin Login</h1>
              <p className="text-gray-400 text-center mb-8">Access the admin dashboard</p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  {loginLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400">
                  <strong>Default credentials:</strong><br />
                  Username: <code className="text-green-400">admin</code><br />
                  Password: <code className="text-green-400">admin123</code>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fetch all jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const allJobs = await jobsAPI.getAllJobs();
        setJobs(allJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        toast.error('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job: Job) => {
    setIsEditing(job.id!);
    setEditForm(job);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(null);
    setEditForm({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      level: "mid",
      description: "",
      requirements: "",
      benefits: "",
      salary_range: "",
      is_active: true
    });
  };

  const handleSave = async () => {
    if (!editForm.title || !editForm.department || !editForm.location || !editForm.description || !editForm.requirements) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (isCreating) {
        // Create new job
        const newJob = await jobsAPI.createJob(editForm as Omit<Job, 'id' | 'posted_date'>);
        setJobs([newJob, ...jobs]);
        toast.success("Job created successfully!");
      } else if (isEditing) {
        // Update existing job
        const updatedJob = await jobsAPI.updateJob(isEditing, editForm);
        if (updatedJob) {
          setJobs(jobs.map(job => 
            job.id === isEditing ? updatedJob : job
          ));
          toast.success("Job updated successfully!");
        } else {
          toast.error("Failed to update job");
        }
      }

      setIsCreating(false);
      setIsEditing(null);
      setEditForm({});
    } catch (error) {
      console.error('Save failed:', error);
      toast.error("Failed to save job");
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(null);
    setEditForm({});
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const success = await jobsAPI.deleteJob(id);
        if (success) {
          setJobs(jobs.filter(job => job.id !== id));
          toast.success("Job deleted successfully!");
        } else {
          toast.error("Failed to delete job");
        }
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error("Failed to delete job");
      }
    }
  };

  const toggleActive = async (id: number) => {
    try {
      const updatedJob = await jobsAPI.toggleJobStatus(id);
      if (updatedJob) {
        setJobs(jobs.map(job => 
          job.id === id ? updatedJob : job
        ));
        toast.success(`Job ${updatedJob.is_active ? 'activated' : 'deactivated'} successfully!`);
      } else {
        toast.error("Failed to update job status");
      }
    } catch (error) {
      console.error('Toggle failed:', error);
      toast.error("Failed to update job status");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Header */}
        <section className="py-8 bg-black border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <a 
                href="/careers" 
                className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Careers
              </a>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Job Management
                  </h1>
                  <p className="text-white/70">
                    Manage job postings and career opportunities
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                  <button
                    onClick={handleCreate}
                    className="button-primary flex items-center gap-2"
                    disabled={isCreating || isEditing !== null}
                  >
                    <Plus className="w-4 h-4" />
                    Add New Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Create/Edit Form */}
        {(isCreating || isEditing !== null) && (
          <section className="py-8 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-black rounded-xl border border-white/20 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      {isCreating ? "Create New Job" : "Edit Job"}
                    </h2>
                    <button
                      onClick={handleCancel}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={editForm.title || ""}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="e.g. Senior Robotics Engineer"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Department *
                      </label>
                      <input
                        type="text"
                        value={editForm.department || ""}
                        onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="e.g. Engineering"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={editForm.location || ""}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Employment Type
                      </label>
                      <select
                        value={editForm.type || "full-time"}
                        onChange={(e) => setEditForm({...editForm, type: e.target.value as Job['type']})}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Experience Level
                      </label>
                      <select
                        value={editForm.level || "mid"}
                        onChange={(e) => setEditForm({...editForm, level: e.target.value as Job['level']})}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="executive">Executive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        value={editForm.salary_range || ""}
                        onChange={(e) => setEditForm({...editForm, salary_range: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                        placeholder="e.g. $100,000 - $150,000"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-white font-medium mb-2">
                      Job Description *
                    </label>
                    <textarea
                      value={editForm.description || ""}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                      placeholder="Describe the role and responsibilities..."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-white font-medium mb-2">
                      Requirements *
                    </label>
                    <textarea
                      value={editForm.requirements || ""}
                      onChange={(e) => setEditForm({...editForm, requirements: e.target.value})}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                      placeholder="• Requirement 1&#10;• Requirement 2&#10;• Requirement 3"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-white font-medium mb-2">
                      Benefits
                    </label>
                    <textarea
                      value={editForm.benefits || ""}
                      onChange={(e) => setEditForm({...editForm, benefits: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                      placeholder="• Benefit 1&#10;• Benefit 2&#10;• Benefit 3"
                    />
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="button-primary flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isCreating ? "Create Job" : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Jobs List */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  Loading jobs...
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center text-white/60 py-12">
                  No jobs found. Click "Add New Job" to create your first job posting.
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className={`bg-gray-900 rounded-xl border p-6 transition-colors ${
                        job.is_active ? 'border-white/10' : 'border-red-500/30 bg-red-900/10'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-xl font-semibold ${job.is_active ? 'text-white' : 'text-white/60'}`}>
                              {job.title}
                            </h3>
                            {!job.is_active && (
                              <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/30">
                                Inactive
                              </span>
                            )}
                          </div>
                          
                          <div className="text-white/60 text-sm mb-2">
                            {job.department} • {job.location} • {job.type} • {job.level}
                          </div>
                          
                          <div className="text-white/60 text-sm">
                            Posted: {formatDate(job.posted_date)} | Salary: {job.salary_range || "Not specified"}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleActive(job.id!)}
                            className={`p-2 rounded-lg transition-colors ${
                              job.is_active 
                                ? 'text-green-400 hover:bg-green-500/20' 
                                : 'text-red-400 hover:bg-red-500/20'
                            }`}
                            title={job.is_active ? 'Deactivate' : 'Activate'}
                          >
                            {job.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                          </button>
                          
                          <button
                            onClick={() => handleEdit(job)}
                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                            disabled={isCreating || isEditing !== null}
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(job.id!)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            disabled={isCreating || isEditing !== null}
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
