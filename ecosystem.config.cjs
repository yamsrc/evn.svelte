module.exports = {
  apps: [
    {
      name: 'ui',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 5173,
      },
      autorestart: true,
      max_memory_restart: '1G',
    },
    {
      name: 'ssl',
      script: 'caddy',
      args: 'run',
    },
  ],
}
