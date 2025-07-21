// Mock API service for jobs management
// In a real application, this would connect to a backend API

import { Job } from '@/lib/database';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database storage (in real app, this would be handled by backend)
let mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Robotics Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "full-time",
    level: "senior",
    description: "Lead the development of advanced humanoid robotics systems for our Atlas Zero platform. Work with cutting-edge technology in AI, computer vision, and mechanical engineering.",
    requirements: "• PhD or Masters in Robotics, Mechanical Engineering, or related field\n• 5+ years experience in robotics development\n• Proficiency in ROS, Python, C++\n• Experience with computer vision and machine learning\n• Strong problem-solving and teamwork skills",
    benefits: "• xry and equity\n• Comprehensive health insurance\n• Unlimited PTO\n• Professional development budget\n• Cutting-edge equipment and tools",
    salary_range: "$150,000 - $220,000",
    posted_date: "2025-01-10",
    is_active: true
  },
  {
    id: 1,
    title: "Mechanical Engineering Intern",
    department: "Engineering",
    location: "Little Rock, AR",
    type: "part-time",
    level: "entry",
    description: "Assist in the development of advanced humanoid robotics systems for our Atlas Zero platform. Work with cutting-edge technology in AI, computer vision, and mechanical engineering.",
    requirements: "• Pursuing a degree in Robotics, Mechanical Engineering, or related field\n• Familiarity with ROS, Python, C++\n• Basic understanding of computer vision and machine learning\n• Strong problem-solving and teamwork skills",
    benefits: "• Competitive internship salary\n• Comprehensive health insurance\n• Unlimited PTO\n• Professional development budget\n• Cutting-edge equipment and tools",
    salary_range: "",
    posted_date: "2025-07-10",
    is_active: true
  },
];

export const jobsAPI = {
  // Get all active jobs
  async getActiveJobs(): Promise<Job[]> {
    await delay(300); // Simulate network delay
    return mockJobs.filter(job => job.is_active);
  },

  // Get all jobs (for admin)
  async getAllJobs(): Promise<Job[]> {
    await delay(300);
    return [...mockJobs];
  },

  // Get job by ID
  async getJobById(id: number): Promise<Job | null> {
    await delay(200);
    return mockJobs.find(job => job.id === id) || null;
  },

  // Create new job
  async createJob(job: Omit<Job, 'id' | 'posted_date'>): Promise<Job> {
    await delay(500);
    
    const newJob: Job = {
      ...job,
      id: Math.max(...mockJobs.map(j => j.id!)) + 1,
      posted_date: new Date().toISOString().split('T')[0]
    };
    
    mockJobs.unshift(newJob);
    return newJob;
  },

  // Update job
  async updateJob(id: number, updates: Partial<Job>): Promise<Job | null> {
    await delay(400);
    
    const jobIndex = mockJobs.findIndex(job => job.id === id);
    if (jobIndex === -1) return null;
    
    mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...updates };
    return mockJobs[jobIndex];
  },

  // Delete job
  async deleteJob(id: number): Promise<boolean> {
    await delay(300);
    
    const jobIndex = mockJobs.findIndex(job => job.id === id);
    if (jobIndex === -1) return false;
    
    mockJobs.splice(jobIndex, 1);
    return true;
  },

  // Toggle job active status
  async toggleJobStatus(id: number): Promise<Job | null> {
    await delay(300);
    
    const job = mockJobs.find(job => job.id === id);
    if (!job) return null;
    
    job.is_active = !job.is_active;
    return job;
  },

  // Submit job application (mock)
  async submitApplication(jobId: number, applicationData: {
    name: string;
    email: string;
    resume: File | null;
    coverLetter?: string;
  }): Promise<{ success: boolean; message: string }> {
    await delay(1000); // Longer delay for file upload simulation
    
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) {
      return { success: false, message: "Job not found" };
    }
    
    // In a real app, this would handle file upload and store application
    return { 
      success: true, 
      message: `Application submitted successfully for ${job.title}!` 
    };
  }
};

export const authAPI = {
  // Mock authentication - in a real app this would connect to your auth service
  async login(username: string, password: string): Promise<{ success: boolean; token?: string; message?: string; error?: string }> {
    await delay(500);
    
    // Mock admin credentials
    if (username === "admin" && password === "biocom2025") {
      return { 
        success: true, 
        token: "mock-jwt-token-admin", 
        message: "Login successful" 
      };
    }
    
    return { 
      success: false, 
      error: "Invalid credentials" 
    };
  },

  async logout(): Promise<void> {
    await delay(200);
    // In a real app, this would invalidate the token
    localStorage.removeItem("authToken");
  },

  async getCurrentUser(): Promise<{ username: string; role: string } | null> {
    await delay(100);
    const token = localStorage.getItem("authToken");
    
    if (token === "mock-jwt-token-admin") {
      return { username: "admin", role: "administrator" };
    }
    
    return null;
  },

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  },

  async initializeAdmin(): Promise<void> {
    // Mock initialization - in a real app this would set up admin defaults
    await delay(100);
    // This method exists for compatibility with the Admin component
  }
};

export default jobsAPI;
