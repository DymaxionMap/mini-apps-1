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

const renderForm = () => {

};


const renderCsvReport = (headers, rows) => {
  return renderTable();
};

module.exports = renderCsvReport;