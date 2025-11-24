import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: string;
    date: string;
    tags: string[];
    published: boolean;
}

interface BlogContextType {
    blogPosts: BlogPost[];
    setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
    addPost: (post: Omit<BlogPost, 'id' | 'date' | 'published'>) => void;
    updatePost: (id: number, post: Partial<BlogPost>) => void;
    deletePost: (id: number) => void;
    getPostBySlug: (slug: string) => BlogPost | undefined;
    resetToDefaults: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};

const initialPosts: BlogPost[] = [
    {
        id: 1,
        title: "Getting Started with Web Tools",
        slug: "getting-started",
        excerpt: "A comprehensive guide to using our platform effectively and maximizing your productivity with our suite of tools.",
        content: `Welcome to our comprehensive web tools platform! Whether you're a developer, designer, or content creator, our collection of tools is designed to streamline your workflow and boost productivity.

## What We Offer

Our platform provides a wide range of tools including:
- **Text Tools**: Format, convert, and manipulate text with ease
- **Image Tools**: Compress, resize, and optimize images
- **Developer Tools**: JSON formatters, code beautifiers, and more
- **PDF Tools**: Merge, split, and compress PDF files

## Getting Started

1. Browse our tools catalog
2. Select the tool you need
3. Upload your files or input your data
4. Get instant results!

All tools are free to use and require no registration. We prioritize your privacy - files are processed locally in your browser whenever possible.

## Pro Tips

- Bookmark your frequently used tools for quick access
- Use keyboard shortcuts for faster navigation
- Check out our categories page to discover new tools

Happy tooling!`,
        coverImage: "https://images.unsplash.com/photo-1499750310159-525446a916aa?w=800&q=80",
        author: "Admin Team",
        date: "2024-11-20",
        tags: ["Guide", "Tutorial", "Getting Started"],
        published: true
    },
    {
        id: 2,
        title: "10 Productivity Tips for Developers",
        slug: "productivity-tips-developers",
        excerpt: "Boost your development workflow with these essential productivity tips and tool recommendations.",
        content: `As developers, we're always looking for ways to work smarter, not harder. Here are 10 proven tips to supercharge your productivity.

## 1. Use Code Formatters
Automated code formatting saves time and ensures consistency across your codebase.

## 2. Master Your IDE
Learn keyboard shortcuts and customize your development environment.

## 3. Leverage Online Tools
Use web-based tools for quick tasks like JSON formatting, base64 encoding, and more.

## 4. Automate Repetitive Tasks
Write scripts or use tools to handle repetitive operations.

## 5. Take Regular Breaks
The Pomodoro Technique can help maintain focus and prevent burnout.

## 6. Keep Learning
Stay updated with the latest technologies and best practices.

## 7. Use Version Control
Git is essential for tracking changes and collaborating with teams.

## 8. Document Your Code
Good documentation saves time for you and your team in the long run.

## 9. Test Early and Often
Catch bugs early with comprehensive testing strategies.

## 10. Optimize Your Workflow
Regularly review and refine your development process.

Implement these tips gradually and watch your productivity soar!`,
        coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        author: "Sarah Johnson",
        date: "2024-11-18",
        tags: ["Productivity", "Development", "Tips"],
        published: true
    },
    {
        id: 3,
        title: "The Ultimate Guide to Image Optimization",
        slug: "image-optimization-guide",
        excerpt: "Learn how to optimize images for the web without sacrificing quality. Improve your site's performance today!",
        content: `Image optimization is crucial for web performance. Large, unoptimized images can significantly slow down your website, affecting user experience and SEO rankings.

## Why Image Optimization Matters

- **Faster Load Times**: Optimized images load quicker, improving user experience
- **Better SEO**: Page speed is a ranking factor for search engines
- **Reduced Bandwidth**: Save on hosting costs and data usage
- **Mobile Performance**: Essential for users on slower connections

## Best Practices

### 1. Choose the Right Format
- **JPEG**: Best for photographs and complex images
- **PNG**: Ideal for images with transparency
- **WebP**: Modern format with superior compression
- **SVG**: Perfect for logos and icons

### 2. Compress Images
Use tools to reduce file size while maintaining visual quality. Our image compression tool can reduce file sizes by up to 80%!

### 3. Use Appropriate Dimensions
Don't upload 4000px images when you only need 800px. Resize images to their display size.

### 4. Implement Lazy Loading
Load images only when they're about to enter the viewport.

### 5. Use Responsive Images
Serve different image sizes based on device screen size.

## Tools We Recommend

Our platform offers several image optimization tools:
- Image Compressor
- Image Resizer
- Format Converter
- Bulk Image Optimizer

Start optimizing your images today and see the difference in your website's performance!`,
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        author: "Mike Chen",
        date: "2024-11-15",
        tags: ["Images", "Optimization", "Web Performance"],
        published: true
    },
    {
        id: 4,
        title: "JSON: A Developer's Best Friend",
        slug: "json-developers-guide",
        excerpt: "Everything you need to know about JSON - from basics to advanced techniques for modern web development.",
        content: `JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web. Let's explore why it's so popular and how to use it effectively.

## What is JSON?

JSON is a lightweight data format that's easy for humans to read and write, and easy for machines to parse and generate.

## Why Developers Love JSON

1. **Simple Syntax**: Easy to understand and work with
2. **Language Independent**: Supported by virtually all programming languages
3. **Lightweight**: Minimal overhead compared to XML
4. **Native JavaScript Support**: Works seamlessly with JavaScript

## Common Use Cases

- **API Responses**: Most REST APIs return data in JSON format
- **Configuration Files**: package.json, tsconfig.json, etc.
- **Data Storage**: NoSQL databases like MongoDB use JSON-like documents
- **Data Exchange**: Perfect for client-server communication

## Working with JSON

### Parsing JSON
\`\`\`javascript
const jsonString = '{"name": "John", "age": 30}';
const obj = JSON.parse(jsonString);
\`\`\`

### Stringifying Objects
\`\`\`javascript
const obj = { name: "John", age: 30 };
const jsonString = JSON.stringify(obj);
\`\`\`

## Best Practices

1. **Validate JSON**: Always validate JSON data before processing
2. **Handle Errors**: Use try-catch blocks when parsing JSON
3. **Pretty Print**: Format JSON for better readability during development
4. **Minify for Production**: Remove whitespace to reduce file size

## Our JSON Tools

We offer several tools to work with JSON:
- JSON Formatter & Validator
- JSON Minifier
- JSON to CSV Converter
- JSON Diff Tool

Master JSON and level up your development skills!`,
        coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
        author: "Emily Rodriguez",
        date: "2024-11-12",
        tags: ["JSON", "Development", "Tutorial"],
        published: true
    },
    {
        id: 5,
        title: "PDF Tools Every Professional Needs",
        slug: "essential-pdf-tools",
        excerpt: "Discover the must-have PDF tools that will transform how you work with documents in your daily workflow.",
        content: `PDFs are everywhere in the professional world. Having the right tools to work with them can save hours of time and frustration.

## Essential PDF Operations

### 1. Merge PDFs
Combine multiple PDF files into a single document. Perfect for:
- Consolidating reports
- Creating comprehensive documentation
- Organizing related files

### 2. Split PDFs
Extract specific pages or split large PDFs into smaller files:
- Share only relevant sections
- Reduce file sizes
- Organize content better

### 3. Compress PDFs
Reduce file size without significant quality loss:
- Email large documents easily
- Save storage space
- Faster uploads and downloads

### 4. Convert PDFs
Transform PDFs to other formats and vice versa:
- PDF to Word for editing
- Images to PDF for archiving
- Excel to PDF for sharing

## Security Features

- **Password Protection**: Secure sensitive documents
- **Watermarks**: Add branding or confidentiality marks
- **Redaction**: Remove sensitive information permanently

## Why Use Online PDF Tools?

1. **No Installation Required**: Work from any device
2. **Cross-Platform**: Works on Windows, Mac, and Linux
3. **Always Updated**: Get the latest features automatically
4. **Privacy Focused**: Files processed securely

## Our PDF Tool Suite

We offer a comprehensive set of PDF tools:
- PDF Merger
- PDF Splitter
- PDF Compressor
- PDF Converter
- PDF Password Protector

All tools are free to use and process files securely in your browser.

Transform your PDF workflow today!`,
        coverImage: "https://images.unsplash.com/photo-1554224311-beee460ae6ba?w=800&q=80",
        author: "David Park",
        date: "2024-11-10",
        tags: ["PDF", "Productivity", "Tools"],
        published: true
    },
    {
        id: 6,
        title: "Web Security Best Practices for 2024",
        slug: "web-security-best-practices-2024",
        excerpt: "Stay ahead of cyber threats with these essential web security practices every developer should implement.",
        content: `Web security is more important than ever. Here are the essential practices you need to implement in 2024.

## Authentication & Authorization

### Use Strong Password Policies
- Minimum 12 characters
- Combination of letters, numbers, and symbols
- Regular password rotation
- Multi-factor authentication (MFA)

### Implement OAuth 2.0
Modern authentication standard for secure API access.

## Data Protection

### HTTPS Everywhere
Always use HTTPS to encrypt data in transit. It's no longer optional.

### Encrypt Sensitive Data
Use strong encryption algorithms for data at rest:
- AES-256 for file encryption
- bcrypt or Argon2 for password hashing

### Input Validation
Never trust user input. Always validate and sanitize:
- SQL injection prevention
- XSS attack mitigation
- CSRF protection

## API Security

1. **Rate Limiting**: Prevent abuse and DDoS attacks
2. **API Keys**: Authenticate API requests
3. **CORS Configuration**: Control cross-origin requests
4. **Request Validation**: Validate all API inputs

## Regular Security Audits

- **Dependency Scanning**: Check for vulnerable packages
- **Penetration Testing**: Regular security assessments
- **Code Reviews**: Security-focused code reviews
- **Security Headers**: Implement proper HTTP security headers

## Our Security Tools

We provide tools to help with security:
- Password Generator
- Hash Generator
- Base64 Encoder/Decoder
- JWT Debugger

Stay secure, stay vigilant!`,
        coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        author: "Alex Thompson",
        date: "2024-11-08",
        tags: ["Security", "Web Development", "Best Practices"],
        published: true
    },
    {
        id: 7,
        title: "Mastering Regular Expressions",
        slug: "mastering-regular-expressions",
        excerpt: "Unlock the power of regex with this comprehensive guide. From basics to advanced patterns.",
        content: `Regular expressions (regex) are powerful tools for pattern matching and text manipulation. Let's master them together!

## What are Regular Expressions?

Regex is a sequence of characters that define a search pattern. They're used for:
- Text validation
- Search and replace operations
- Data extraction
- Input sanitization

## Basic Patterns

### Literal Characters
\`/hello/\` matches the exact string "hello"

### Character Classes
- \`[abc]\`: Matches a, b, or c
- \`[0-9]\`: Matches any digit
- \`[a-z]\`: Matches any lowercase letter

### Metacharacters
- \`.\`: Any character except newline
- \`\\d\`: Any digit
- \`\\w\`: Any word character
- \`\\s\`: Any whitespace

## Quantifiers

- \`*\`: 0 or more times
- \`+\`: 1 or more times
- \`?\`: 0 or 1 time
- \`{n}\`: Exactly n times
- \`{n,m}\`: Between n and m times

## Common Use Cases

### Email Validation
\`\`\`regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
\`\`\`

### Phone Number
\`\`\`regex
^\\+?[1-9]\\d{1,14}$
\`\`\`

### URL Validation
\`\`\`regex
^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b
\`\`\`

## Tips for Writing Better Regex

1. **Start Simple**: Build complex patterns gradually
2. **Test Thoroughly**: Use regex testers
3. **Comment Your Patterns**: Use verbose mode for complex regex
4. **Consider Performance**: Avoid catastrophic backtracking
5. **Use Non-Capturing Groups**: When you don't need to extract

## Our Regex Tools

- Regex Tester & Debugger
- Regex Pattern Library
- Regex Cheat Sheet

Master regex and become a text manipulation wizard!`,
        coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        author: "Lisa Wang",
        date: "2024-11-05",
        tags: ["Regex", "Programming", "Tutorial"],
        published: true
    }
];

export const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
        const saved = localStorage.getItem('blogPosts');
        return saved ? JSON.parse(saved) : initialPosts;
    });

    useEffect(() => {
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    }, [blogPosts]);

    const addPost = (postData: Omit<BlogPost, 'id' | 'date' | 'published'>) => {
        const newPost: BlogPost = {
            id: Date.now(),
            ...postData,
            date: new Date().toISOString().split('T')[0],
            published: false,
        };
        setBlogPosts(prev => [...prev, newPost]);
    };

    const updatePost = (id: number, postData: Partial<BlogPost>) => {
        setBlogPosts(prev => prev.map(post => post.id === id ? { ...post, ...postData } : post));
    };

    const deletePost = (id: number) => {
        setBlogPosts(prev => prev.filter(post => post.id !== id));
    };

    const getPostBySlug = (slug: string) => {
        return blogPosts.find(post => post.slug === slug);
    };

    const resetToDefaults = () => {
        setBlogPosts(initialPosts);
        localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    };

    return (
        <BlogContext.Provider value={{ blogPosts, setBlogPosts, addPost, updatePost, deletePost, getPostBySlug, resetToDefaults }}>
            {children}
        </BlogContext.Provider>
    );
};
