export default function nunjucksFunctionLoader(source) {

  if ( this.cacheable ) {
    this.cacheable();
  }

  const retModule = `
  module.exports = function nunjucksFunctionWrap(templateParams) {
    return ${JSON.stringify(source)};
  }
  `;

  return retModule;
}
