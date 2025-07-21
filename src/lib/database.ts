import Database from 'better-sqlite3';
import path from 'path';

// Initialize database
const db = new Database(path.join(process.cwd(), 'careers.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL, -- full-time, part-time, contract
    level TEXT NOT NULL, -- entry, mid, senior, executive
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    benefits TEXT,
    salary_range TEXT,
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    closing_date DATETIME,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Job interface
export interface Job {
  id?: number;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  description: string;
  requirements: string;
  benefits?: string;
  salary_range?: string;
  posted_date?: string;
  closing_date?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Database operations
export const jobsDB = {
  // Get all active jobs
  getAllActive: () => {
    const stmt = db.prepare('SELECT * FROM jobs WHERE is_active = 1 ORDER BY posted_date DESC');
    return stmt.all() as Job[];
  },

  // Get all jobs (including inactive)
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM jobs ORDER BY posted_date DESC');
    return stmt.all() as Job[];
  },

  // Get job by ID
  getById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM jobs WHERE id = ?');
    return stmt.get(id) as Job | undefined;
  },

  // Create new job
  create: (job: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
    const stmt = db.prepare(`
      INSERT INTO jobs (title, department, location, type, level, description, requirements, benefits, salary_range, closing_date, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      job.title,
      job.department,
      job.location,
      job.type,
      job.level,
      job.description,
      job.requirements,
      job.benefits || null,
      job.salary_range || null,
      job.closing_date || null,
      job.is_active !== false ? 1 : 0
    );

    return result.lastInsertRowid;
  },

  // Update job
  update: (id: number, job: Partial<Job>) => {
    const fields = Object.keys(job).filter(key => key !== 'id').join(' = ?, ') + ' = ?';
    const values = Object.entries(job)
      .filter(([key]) => key !== 'id')
      .map(([, value]) => value);
    
    const stmt = db.prepare(`
      UPDATE jobs 
      SET ${fields}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    return stmt.run(...values, id);
  },

  // Delete job (soft delete)
  delete: (id: number) => {
    const stmt = db.prepare('UPDATE jobs SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(id);
  },

  // Hard delete job
  hardDelete: (id: number) => {
    const stmt = db.prepare('DELETE FROM jobs WHERE id = ?');
    return stmt.run(id);
  }
};

// Seed some initial data if database is empty
const existingJobs = jobsDB.getAll();
if (existingJobs.length === 0) {
  // Add some sample jobs
  jobsDB.create({
    title: "Senior Robotics Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "full-time",
    level: "senior",
    description: "Lead the development of advanced humanoid robotics systems for our Atlas Zero platform. Work with cutting-edge technology in AI, computer vision, and mechanical engineering.",
    requirements: "• PhD or Masters in Robotics, Mechanical Engineering, or related field\n• 5+ years experience in robotics development\n• Proficiency in ROS, Python, C++\n• Experience with computer vision and machine learning\n• Strong problem-solving and teamwork skills",
    benefits: "• Competitive salary and equity\n• Comprehensive health insurance\n• Unlimited PTO\n• Professional development budget\n• Cutting-edge equipment and tools",
    salary_range: "$150,000 - $220,000",
    closing_date: "2025-08-15 23:59:59"
  });

  jobsDB.create({
    title: "AI/ML Research Scientist",
    department: "Research & Development",
    location: "Remote",
    type: "full-time",
    level: "senior",
    description: "Develop and implement advanced AI algorithms for humanoid robot perception, decision-making, and learning capabilities.",
    requirements: "• PhD in Computer Science, AI, or related field\n• 3+ years experience in machine learning research\n• Published research in top-tier conferences\n• Experience with deep learning frameworks (PyTorch, TensorFlow)\n• Knowledge of computer vision and NLP",
    benefits: "• Competitive salary and equity\n• Remote work flexibility\n• Research publication support\n• Conference attendance budget\n• Collaborative research environment",
    salary_range: "$140,000 - $200,000"
  });

  jobsDB.create({
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "full-time",
    level: "mid",
    description: "Design intuitive user interfaces and experiences for robot control systems and mobile applications.",
    requirements: "• Bachelor's degree in Design, HCI, or related field\n• 3+ years experience in product design\n• Proficiency in Figma, Sketch, or similar tools\n• Experience with mobile and web design\n• Understanding of user research and testing",
    benefits: "• Competitive salary\n• Health and dental insurance\n• Design conference budget\n• Creative workspace\n• Flexible work arrangements",
    salary_range: "$90,000 - $130,000"
  });
}

export default db;
