let template = `
  <style>
    :host {
      display: block;
    }
    pre {
      display: none;
    }
  </style>

  <table class="body">
    <tr>
      <td></td>
      <td class="container">
        <div class="content">

          <!-- Start receipt template  -->

          <table class="main">
            <tr>
              <td class="wrapper">
                <table>
                  <tr id="logo-container">
                    <td class="align-center">
                      <img id="logo" src="" height="48" alt=""></a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h1 class="align-center">Your receipt</h1>
                      <p>Hi there <span class="slot-first_name">{{ FirstName }}</span>, thanks for your purchase!</p>
                      <p>Your order details from <span class="slot-chain_name">{{ ChainName }}</span>:</p>

                      <table>
                        <tr>
                          <td class="receipt-total">
                            <span class="slot-payment_method">{{ PaymentMethod }}</span>
                          </td>
                          <td>
                            &nbsp;
                          </td>
                          <td align="right" class="receipt-total">
                             <span class="slot-currency_symbol">{{ CurrencySymbol }}</span>
                             <span class="slot-total_value">{{ TotalValue }}</span>
                          </td>
                        </tr>
                        <!-- <tr>
                          <td>
                            EARNED
                          </td>
                          <td>
                            &nbsp;
                          </td>
                          <td align="right">
                            <span class="slot-currency_symbol">{{ CurrencySymbol }}</span>
                            <span class="slot-total_earned">{{ TotalEarned }}</span>
                          </td>
                        </tr> -->
                      </table>
                      <table>
                        <tr>
                          <td>
                            Order number
                          </td>
                          <td>
                            &nbsp;
                          </td>
                          <td align="right">
                            #{{ Id }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Date
                          </td>
                          <td>
                            &nbsp;
                          </td>
                          <td align="right">
                            {{ Timestamp }}
                          </td>
                        </tr>
                      </table>

                      <table class="divider-wrapper">
                        <tr>
                          <td class="divider-spacer">
                            <table class="divider divider-{{ type }} {{ class }}" cellpadding="0" cellspacing="0">
                              <tr>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table>
                        <tr>
                          <!-- {{#LineItems.0.metadata.image}}
                          <td class="receipt-order-details_header">
                            &nbsp;
                          </td>
                          {{/LineItems.0.metadata.image}} -->
                          <td class="receipt-order-details_header">
                            NAME
                          </td>
                          <td class="receipt-order-details_header">
                            QTY
                          </td>
                          <td class="receipt-order-details_header" align="right">
                            TOTAL
                          </td>
                        </tr>
                        {{#LineItems}}
                        <tr>
                          <!-- {{#if Metadata.Image}}
                          <td class="receipt-line-item_image-box">
                            <img class="receipt-line-item_image" src="{{ Metadata.Image }}">
                          </td>
                          {{/if}} -->
                          <td>
                              <p class="receipt-line-item_name">
                                {{#if Name}}
                                  {{ Name }}
                                {{else}}
                                  NONAME
                                {{/if}}
                              </p>
                              {{#Description}}
                              <p class="receipt-line-item_description">
                                {{ . }}
                              </p>
                              {{/Description}}
                              {{#Metadata}}
                              <p class="receipt-line-item_description">
                                {{#Metadata.Size}}{{.}}{{/Metadata.Size}} {{#Metadata.Color}},{{.}}{{/Metadata.Color}}
                              </p>
                              {{/Metadata}}
                          </td>
                          <td>
                            {{ Quantity }}
                          </td>
                          <td align="right">
                            <div class="receipt-line-item_original-price">
                              <span class="slot-currency_symbol">{{ CurrencySymbol }}</span>
                              <span class="slot-original_price">{{ OriginalPrice }}</span>
                            </div>
                            <div class="receipt-line-item_sale-price">
                              <span class="slot-currency_symbol">{{ CurrencySymbol }}</span>
                              <span class="slot-sale_price">{{ SalePrice }}</span>
                            </div>
                          </td>
                        </tr>
                        {{/LineItems}}
                      </table>

                      <table class="receipt-subtotals">
                        <tr>
                          <td>
                            Subtotal
                          </td>
                          <td>
                            &nbsp;
                          </td>
                          <td align="right">
                            <span class="slot-currency_symbol">{{ CurrencySymbol }}</span>
                            <span class="slot-subtotal">{{ Subtotal }}</span>
                          </td>
                        </tr>
                      </table>

                      {{#if LineTaxes}}

                      <table class="divider-wrapper">
                        <tr>
                          <td class="divider-spacer">
                            <table class="divider divider-{{ type }} {{ class }}" cellpadding="0" cellspacing="0">
                              <tr>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table class="receipt-taxes">
                        <tr>
                          <td>
                            VAR RATE
                          </td>
                          <td>
                            ORDER VALUE
                          </td>
                          <td align="right">
                            VAT
                          </td>
                        </tr>
                        {{#LineTaxes}}
                        <tr>
                          <td>
                            {{ Rate }}
                          </td>
                          <td>
                            <span class="slot-currency_symbol">{{ CurrencySymbol }}</span>
                            <span class="slot-order_value">{{ OrderValue }}</span>
                          </td>
                          <td align="right">
                            <span class="slot-currency_symbol">{{ CurrencySymbol }}</span>
                            <span class="slot-tax_value">{{ TaxValue }}</span>
                          </td>
                        </tr>
                        {{/LineTaxes}}
                      </table>

                      {{/if}}

                      <table class="divider-wrapper">
                        <tr>
                          <td class="divider-spacer">
                            <table class="divider divider-{{ type }} {{ class }}" cellpadding="0" cellspacing="0">
                              <tr>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table class="receipt-totals">
                        {{#Vouchers}}
                        <tr>
                          <td>
                            {{ Text }}
                          </td>
                          <td>
                            &nbsp;
                          </td>
                          <td align="right">
                            -{{ CurrencySymbol }}{{ Amount }}
                          </td>
                        </tr>
                        {{/Vouchers}}
                        <tr class="receipt-total">
                          <td>
                            TOTAL
                          </td>
                          <td>
                            &nbsp;
                          </td>
                          <td align="right">
                            {{ CurrencySymbol }}{{ TotalValue }}
                          </td>
                        </tr>
                      </table>

                      <table class="divider-wrapper">
                        <tr>
                          <td class="divider-spacer">
                            <table class="divider divider-{{ type }} {{ class }}" cellpadding="0" cellspacing="0">
                              <tr>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      {{#Wallet}}
                      <table class="wallet">
                        <tr>
                          <td>
                            {{ Wallet.Title }}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Total earned on this transaction
                          </td>
                          <td align="right">
                            {{ CurrencySymbol }}{{ TotalEarned }}
                          </td>
                        </tr>
                        <tr class="receipt-total">
                          <td>
                            You current balance
                          </td>
                          <td align="right">
                            {{ CurrencySymbol }}{{ Wallet.SavedAmount }}
                          </td>
                        </tr>
                      </table>
                      {{/Wallet}}

                      <table class="divider-wrapper">
                        <tr>
                          <td class="divider-spacer">
                            <table class="divider divider-{{ type }} {{ class }}" cellpadding="0" cellspacing="0">
                              <tr>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table class="btn btn-primary" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <td>
                                  <a href="{{ DownloadUrl }}">Download your PDF receipt</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table class="divider-wrapper">
                        <tr>
                          <td class="divider-spacer">
                            <table class="divider divider-{{ type }} {{ class }}" cellpadding="0" cellspacing="0">
                              <tr>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table>
                        <tr>
                          <td>
                            <span class="slot-chain_name">{{ ChainName }}</span>
                          </td>
                        </tr>
                      </table>
                      {{#if MapURL }}
                      <table>
                        <tr>
                          <td>
                            <img src="{{ MapURL }}">
                          </td>
                        </tr>
                      </table>
                      {{/if}}
                      <table>
                        <tr>
                          <td>
                            <p>
                              {{#Address_1}}
                                {{ . }}<br>
                              {{/Address_1}}
                              {{#PostalCode}}
                                {{ . }}
                              {{/PostalCode}}
                              {{#Towncity}}
                                {{ . }}
                              {{/Towncity}}
                            </p>
                          </td>
                          <td align="right">
                            {{#PhoneNumber}}
                              <a href="tel:{{ . }}">{{ . }}</a>
                            {{/PhoneNumber}}
                            {{#EmailAddress}}
                              <a href="tel:{{ . }}">{{ . }}</a>
                            {{/EmailAddress}}
                          </td>
                        </tr>
                      </table>

                      <table class="divider-wrapper">
                        <tr>
                          <td class="divider-spacer">
                            <table class="divider divider-{{ type }} {{ class }}" cellpadding="0" cellspacing="0">
                              <tr>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <p class="align-center">Thank you for choosing <span class="slot-chain_name">{{ ChainName }}</span>.</p>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- End Receipt template  -->

        </div>
      </td>
      <td></td>
    </tr>
  </table>
`;

export default template
