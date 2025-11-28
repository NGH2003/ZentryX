# Deployment Instructions for Zentryx Tools

## 1. Build the Project
Run the following command to build the production-ready static files:
```bash
npm run build
```
This will generate a `dist` folder containing the compiled HTML, CSS, and JavaScript files.

## 2. Deploy to Static Hosting
You can deploy the contents of the `dist` folder to any static hosting provider.

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Follow the prompts.

### Netlify
1. Drag and drop the `dist` folder to the Netlify dashboard.
2. Or use Netlify CLI: `netlify deploy --prod`

### GitHub Pages
1. Push the `dist` folder to a `gh-pages` branch.
2. Or use a GitHub Action to build and deploy.

## 3. Database Integration (Optional)
If you are using a database (e.g., Supabase) and want to register the new tools:
1. Open your database SQL editor.
2. Run the SQL statements found in `src/data/new_tools.sql`.
3. Ensure your `tools` table schema matches the INSERT statements or adjust them accordingly.

## 4. Admin Panel
The Admin Panel (`/admin`) allows you to enable/disable tools and edit their details locally.
- Access it via the user profile menu or `/admin`.
- Changes made in the Admin Panel are stored in `localStorage` and will persist on this device.
