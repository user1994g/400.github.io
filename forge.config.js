const path = require('node:path');

const iconPath = path.join(__dirname, 'desktop', 'assets', 'icon');

module.exports = {
  packagerConfig: {
    appBundleId: 'com.netvistastudio.desktop',
    appCategoryType: 'public.app-category.entertainment',
    appCopyright: `Copyright © ${new Date().getFullYear()} netvistastudio`,
    asar: true,
    executableName: 'netvistastudio',
    icon: iconPath,
    ignore: [
      /^\/\.github($|\/)/,
      /^\/\.gitignore$/,
      /^\/out($|\/)/,
      /^\/desktop\/assets\/icon-source\.png$/
    ]
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        name: 'netvistastudio',
        setupExe: 'netvistastudio-windows.exe',
        setupIcon: `${iconPath}.ico`,
        iconUrl: 'https://netvistastudio.com/desktop/assets/icon.ico',
        noMsi: true
      }
    }
  ]
};
