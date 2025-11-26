const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Database connection pool (configure with your .env variables)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'zentryx_tools',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// GET /admin/tools - List all tools
router.get('/tools', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tools ORDER BY id DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /admin/tools/create - Create new tool
router.post('/tools/create', async (req, res) => {
    try {
        const { name, slug, category, subcategory, api_provider, model_name, input_type, output_type, status } = req.body;
        const [result] = await pool.query(
            'INSERT INTO tools (name, slug, category, subcategory, api_provider, model_name, input_type, output_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, slug, category, subcategory, api_provider, model_name, input_type, output_type, status || 1]
        );
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /admin/tools/update/:id - Update tool
router.post('/tools/update/:id', async (req, res) => {
    try {
        const { name, slug, category, subcategory, api_provider, model_name, input_type, output_type, status } = req.body;
        await pool.query(
            'UPDATE tools SET name=?, slug=?, category=?, subcategory=?, api_provider=?, model_name=?, input_type=?, output_type=?, status=? WHERE id=?',
            [name, slug, category, subcategory, api_provider, model_name, input_type, output_type, status, req.params.id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /admin/tools/delete/:id - Delete tool
router.post('/tools/delete/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tools WHERE id=?', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
