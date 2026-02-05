// Database schema for Iran Uprising Memorial
// Using SQLite with SQLCipher for encryption at rest

export const SCHEMA = `
-- Memorials table
CREATE TABLE IF NOT EXISTS memorials (
  hash TEXT PRIMARY KEY,
  photo_hash TEXT NOT NULL,
  name_persian TEXT NOT NULL,
  name_latin TEXT,
  age INTEGER,
  date_death TEXT NOT NULL,
  location TEXT NOT NULL,
  circumstances TEXT,
  candle_count INTEGER DEFAULT 0,
  flower_count INTEGER DEFAULT 0,
  created_day TEXT NOT NULL,
  updated_day TEXT NOT NULL
);

-- Index for search
CREATE INDEX IF NOT EXISTS idx_memorials_name_persian ON memorials(name_persian);
CREATE INDEX IF NOT EXISTS idx_memorials_name_latin ON memorials(name_latin);
CREATE INDEX IF NOT EXISTS idx_memorials_location ON memorials(location);
CREATE INDEX IF NOT EXISTS idx_memorials_date_death ON memorials(date_death);

-- Threads table
CREATE TABLE IF NOT EXISTS threads (
  hash TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('open', 'private', 'memorial')),
  memorial_hash TEXT,
  title TEXT,
  message_count INTEGER DEFAULT 0,
  created_day TEXT NOT NULL,
  expires_at TEXT,
  FOREIGN KEY (memorial_hash) REFERENCES memorials(hash)
);

CREATE INDEX IF NOT EXISTS idx_threads_type ON threads(type);
CREATE INDEX IF NOT EXISTS idx_threads_memorial ON threads(memorial_hash);

-- Messages table (encrypted content stored as blob)
CREATE TABLE IF NOT EXISTS messages (
  hash TEXT PRIMARY KEY,
  thread_hash TEXT NOT NULL,
  ciphertext TEXT NOT NULL,
  timestamp_day TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  FOREIGN KEY (thread_hash) REFERENCES threads(hash)
);

CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_hash);
CREATE INDEX IF NOT EXISTS idx_messages_expires ON messages(expires_at);

-- Content flags (anonymous reporting)
CREATE TABLE IF NOT EXISTS flags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_hash TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK(content_type IN ('memorial', 'thread', 'message')),
  reason TEXT NOT NULL,
  created_day TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_flags_content ON flags(content_hash);

-- Photos stored separately (referenced by hash)
CREATE TABLE IF NOT EXISTS photos (
  hash TEXT PRIMARY KEY,
  data BLOB NOT NULL,
  mime_type TEXT NOT NULL,
  created_day TEXT NOT NULL
);

-- Aggregate statistics (pre-computed for privacy)
CREATE TABLE IF NOT EXISTS stats (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_day TEXT NOT NULL
);
`;

// Migration scripts for future schema changes
export const MIGRATIONS: Record<number, string> = {
  1: SCHEMA,
  // Future migrations go here
  // 2: 'ALTER TABLE memorials ADD COLUMN ...',
};
