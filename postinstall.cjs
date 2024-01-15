const packages = require('./package.json')

console.log('Installed packages: ');

console.log(packages.devDependencies, packages.dependencies)
