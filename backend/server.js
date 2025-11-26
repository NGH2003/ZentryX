const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const toolConfigs = require('./toolConfigs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const Replicate = require('replicate');

// Initialize Replicate
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || 'mock-token',
});

// Tool #15: AI Image Generator Endpoint
app.post('/api/ai/ai-image-generator', async (req, res) => {
    try {
        const { prompt, aspectRatio, style } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, error: 'Prompt is required' });
        }

        // If no API token, return mock image for demo
        if (!process.env.REPLICATE_API_TOKEN) {
            console.log('Using Mock Image Generation (No API Token)');
            await new Promise(resolve => setTimeout(resolve, 2000));
            return res.json({
                success: true,
                output: "https://replicate.delivery/pbxt/Jt7yF9e0j54eFq3q8x9y0z1A2B3C4D5E6F7G8H9I0J1K2L3M/out-0.png" // Sample placeholder
            });
        }

        // Map aspect ratio to width/height
        let width = 1024;
        let height = 1024;
        if (aspectRatio === '16:9') { width = 1024; height = 576; }
        else if (aspectRatio === '9:16') { width = 576; height = 1024; }

        // Enhance prompt with style
        let finalPrompt = prompt;
        if (style && style !== 'photorealistic') {
            finalPrompt += `, ${style} style, high quality, detailed`;
        }

        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    prompt: finalPrompt,
                    width: width,
                    height: height,
                    refine: "expert_ensemble_refiner"
                }
            }
        );

        // Replicate returns an array of image URLs
        return res.json({ success: true, output: output[0] });

    } catch (error) {
        console.error('Error in AI Image Generator:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal Server Error'
        });
    }
});

// Dynamic AI Tool Endpoint
app.post('/api/ai/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const { text, ...options } = req.body;

        // Special handling for Summarizer (Tool #2)
        if (slug === 'ai-text-summarizer') {
            const { length, format } = options;
            let prompt = `Summarize the following text. `;
            if (length === 'short') prompt += `Keep it very concise. `;
            else if (length === 'long') prompt += `Make it detailed. `;
            if (format === 'bullet') prompt += `Format as bullet points. `;
            prompt += `\n\nText: "${text}"`;

            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return res.json({ success: true, output: response.text() });
        }

        const config = toolConfigs[slug];

        if (!config) {
            return res.status(404).json({ success: false, error: 'Tool not found' });
        }

        if (!text) {
            return res.status(400).json({ success: false, error: 'Input text is required' });
        }

        // Generic Handler for Text/Code Tools
        const prompt = `${config.systemPrompt}\n\nUser Input:\n"${text}"`;

        const model = genAI.getGenerativeModel({ model: config.model });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = response.text();

        return res.json({ success: true, output });

    } catch (error) {
        console.error(`Error in tool ${req.params.slug}:`, error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal Server Error'
        });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('Zentryx AI Tools Backend is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
