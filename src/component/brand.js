const Brand = (data) => {
  const { strings } = data;
  let html = `<table>`;

  if (data.logoURL) {
    html += `
      <tr>
        <td><img src="${data.logoURL}"></td>
      </tr>
    `;
  }
  if (strings.title) {
    html += `
      <tr>
        <td><h1>${strings.title}</h1></td>
      </tr>
    `;
  }
  if (strings.message) {
    html += `
      <tr>
        <td><p>${strings.message}</p></td>
      </tr>
    `;
  }

  html += `</table>`;
  return html;
}

export default Brand;
