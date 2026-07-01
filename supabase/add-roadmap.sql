CREATE TABLE IF NOT EXISTS roadmap (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'ongoing', 'completed')),
  icon TEXT DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE roadmap ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public all roadmap" ON roadmap FOR ALL USING (true) WITH CHECK (true);
