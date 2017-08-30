import strings, { blockSubstitute } from "../common/language";

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
    const { shopper, chain } = this.data;
    const data = {
      currencySymbol: chain.currency_symbol
    };

    // define data object for a component
    switch (component) {
      case "brand":
        data.logoURL = chain.logo_url;
      break;

      case "details":
        data.name = chain.id;
        data.id = this.data.id;
        data.total = this.data.total_value;
        data.date = this.data.timestamp;
      break;

      case "lineitems":
        data.lineitems = this.data.line_items;
      break;

      case "linetaxes":
        data.linetaxes = this.data.tax_lines;
      break;

      case "totals":
        data.total = this.data.total_value;
        data.subtotal = this.data.subtotal;
      break;

      case "download":
        data.downloadURL = this.data.download_url;
      break;

      case "wallet":
        data.wallet = this.data.monetary_wallet;
        data.vouchers = this.data.basket_vouchers;
      break;

      case "store":
        data.name = chain.business.name;
        data.contact = chain.business.phone_number;
        data.email = chain.business.email;
        data.website = chain.business.website_url;
        data.address = `${chain.business.address.address_1} ${chain.business.address.address_2} ${chain.business.address.address_3}`.trim();
        data.postalcode = chain.business.address.postal_code;
        data.towncity = chain.business.address.towncity;
      break;
    }

    // add in component specific strings
    data.strings = blockSubstitute(strings[component], {
      "$GIVEN_NAME": shopper.first_name,
      "$FAMILY_NAME": shopper.last_name,
      "$CHAIN_NAME": chain.name,
    });
    // pass along the language code as well
    data.strings.langCode = strings.langCode;

    return data;
  }
}

export default ReceiptDataParser;
