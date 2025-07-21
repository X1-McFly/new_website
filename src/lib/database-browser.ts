// Browser-safe database module - uses local storage and mock data
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string;
  benefits?: string;
  salary_range?: string;
  posted_date: string;
  closing_date?: string;
  is_active: boolean;
}

interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
}

// Mock data for development
const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Robotics Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "full-time",
    level: "senior",
    description: "Lead the development of next-generation humanoid robots with advanced AI capabilities.",
    requirements: "PhD in Robotics or related field, 5+ years experience in robotic systems, expertise in ROS, C++, Python",
    benefits: "Competitive salary, equity, health insurance, unlimited PTO",
    salary_range: "$150,000 - $200,000",
    posted_date: new Date().toISOString(),
    is_active: true
  },
  {
    id: 2,
    title: "AI Research Scientist",
    department: "Research",
    location: "Remote",
    type: "full-time",
    level: "senior",
    description: "Research and develop cutting-edge AI algorithms for robotic perception and decision making.",
    requirements: "PhD in AI/ML, publications in top-tier conferences, experience with deep learning frameworks",
    benefits: "Competitive salary, equity, health insurance, research budget",
    salary_range: "$140,000 - $180,000",
    posted_date: new Date().toISOString(),
    is_active: true
  }
];

const mockAdminUsers: AdminUser[] = [
  {
    id: 1,
    username: "admin",
    password_hash: "hashed_password_123" // In real app, this would be properly hashed
  }
];

// Browser-safe database interface
export const jobsDB = {
  getAll: (): Job[] => {
    try {
      const stored = localStorage.getItem('biocom_jobs');
      return stored ? JSON.parse(stored) : mockJobs;
    } catch {
      return mockJobs;
    }
  },

  getById: (id: number): Job | undefined => {
    const jobs = jobsDB.getAll();
    return jobs.find(job => job.id === id);
  },

  create: (job: Omit<Job, 'id' | 'posted_date'>): Job => {
    const jobs = jobsDB.getAll();
    const newJob: Job = {
      ...job,
      id: Math.max(...jobs.map(j => j.id), 0) + 1,
      posted_date: new Date().toISOString()
    };
    jobs.push(newJob);
    localStorage.setItem('biocom_jobs', JSON.stringify(jobs));
    return newJob;
  },

  update: (id: number, updates: Partial<Job>): Job | null => {
    const jobs = jobsDB.getAll();
    const index = jobs.findIndex(job => job.id === id);
    if (index === -1) return null;
    
    jobs[index] = { ...jobs[index], ...updates };
    localStorage.setItem('biocom_jobs', JSON.stringify(jobs));
    return jobs[index];
  },

  delete: (id: number): boolean => {
    const jobs = jobsDB.getAll();
    const index = jobs.findIndex(job => job.id === id);
    if (index === -1) return false;
    
    jobs.splice(index, 1);
    localStorage.setItem('biocom_jobs', JSON.stringify(jobs));
    return true;
  }
};

export const adminDB = {
  findByUsername: (username: string): AdminUser | undefined => {
    try {
      const stored = localStorage.getItem('biocom_admin_users');
      const users = stored ? JSON.parse(stored) : mockAdminUsers;
      return users.find((user: AdminUser) => user.username === username);
    } catch {
      return mockAdminUsers.find(user => user.username === username);
    }
  },

  create: (user: Omit<AdminUser, 'id'>): AdminUser => {
    try {
      const stored = localStorage.getItem('biocom_admin_users');
      const users = stored ? JSON.parse(stored) : mockAdminUsers;
      const newUser: AdminUser = {
        ...user,
        id: Math.max(...users.map((u: AdminUser) => u.id), 0) + 1
      };
      users.push(newUser);
      localStorage.setItem('biocom_admin_users', JSON.stringify(users));
      return newUser;
    } catch {
      return { ...user, id: 1 };
    }
  }
};

// Initialize default admin user if not exists
if (typeof window !== 'undefined') {
  const defaultAdmin = adminDB.findByUsername('admin');
  if (!defaultAdmin) {
    adminDB.create({
      username: 'admin',
      password_hash: 'admin123' // In production, this should be properly hashed
    });
  }
}

export type { Job, AdminUser };
