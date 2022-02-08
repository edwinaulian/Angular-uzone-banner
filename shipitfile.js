module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)
    shipit.initConfig({
      default: {
        deployTo: '~/sources/uzone-app',
        repositoryUrl: 'git@git.wgs.co.id:telkom/uzone-travel-frontend.git',
      },
      production: {
        servers: 'hoobex-dev@103.10.61.115',
        branch: 'prod'
      },
      staging: {
        servers: 'hoobex-dev@103.10.61.115',
        branch: 'master'
      },
      development: {
        servers: 'hoobex-dev@103.10.61.115',
        branch: 'dev'
      },
    });
  
    shipit.task('chmodcurrent', async () => {
      await shipit.remote('chmod -R 755 /home/hoobex-dev/sources/uzone-app/current')
      await shipit.local('echo "chmodcurrent"')
    })

  }