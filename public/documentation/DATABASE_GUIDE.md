# BIOCOM SQL Database Developer Guide

## Overview

The BIOCOM website uses SQLite as its database system for storing jobs and wiki content. This document provides comprehensive information on how to interact with the database as a developer.

## Database Setup

### Prerequisites
- Node.js 16+ 
- better-sqlite3 package
- TypeScript (optional but recommended)

### Installation
```bash
npm install better-sqlite3
npm install @types/better-sqlite3 --save-dev  # For TypeScript
```

### Database Location
The SQLite database file is located at: `careers.db` in the project root.

## Database Schema

### Jobs Table
```sql
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- 'full-time', 'part-time', 'contract'
  level TEXT NOT NULL, -- 'entry', 'mid', 'senior', 'executive'
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  benefits TEXT,
  salary_range TEXT,
  posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  closing_date DATETIME,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Wiki Pages Table (Future Extension)
```sql
CREATE TABLE IF NOT EXISTS wiki_pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Database Connection

### Basic Connection
```typescript
import Database from 'better-sqlite3';
import path from 'path';

// Initialize database connection
const db = new Database(path.join(process.cwd(), 'careers.db'));

// Ensure WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

export default db;
```

### Connection with Error Handling
```typescript
import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database;

try {
  db = new Database(path.join(process.cwd(), 'careers.db'));
  db.pragma('journal_mode = WAL');
  console.log('Database connected successfully');
} catch (error) {
  console.error('Database connection failed:', error);
  process.exit(1);
}

export default db;
```

## CRUD Operations

### Jobs Management

#### Create a Job
```typescript
interface Job {
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  description: string;
  requirements: string;
  benefits?: string;
  salary_range?: string;
  closing_date?: string;
  is_active?: boolean;
}

function createJob(job: Omit<Job, 'id'>) {
  const stmt = db.prepare(`
    INSERT INTO jobs (
      title, department, location, type, level, 
      description, requirements, benefits, salary_range, 
      closing_date, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
}
```

#### Read Jobs
```typescript
// Get all active jobs
function getActiveJobs() {
  const stmt = db.prepare('SELECT * FROM jobs WHERE is_active = 1 ORDER BY posted_date DESC');
  return stmt.all();
}

// Get all jobs (including inactive)
function getAllJobs() {
  const stmt = db.prepare('SELECT * FROM jobs ORDER BY posted_date DESC');
  return stmt.all();
}

// Get job by ID
function getJobById(id: number) {
  const stmt = db.prepare('SELECT * FROM jobs WHERE id = ?');
  return stmt.get(id);
}

// Search jobs
function searchJobs(query: string) {
  const stmt = db.prepare(`
    SELECT * FROM jobs 
    WHERE is_active = 1 
    AND (title LIKE ? OR department LIKE ? OR location LIKE ?)
    ORDER BY posted_date DESC
  `);
  const searchPattern = `%${query}%`;
  return stmt.all(searchPattern, searchPattern, searchPattern);
}
```

#### Update Job
```typescript
function updateJob(id: number, updates: Partial<Job>) {
  const fields = Object.keys(updates).filter(key => key !== 'id');
  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const values = fields.map(field => updates[field]);
  
  const stmt = db.prepare(`
    UPDATE jobs 
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `);
  
  return stmt.run(...values, id);
}
```

#### Delete Job
```typescript
// Soft delete (recommended)
function deleteJob(id: number) {
  const stmt = db.prepare('UPDATE jobs SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  return stmt.run(id);
}

// Hard delete (permanent)
function hardDeleteJob(id: number) {
  const stmt = db.prepare('DELETE FROM jobs WHERE id = ?');
  return stmt.run(id);
}
```

## Transactions

### Basic Transaction
```typescript
function createMultipleJobs(jobs: Job[]) {
  const transaction = db.transaction((jobs: Job[]) => {
    const stmt = db.prepare(`
      INSERT INTO jobs (title, department, location, type, level, description, requirements)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    for (const job of jobs) {
      stmt.run(job.title, job.department, job.location, job.type, job.level, job.description, job.requirements);
    }
  });
  
  return transaction(jobs);
}
```

### Transaction with Error Handling
```typescript
function updateJobWithHistory(id: number, updates: Partial<Job>) {
  const transaction = db.transaction(() => {
    try {
      // Create backup in history table
      const job = db.prepare('SELECT * FROM jobs WHERE id = ?').get(id);
      db.prepare(`
        INSERT INTO jobs_history 
        SELECT *, CURRENT_TIMESTAMP as archived_at FROM jobs WHERE id = ?
      `).run(id);
      
      // Update the job
      const fields = Object.keys(updates);
      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const values = fields.map(field => updates[field]);
      
      db.prepare(`
        UPDATE jobs 
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(...values, id);
      
      return { success: true };
    } catch (error) {
      throw error; // This will rollback the transaction
    }
  });
  
  try {
    return transaction();
  } catch (error) {
    console.error('Transaction failed:', error);
    return { success: false, error };
  }
}
```

## Performance Optimization

### Indexes
```sql
-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs(posted_date);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(type);
```

### Prepared Statements
```typescript
// Pre-compile frequently used statements
const getActiveJobsStmt = db.prepare('SELECT * FROM jobs WHERE is_active = 1 ORDER BY posted_date DESC');
const getJobByIdStmt = db.prepare('SELECT * FROM jobs WHERE id = ?');

// Use them efficiently
function getActiveJobs() {
  return getActiveJobsStmt.all();
}

function getJobById(id: number) {
  return getJobByIdStmt.get(id);
}
```

## Database Utilities

### Backup Database
```typescript
function backupDatabase(backupPath: string) {
  db.backup(backupPath)
    .then(() => {
      console.log('Backup completed successfully');
    })
    .catch((error) => {
      console.error('Backup failed:', error);
    });
}
```

### Database Health Check
```typescript
function checkDatabaseHealth() {
  try {
    // Check if database is accessible
    const result = db.prepare('SELECT 1').get();
    
    // Check table integrity
    const integrityCheck = db.prepare('PRAGMA integrity_check').get();
    
    // Get database stats
    const stats = db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM jobs) as total_jobs,
        (SELECT COUNT(*) FROM jobs WHERE is_active = 1) as active_jobs
    `).get();
    
    return {
      status: 'healthy',
      accessible: !!result,
      integrity: integrityCheck.integrity_check === 'ok',
      stats
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message
    };
  }
}
```

## Migration System

### Basic Migration Structure
```typescript
interface Migration {
  version: number;
  name: string;
  up: () => void;
  down: () => void;
}

const migrations: Migration[] = [
  {
    version: 1,
    name: 'create_jobs_table',
    up: () => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS jobs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          department TEXT NOT NULL,
          location TEXT NOT NULL,
          type TEXT NOT NULL,
          level TEXT NOT NULL,
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
    },
    down: () => {
      db.exec('DROP TABLE IF EXISTS jobs');
    }
  },
  {
    version: 2,
    name: 'add_wiki_pages_table',
    up: () => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS wiki_pages (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          author TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    },
    down: () => {
      db.exec('DROP TABLE IF EXISTS wiki_pages');
    }
  }
];
```

### Running Migrations
```typescript
function runMigrations() {
  // Create migrations table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Get current migration version
  const currentVersion = db.prepare('SELECT MAX(version) as version FROM migrations').get()?.version || 0;
  
  // Run pending migrations
  const pendingMigrations = migrations.filter(m => m.version > currentVersion);
  
  for (const migration of pendingMigrations) {
    const transaction = db.transaction(() => {
      migration.up();
      db.prepare('INSERT INTO migrations (version, name) VALUES (?, ?)').run(migration.version, migration.name);
    });
    
    try {
      transaction();
      console.log(`Migration ${migration.version}: ${migration.name} applied successfully`);
    } catch (error) {
      console.error(`Migration ${migration.version}: ${migration.name} failed:`, error);
      throw error;
    }
  }
}
```

## Security Best Practices

### Input Validation
```typescript
function validateJobInput(job: Partial<Job>): string[] {
  const errors: string[] = [];
  
  if (!job.title || job.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (job.title && job.title.length > 255) {
    errors.push('Title must be less than 255 characters');
  }
  
  if (!job.department || job.department.trim().length === 0) {
    errors.push('Department is required');
  }
  
  if (job.type && !['full-time', 'part-time', 'contract'].includes(job.type)) {
    errors.push('Invalid job type');
  }
  
  if (job.level && !['entry', 'mid', 'senior', 'executive'].includes(job.level)) {
    errors.push('Invalid job level');
  }
  
  return errors;
}
```

### SQL Injection Prevention
```typescript
// ✅ Good - Using prepared statements
function getJobsByDepartment(department: string) {
  const stmt = db.prepare('SELECT * FROM jobs WHERE department = ? AND is_active = 1');
  return stmt.all(department);
}

// ❌ Bad - Direct string concatenation (vulnerable to SQL injection)
function getJobsByDepartmentUnsafe(department: string) {
  const query = `SELECT * FROM jobs WHERE department = '${department}' AND is_active = 1`;
  return db.prepare(query).all();
}
```

## Environment Configuration

### Development
```typescript
// config/database.ts
const config = {
  development: {
    database: 'careers_dev.db',
    logging: true,
    migrations: {
      directory: './migrations'
    }
  },
  production: {
    database: 'careers.db',
    logging: false,
    backup: {
      enabled: true,
      schedule: '0 2 * * *' // Daily at 2 AM
    }
  }
};

export default config[process.env.NODE_ENV || 'development'];
```

## Troubleshooting

### Common Issues

1. **Database Locked Error**
   ```typescript
   // Solution: Use WAL mode and handle busy timeout
   db.pragma('journal_mode = WAL');
   db.pragma('busy_timeout = 5000');
   ```

2. **Connection Issues**
   ```typescript
   // Solution: Check file permissions and path
   try {
     const db = new Database(dbPath);
     console.log('Database connected');
   } catch (error) {
     console.error('Connection failed:', error);
     // Check if directory exists
     // Verify file permissions
     // Ensure disk space
   }
   ```

3. **Performance Issues**
   ```typescript
   // Solution: Add appropriate indexes and use transactions
   db.prepare('CREATE INDEX IF NOT EXISTS idx_jobs_search ON jobs(title, department)').run();
   ```

## API Integration

### RESTful Endpoints
The current implementation uses a mock API (`src/lib/api.ts`). For production, replace with actual HTTP endpoints:

```typescript
// api/jobs.ts
export async function createJob(job: Job): Promise<Job> {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create job');
  }
  
  return response.json();
}
```

This documentation provides a comprehensive guide for developers working with the BIOCOM database system. Always ensure to test changes in a development environment before deploying to production.
