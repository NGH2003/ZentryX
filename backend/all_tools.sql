-- Insert ALL 60 AI Tools
INSERT INTO tools (name, slug, category, subcategory, api_provider, model_name, input_type, output_type, status) VALUES
-- TEXT TOOLS
('AI Text Generator', 'ai-text-generator', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('AI Text Summarizer', 'ai-text-summarizer', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('AI Paragraph Rewriter', 'ai-paragraph-rewriter', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Grammar Fixer AI', 'grammar-fixer-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Content Expander AI', 'content-expander-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Email Writer AI', 'email-writer-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Blog Writer AI', 'blog-writer-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('YouTube Script AI', 'youtube-script-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Social Caption AI', 'social-caption-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Ad Copy AI', 'ad-copy-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Product Description AI', 'product-description-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Story Generator AI', 'story-generator-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Idea Generator AI', 'idea-generator-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Keyword Generator AI', 'keyword-generator-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),

-- IMAGE TOOLS
('AI Image Generator', 'ai-image-generator', 'AI Tools', 'Image', 'Replicate', 'stability-ai/sdxl', 'text', 'image', 1),
('Background Remover AI', 'background-remover-ai', 'AI Tools', 'Image', 'Replicate', 'bg-removal', 'image', 'image', 1),
('Photo Upscaler AI', 'photo-upscaler-ai', 'AI Tools', 'Image', 'Replicate', 'nightmareai/real-esrgan', 'image', 'image', 1),
('Face Restore AI', 'face-restore-ai', 'AI Tools', 'Image', 'Replicate', 'tencentarc/gfpgan', 'image', 'image', 1),
('Cartoonizer AI', 'cartoonizer-ai', 'AI Tools', 'Image', 'Replicate', 'cartoonize', 'image', 'image', 1),
('Photo Colorizer AI', 'photo-colorizer-ai', 'AI Tools', 'Image', 'Replicate', 'colorizer', 'image', 'image', 1),
('Sketch Converter AI', 'sketch-converter-ai', 'AI Tools', 'Image', 'Replicate', 'sketch', 'image', 'image', 1),
('Object Remover AI', 'object-remover-ai', 'AI Tools', 'Image', 'Replicate', 'inpainting', 'image', 'image', 1),
('Wallpaper Generator AI', 'wallpaper-generator-ai', 'AI Tools', 'Image', 'Replicate', 'stability-ai/sdxl', 'text', 'image', 1),
('Logo Maker AI', 'logo-maker-ai', 'AI Tools', 'Image', 'Gemini Image', 'gemini-pro-vision', 'text', 'image', 1),
('Transparent PNG AI', 'transparent-png-ai', 'AI Tools', 'Image', 'Replicate', 'bg-removal', 'image', 'image', 1),

-- AUDIO TOOLS
('Voice to Text AI', 'voice-to-text-ai', 'AI Tools', 'Audio', 'Gemini Audio', 'gemini-pro', 'audio', 'text', 1),
('Text to Speech AI', 'text-to-speech-ai', 'AI Tools', 'Audio', 'Gemini TTS', 'gemini-pro', 'text', 'audio', 1),
('Podcast Summarizer AI', 'podcast-summarizer-ai', 'AI Tools', 'Audio', 'Gemini Pro', 'gemini-pro', 'audio', 'text', 1),
('Audio Cleaner AI', 'audio-cleaner-ai', 'AI Tools', 'Audio', 'Replicate', 'audio-cleaner', 'audio', 'audio', 1),
('Beat Generator AI', 'beat-generator-ai', 'AI Tools', 'Audio', 'Replicate', 'music-gen', 'text', 'audio', 1),

-- PDF / DOCUMENT TOOLS
('PDF AI Reader', 'pdf-ai-reader', 'AI Tools', 'PDF', 'Gemini 1.5 Pro', 'gemini-1.5-pro', 'pdf', 'text', 1),
('PDF Summarizer AI', 'pdf-summarizer-ai', 'AI Tools', 'PDF', 'Gemini 1.5 Pro', 'gemini-1.5-pro', 'pdf', 'text', 1),
('PDF Translator AI', 'pdf-translator-ai', 'AI Tools', 'PDF', 'Gemini 1.5 Pro', 'gemini-1.5-pro', 'pdf', 'text', 1),
('Document Extractor AI', 'document-extractor-ai', 'AI Tools', 'PDF', 'Gemini 1.5 Pro', 'gemini-1.5-pro', 'pdf', 'json', 1),
('Resume Builder AI', 'resume-builder-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Cover Letter AI', 'cover-letter-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Form Filler AI', 'form-filler-ai', 'AI Tools', 'Utility', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),

-- CODING TOOLS
('Code Generator AI', 'code-generator-ai', 'AI Tools', 'Code', 'Gemini Code', 'gemini-pro', 'text', 'code', 1),
('Code Explainer AI', 'code-explainer-ai', 'AI Tools', 'Code', 'Gemini Code', 'gemini-pro', 'code', 'text', 1),
('Bug Fix Assistant AI', 'bug-fix-assistant-ai', 'AI Tools', 'Code', 'Gemini Code', 'gemini-pro', 'code', 'code', 1),
('JSON Fixer AI', 'json-fixer-ai', 'AI Tools', 'Code', 'Gemini Pro', 'gemini-pro', 'code', 'code', 1),
('SQL Generator AI', 'sql-generator-ai', 'AI Tools', 'Code', 'Gemini Pro', 'gemini-pro', 'text', 'code', 1),
('API Docs AI', 'api-docs-ai', 'AI Tools', 'Code', 'Gemini Pro', 'gemini-pro', 'code', 'text', 1),
('Regex Generator AI', 'regex-generator-ai', 'AI Tools', 'Code', 'Gemini Pro', 'gemini-pro', 'text', 'code', 1),

-- UTILITY / GENERAL
('OCR Text Extractor AI', 'ocr-text-extractor-ai', 'AI Tools', 'Utility', 'Gemini Vision', 'gemini-pro-vision', 'image', 'text', 1),
('Handwriting Reader AI', 'handwriting-reader-ai', 'AI Tools', 'Utility', 'Gemini Vision', 'gemini-pro-vision', 'image', 'text', 1),
('Meme Generator AI', 'meme-generator-ai', 'AI Tools', 'Image', 'Gemini Pro', 'gemini-pro', 'text', 'image', 1),
('QR Designer AI', 'qr-designer-ai', 'AI Tools', 'Utility', 'Gemini Pro', 'gemini-pro', 'text', 'image', 1),
('Webpage Summarizer AI', 'webpage-summarizer-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'url', 'text', 1),
('Zentryx Chatbot AI', 'zentryx-chatbot-ai', 'AI Tools', 'Chat', 'Gemini Pro', 'gemini-pro', 'chat', 'chat', 1),
('Email Cleaner AI', 'email-cleaner-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Paragraph Reader AI', 'paragraph-reader-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'audio', 1),
('Data Cleaner AI', 'data-cleaner-ai', 'AI Tools', 'Utility', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),

-- ADVANCED
('Business Plan AI', 'business-plan-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Pitch Deck AI', 'pitch-deck-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Social Post Designer AI', 'social-post-designer-ai', 'AI Tools', 'Mixed', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Video Planner AI', 'video-planner-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Interview Prep AI', 'interview-prep-ai', 'AI Tools', 'Text', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Personality Fun AI', 'personality-fun-ai', 'AI Tools', 'Fun', 'Gemini Pro', 'gemini-pro', 'text', 'text', 1),
('Chat with File AI', 'chat-with-file-ai', 'AI Tools', 'Document', 'Gemini 1.5 Pro', 'gemini-1.5-pro', 'file', 'chat', 1);
