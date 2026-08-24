module.exports = {
  apps: [
    {
      name: 'almnaber-website',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/almnaber-website',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      out_file: '/var/log/pm2/almnaber-website-out.log',
      error_file: '/var/log/pm2/almnaber-website-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
};
