-- SQL INSERT statements for new tools
-- Table Schema assumed: tools (id, name, slug, category, subcategory, input_type, output_type)

INSERT INTO tools (id, name, slug, category, subcategory, input_type, output_type) VALUES
(53, 'Fake Data Generator', 'fake-data-generator', 'Generators', 'Data', 'None', 'JSON/Text'),
(54, 'Text to Handwriting', 'text-to-handwriting', 'Generators', 'Image', 'Text', 'Image'),
(55, 'Wheel Spinner', 'wheel-spinner', 'Utilities', 'Random', 'Text List', 'Animation'),
(56, 'Code Minifier', 'code-minifier', 'Formatters', 'Code', 'Code', 'Code'),
(57, 'Image Filters', 'image-filters', 'Design', 'Image Editing', 'Image', 'Image'),
(58, 'Image to Sketch', 'image-to-sketch', 'Design', 'Image Editing', 'Image', 'Image'),
(59, 'Image Watermark', 'image-watermark', 'Design', 'Image Editing', 'Image + Text', 'Image'),
(60, 'Rounded Corners', 'rounded-corners', 'Design', 'Image Editing', 'Image', 'Image'),
(61, 'Image Crop & Resize', 'image-crop-resize', 'Design', 'Image Editing', 'Image', 'Image'),
(62, 'Password Strength Tester', 'password-strength-tester', 'Security', 'Password', 'Text', 'Analysis'),
(63, 'Regex Tester', 'regex-tester', 'Utilities', 'Developer', 'Regex + Text', 'Highlight'),
(64, 'Color Palette Extractor', 'color-palette-extractor', 'Design', 'Color', 'Image', 'Colors'),
(65, 'Color Shades Generator', 'color-shades-generator', 'Design', 'Color', 'Color', 'Colors'),
(66, 'CSV Viewer', 'csv-viewer', 'Utilities', 'Data', 'CSV File', 'Table'),
(67, 'Text Column Splitter', 'text-column-splitter', 'Text Tools', 'Data', 'Text', 'Text Columns'),
(68, 'Notes App', 'notes-app', 'Utilities', 'Productivity', 'Text', 'Storage'),
(69, 'To-Do App', 'todo-app', 'Utilities', 'Productivity', 'Text', 'Storage');
