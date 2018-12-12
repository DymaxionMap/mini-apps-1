const removeBrackets = str => str.replace('[', '').replace(']', '');

module.exports = (headers, rows) => {
  const headerStr = removeBrackets(JSON.stringify(headers));
  const rowsString = rows.reduce((str, row) => {
    return str + removeBrackets(JSON.stringify(row)) + '\n';
  }, '');
  return `${headerStr}\n${rowsString}`;
}