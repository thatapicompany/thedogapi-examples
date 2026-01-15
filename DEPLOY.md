# Deploying to Netlify

This project is deployed to Netlify and accessible at `examples.thedogapi.com`.

## Initial Deployment

### 1. Connect to Netlify

**Option A: Using Netlify CLI (Recommended)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy from the project root
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: thedogapi-examples (or leave blank for auto-generated)
```

**Option B: Using Netlify Dashboard**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect your Git repository (GitHub, GitLab, etc.)
4. Configure build settings:
   - **Build command:** Leave empty
   - **Publish directory:** `.` (root)
   - **Branch:** `main` or `master`

### 2. Configure Custom Domain

**In Netlify Dashboard:**
1. Go to Site Settings > Domain Management
2. Click "Add custom domain"
3. Enter: `examples.thedogapi.com`
4. Netlify will provide DNS configuration instructions

**DNS Records to Add in Cloudflare:**

You have two options:

**Option A: CNAME (Recommended)**
```
Type: CNAME
Name: examples
Target: [your-site-name].netlify.app
Proxy status: DNS only (grey cloud)
TTL: Auto
```

**Option B: A Record + CNAME**
```
Type: A
Name: examples
IPv4: 75.2.60.5
Proxy status: DNS only

Type: CNAME  
Name: www.examples (if you want www)
Target: examples.thedogapi.com
```

> **Important:** Make sure Cloudflare proxy is turned OFF (grey cloud) for Netlify to manage SSL certificates automatically.

### 3. Enable HTTPS

Netlify will automatically provision a Let's Encrypt SSL certificate for your custom domain. This usually takes a few minutes.

1. Go to Site Settings > Domain Management > HTTPS
2. Verify SSL/TLS certificate is active
3. Enable "Force HTTPS" to redirect all HTTP traffic

## Embedding Examples

Once deployed, you can embed the examples in documentation using iframes:

```html
<!-- Image Upload Example -->
<iframe 
  src="https://examples.thedogapi.com/image-upload/" 
  width="600" 
  height="800"
  frameborder="0"
  style="border: 1px solid #ccc; border-radius: 8px;"
></iframe>

<!-- Breed Search Example -->
<iframe 
  src="https://examples.thedogapi.com/breed-search/" 
  width="900" 
  height="700"
  frameborder="0"
></iframe>

<!-- Voting Example -->
<iframe 
  src="https://examples.thedogapi.com/voting/" 
  width="600" 
  height="650"
  frameborder="0"
></iframe>

<!-- Sync Upload Example -->
<iframe 
  src="https://examples.thedogapi.com/image-upload-sync/" 
  width="600" 
  height="800"
  frameborder="0"
></iframe>
```

## Continuous Deployment

Once connected to Git, Netlify will automatically deploy:
- **Every push to main branch** triggers a new deployment
- **Pull requests** get deploy previews at unique URLs
- **Rollback** to any previous deployment with one click

## Local Testing

To test the site locally before deploying:

```bash
# Serve with Python
python -m http.server 8000

# Or with Node.js
npx serve .

# Or with Netlify CLI (tests headers and redirects)
netlify dev
```

Visit `http://localhost:8000` in your browser.

## Deploy Previews

Every branch and PR gets a unique preview URL:
```
https://deploy-preview-[pr-number]--thedogapi-examples.netlify.app
```

## Manual Deploy

To manually deploy without Git:

```bash
# From project root
netlify deploy --prod

# Or drag and drop the folder in Netlify Dashboard
```

## Monitoring

- **Analytics:** Enable in Netlify Dashboard under Analytics
- **Deploy logs:** Available in Deploys tab
- **Function logs:** N/A (no serverless functions)

## Troubleshooting

### Custom domain not working
1. Verify DNS records in Cloudflare are correct
2. Ensure Cloudflare proxy is OFF (grey cloud)
3. Wait up to 24 hours for DNS propagation
4. Check Netlify DNS status in Domain Management

### Embedding issues
1. Check browser console for CSP errors
2. Verify `netlify.toml` headers are deployed
3. Try opening example URL directly first

### SSL certificate issues
1. Ensure domain is verified in Netlify
2. Wait up to 24 hours for certificate provisioning
3. Check DNS is pointing correctly (no Cloudflare proxy)
