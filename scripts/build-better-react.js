/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const path = require('path');
const bannerReact = require('./banner.js')('React');

module.exports = async (format, outputDir = 'package') => {
  // Babel
  const ex = `cross-env MODULES=${format} npx babel --config-file ./babel.config.better-react.js src/better-react --out-dir ${outputDir}/better-react/${format} --extensions ".ts,.tsx"`;
  await exec(ex);
  // Fix import paths
  let fileContent = await fs.readFile(
    `./${outputDir}/better-react/${format}/konsta-better-react.js`,
    'utf-8'
  );
  fileContent = fileContent.replace(/\.jsx/g, '.js');
  fileContent = `${bannerReact}\n${fileContent}`;
  await fs.writeFile(
    `./${outputDir}/better-react/${format}/konsta-better-react.js`,
    fileContent
  );

  // Fix global shared paths
  const dirsWithShared = [
    `better-react/${format}/components`,
    `better-react/${format}/shared`,
  ];
  dirsWithShared.forEach((dirPath) => {
    const dirFullPath = path.resolve(__dirname, `../${outputDir}`, dirPath);
    fs.readdirSync(dirFullPath).forEach((f) => {
      if (fs.lstatSync(path.resolve(dirFullPath, f)).isDirectory()) return;
      if (f.includes('package.json')) return;
      // eslint-disable-next-line
      let fileContent = fs.readFileSync(path.resolve(dirFullPath, f), 'utf-8');
      fileContent = fileContent.replace(
        /..\/..\/shared\//g,
        `../../../shared/${format}/`
      );
      fs.writeFileSync(path.resolve(dirFullPath, f), fileContent);
    });
  });

  // .jsx -> .js
  fs.readdirSync(`./${outputDir}/better-react/${format}/components/`)
    .filter(
      (file) =>
        !fs
          .lstatSync(`./${outputDir}/better-react/${format}/components/${file}`)
          .isDirectory()
    )
    .forEach((file) => {
      const filePath = `./${outputDir}/better-react/${format}/components/${file}`;
      const content = fs
        .readFileSync(filePath, 'utf-8')
        .replace(/\.jsx/g, '.js');
      fs.writeFileSync(filePath, content);
    });
};
