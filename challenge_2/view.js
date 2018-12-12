const renderHtml = (table, form) => (
  `<!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="styles.css">
      <title>CSV Report Generator</title>
    </head>
    <body>
      ${table}
      ${form}
    </body>
  </html>
  `
);

const renderHeader = (headers) => {
  return headers.reduce((html, header) => html + `<th>${header}</th>`, '');
};

const renderRow = (row) => {
  return row.reduce((rowHtml, item) => rowHtml + `<td>${item}</td>`, '');
};

const renderRows = (rows) => {
  return rows.reduce((tableHtml, row) => {
    return tableHtml + `<tr>${renderRow(row)}</tr>`;
  }, '');
};

const renderTable = (headers, rows) => {
  return (
    `<table>
      <thead>
        ${renderHeader(headers)}
      </thead>
      <tbody>
        ${renderRows(rows)}
      </tbody>
    </table>`
  );
};

const renderForm = () => (
  `<form action="/report" method="post">
    <label for="reportText">Enter JSON Report:</label>
    <textarea type="textarea" name="reportText"></textarea>
    <button type="submit">Submit Report</button>
  </form>`
);


const renderCsvReport = (headers, rows) => {
  return renderHtml(renderTable(headers, rows), renderForm());
};

module.exports = renderCsvReport;