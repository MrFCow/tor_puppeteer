module.exports = {
  apps : [
  {
    name: 'tor_puppeteer',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: false,
    max_memory_restart: '100M',
    watch: false,
    ignore_watch: ['*.log'],
    max_memory_restart: '1G',
    env_dev: {
			NODE_ENV: 'development',
			
		},
		env: {
      NODE_ENV: 'production',
    },
  },
],
};
