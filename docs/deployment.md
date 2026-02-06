# Deployment Guide

This guide covers deploying the Iran Uprising Digital Memorial platform.

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐
│     Vercel      │     │  Privacy VPS    │
│   (Frontend)    │────▶│   (Backend)     │
│   SvelteKit     │     │   Fastify API   │
│   Static PWA    │     │   SQLite+Cipher │
└─────────────────┘     └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │  Tor Hidden     │
                        │  Service        │
                        │  .onion         │
                        └─────────────────┘
```

## Frontend Deployment (Vercel)

### Prerequisites

- Vercel account
- Vercel CLI installed (`pnpm add -g vercel`)

### Steps

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Configure environment variables**
   
   In Vercel dashboard, add:
   - `VITE_API_URL` - Your backend API URL
   - `VITE_ONION_ADDRESS` - Your .onion address (optional)

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Configure custom domain** (optional)
   
   In Vercel dashboard: Settings → Domains → Add

### Vercel Edge Config

Create `vercel.json` for security headers:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "no-referrer" },
        { "key": "Permissions-Policy", "value": "geolocation=(), camera=(), microphone=()" }
      ]
    }
  ]
}
```

## Backend Deployment (Privacy VPS)

### Provider Selection

Recommended privacy-focused providers:
- **OrangeWebsite** (Iceland) - Accepts crypto, strong privacy laws
- **Njalla** (Sweden) - Privacy-focused, anonymous registration
- **1984 Hosting** (Iceland) - Free speech focused

### VPS Setup

1. **Initial server setup**
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs
   
   # Install pnpm
   npm install -g pnpm
   ```

2. **Clone and install**
   ```bash
   git clone https://github.com/flight505/iran-uprising.git
   cd iran-uprising/server
   pnpm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   nano .env
   ```
   
   Set:
   - `DATABASE_KEY` - Generate with `openssl rand -hex 32`
   - `CORS_ORIGINS` - Your Vercel domain
   - `PORT` - Usually 3000

4. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start pnpm --name "memorial-api" -- start
   pm2 save
   pm2 startup
   ```

### Tor Hidden Service Setup

1. **Install Tor**
   ```bash
   apt install -y tor
   ```

2. **Configure hidden service**
   ```bash
   nano /etc/tor/torrc
   ```
   
   Add:
   ```
   HiddenServiceDir /var/lib/tor/iran-memorial/
   HiddenServicePort 80 127.0.0.1:3000
   HiddenServiceVersion 3
   ```

3. **Restart Tor**
   ```bash
   systemctl restart tor
   ```

4. **Get your .onion address**
   ```bash
   cat /var/lib/tor/iran-memorial/hostname
   ```

5. **Update frontend** with the .onion address in Vercel env vars.

### Firewall Configuration

```bash
# Install ufw
apt install -y ufw

# Default deny incoming
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (change port if needed)
ufw allow 22/tcp

# Allow Tor
ufw allow 9001/tcp

# Do NOT expose port 3000 directly - only via Tor

# Enable firewall
ufw enable
```

### Nginx Reverse Proxy (Optional)

If you want direct HTTPS access (in addition to Tor):

```nginx
server {
    listen 443 ssl http2;
    server_name api.your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/api.your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header Referrer-Policy no-referrer;
    
    # Disable logging
    access_log off;
    error_log /dev/null;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Backups

### Encrypted Backup Script

```bash
#!/bin/bash
# backup.sh - Run daily via cron

BACKUP_DIR="/var/backups/memorial"
DATE=$(date +%Y%m%d)
DB_PATH="/path/to/memorial.db"

# Create backup directory
mkdir -p $BACKUP_DIR

# Copy encrypted database
cp $DB_PATH $BACKUP_DIR/memorial-$DATE.db

# Keep only last 7 days
find $BACKUP_DIR -name "*.db" -mtime +7 -delete
```

Add to crontab:
```bash
0 3 * * * /path/to/backup.sh
```

## Monitoring (Privacy-Preserving)

Use minimal monitoring that doesn't log user data:

```bash
# Check if server is running
curl -s http://localhost:3000/api -d '{"action":"ping"}' | jq .success

# Check Tor hidden service
torsocks curl -s http://your-onion.onion/api -d '{"action":"ping"}'
```

## Security Hardening

1. **Disable SSH password auth**
   ```bash
   # In /etc/ssh/sshd_config
   PasswordAuthentication no
   ```

2. **Install fail2ban**
   ```bash
   apt install -y fail2ban
   systemctl enable fail2ban
   ```

3. **Keep system updated**
   ```bash
   # Enable unattended upgrades
   apt install -y unattended-upgrades
   dpkg-reconfigure -plow unattended-upgrades
   ```

4. **Disable unnecessary services**
   ```bash
   systemctl disable apache2
   systemctl disable mysql
   ```

## Troubleshooting

### API not responding
```bash
pm2 status
pm2 logs memorial-api
```

### Tor hidden service not working
```bash
systemctl status tor
journalctl -u tor
cat /var/lib/tor/iran-memorial/hostname
```

### Database issues
```bash
# Check file permissions
ls -la /path/to/memorial.db

# Verify SQLCipher
sqlite3 /path/to/memorial.db "PRAGMA cipher_version;"
```

## Updates

To update the application:

```bash
cd /path/to/iran-uprising
git pull origin main
cd server
pnpm install
pm2 restart memorial-api
```

---

For additional support, please open an issue on GitHub.
