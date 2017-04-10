let layout = {
  "HEADER": {
    "BRAND": {
      "LOGO": true,
      "TITLE": true,
      "MESSAGE": true
    },
    "DETAILS": true
  },
  "CONTENT": {
    "LINEITEMS": true,
    "LINETAXES": true,
    "TOTALS": true,
    "WALLET": true,
    "DOWNLOAD": true
  },
  "FOOTER": {
    "STORE": {
      "CONTACT": true,
      "ADDRESS": true,
      "MESSAGE": true
    }
  }
};

let divider = `
  <table class="divider-wrapper">
      <tr>
        <td class="divider-spacer">
          <table class="divider" cellpadding="0" cellspacing="0">
            <tr>
              <td></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
`;

export { layout, divider };
