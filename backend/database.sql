-- 1. Create Table
CREATE TABLE IF NOT EXISTS tools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  api_provider VARCHAR(100),
  model_name VARCHAR(255),
  input_type VARCHAR(50),
  output_type VARCHAR(50),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert Tool #2: AI Text Summarizer
INSERT INTO tools (name, slug, category, subcategory, api_provider, model_name, input_type, output_type, status)
VALUES (
  'AI Text Summarizer', 
  'ai-text-summarizer', 
  'AI Tools', 
  'Text', 
  'Gemini Pro', 
  'gemini-pro', 
  'text', 
  'text', 
  1
);
