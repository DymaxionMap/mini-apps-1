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

const renderTable = (headers, rows) => {
  return (
    `<table>
      <thead>
        <th>
          Hello
        </th>
      </thead>
      <tbody>
        <tr>
          <td>
            World
          </td>
        </tr>
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
  return renderHtml(renderTable(), renderForm());
};

module.exports = renderCsvReport;