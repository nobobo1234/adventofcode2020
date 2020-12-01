const { generateTemplateFiles } = require('generate-template-files');
 
generateTemplateFiles([
  {
    option: 'Generate new day',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './tools/templates/day/',
    },
    stringReplacers: [{ question: 'Insert your day', slot: '__day__' }],
    output: {
      path: './day__day__(lowerCase)',
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: true,
    },
  }
]);