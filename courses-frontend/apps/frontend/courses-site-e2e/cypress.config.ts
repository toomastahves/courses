import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run courses-site:serve',
        production: 'nx run courses-site:preview',
      },
      ciWebServerCommand: 'nx run courses-site:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
