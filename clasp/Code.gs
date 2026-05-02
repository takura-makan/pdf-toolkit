function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('PDF Toolkit')
    .setFaviconUrl('https://drive.google.com/uc?export=view&id=1Xknx1VcASRKP9zblYqrwOsZ-gMMXubNg&.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}