/**
 * ReceiptDataParser knows the data that each component needs.
 */
class ReceiptDataParser {

  /**
   * @param {Object} data - full set of data.
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * @param {string} component - name of the component.
   * @throws {debug} when component name is missing.
   * @return {Object} an object with specific data for the named component.
   */
  getDataFor(component) {
    if (typeof this.data === 'undefined') {
       return "{}";
    }
    if (!component) {
      console.warn('ReceiptDataParser',' Calling getDataFor(component_name) but \'component_name\' is missing!');
    }
    let data = {};

    // define data object for a component
    switch (component) {
      // <spaaza-brand>
      case "BRAND":
        data.logoURL = this.data.chain.logo_url;
        data.title = "Your Receipt";
        data.message = `Hi there ${this.data.shopper.first_name}, thanks for your purchase!`;
      break;

      // <spaaza-details>
      case "DETAILS":
        data.message = `Your order details from ${this.data.chain.name}:`;
        data.name = this.data.chain.id;
        data.id = this.data.id;
        data.total = this.data.total_value;
        data.method = this.data.payment_method || "Total";
        data.date = this.data.timestamp;
        data.currencySymbol = this.data.chain.currency_symbol;
      break;

      // <spaaza-lineitems>
      case "LINEITEMS":
        data.lineitems = this.data.line_items;
        data.currencySymbol = this.data.chain.currency_symbol;
      break;

      // <spaaza-linetaxes>
      case "LINETAXES":
        data.linetaxes = this.data.tax_lines;
        data.currencySymbol = this.data.chain.currency_symbol;
      break;

      // <spaaza-totals>
      case "TOTALS":
        data.total = this.data.total_value;
        data.subtotal = this.data.subtotal;
        data.currencySymbol = this.data.chain.currency_symbol;
      break;

      // <spaaza-download>
      case "DOWNLOAD":
        data.downloadURL = this.data.download_url;
        data.label = "Download your PDF Receipt";
      break;

      // <spaaza-wallet>
      case "WALLET":
        data.currencySymbol = this.data.chain.currency_symbol;
        data.wallet = this.data.monetary_wallet;
        data.vouchers = this.data.basket_vouchers;
      break;

      // <spaaza-store>
      case "STORE":
        data.name = this.data.chain.business.name;
        data.contact = this.data.chain.business.phone_number;
        data.email = this.data.chain.business.email;
        data.website = this.data.chain.business.website_url;
        data.address = `${this.data.chain.business.address.address_1} ${this.data.chain.business.address.address_2} ${this.data.chain.business.address.address_3}`.trim();
        data.postalcode = this.data.chain.business.address.postal_code;
        data.towncity = this.data.chain.business.address.towncity;
        data.message = "Thank you!";
      break;

    }
    // return data tag with data string
    return JSON.stringify(data);
  }
}

export default ReceiptDataParser
