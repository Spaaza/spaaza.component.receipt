"use strict";function __extends(t,e){function a(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])},sumFieldValuesConditional=function(t,e,a,i){return(t||[]).filter(function(t){return t[a]===i}).map(function(t){return t[e]}).reduce(function(t,e){return t+e},0)},parseReceipt=function(t){t.shopper;var e=t.chain,a=e.currency_symbol,i=e.business;return{brand:{logoURL:e.logo_url},details:{name:e.id,id:t.id,total:t.total_value,date:t.timestamp,currencySymbol:a},lineitems:{lineitems:t.line_items,currencySymbol:a},linetaxes:{linetaxes:t.tax_lines,currencySymbol:a},totals:{total:t.total_value,subtotal:t.subtotal,currencySymbol:a},download:{downloadURL:t.download_url},wallet:{wallet:t.monetary_wallet,totalEarned:t.monetary_wallet.total,totalSpent:sumFieldValuesConditional(t.basket_vouchers,"amount","type","wallet"),currencySymbol:a},pointswallet:{wallet:t.points_wallet||{},totalEarned:t.points_wallet&&t.points_wallet.total||0,totalSpent:0,currencySymbol:"pts"},store:{name:i.name,contact:i.phone_number,email:i.email,website:i.website_url,address:(i.address.address_1+" "+i.address.address_2+" "+i.address.address_3).trim(),postalcode:i.address.postal_code,towncity:i.address.towncity}}},stringData={"en-GB":require("../lang/en-GB.json"),"nl-NL":require("../lang/nl-NL.json")},mapLangCode=function(t){var e="en-GB";return"nl"!==(t=t.toLowerCase().trim())&&"nl-"!==t.substr(0,3)&&"nl_"!==t.substr(0,3)||(e="nl-NL"),e},strings=function(t){return stringData[mapLangCode(t)]},transformBlock=function(t,e){var a={};for(var i in t)t.hasOwnProperty(i)&&(a[i]=e(t[i],i));return a},transformStringBlocks=function(t,e){var a={};for(var i in t)t.hasOwnProperty(i)&&"object"==typeof t[i]&&(a[i]=e(t[i],i));return a},transformStrings=function(t,e){return transformStringBlocks(t,function(t,a){return transformBlock(t,e)})},substitute=function(t,e){var a=t;for(var i in e)e.hasOwnProperty(i)&&(a=a.replace(new RegExp(function(t){return t.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|\#]/g,function(t){return"\\"+t})}(i),"g"),e[i]));return a},applySubstitutions=function(t,e){return transformStrings(t,function(t){return substitute(t,e)})},overrideStrings=function(t,e){return transformStringBlocks(t,function(t,a){var i=e[a];return transformBlock(t,function(t,e){return i&&e in i?i[e]:t})})},amount=function(t,e){var a="pts"===e,i=a?0:2,n=!a,r=(+t).toFixed(i);return n?e+" "+r:r+" "+e},entities=function(t){return(t||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},divider='\n<table class="divider-wrapper">\n\t<tr>\n\t\t<td class="divider-spacer">\n\t\t<table class="divider" cellpadding="0" cellspacing="0">\n\t\t\t<tr><td></td></tr>\n\t\t</table>\n\t\t</td>\n\t</tr>\n</table>\n',Brand=function(t,e,a){var i="<table>";return t.logoURL&&(i+='\n      <tr>\n        <td><img src="'+entities(t.logoURL)+'"></td>\n      </tr>\n    '),e.title&&(i+="\n      <tr>\n        <td><h1>"+e.title+"</h1></td>\n      </tr>\n    "),e.message&&(i+="\n      <tr>\n        <td><p>"+e.message+"</p></td>\n      </tr>\n    "),i+="</table>"},Details=function(t,e,a){var i="<table>";return e.message&&(i+='<tr><td colspan="2">'+e.message+"</td></tr>"),t.total&&(i+='\n      <tr class="receipt-strong">\n        <td class="">'+e.charged+'</td>\n        <td class="align-right">'+amount(t.total,t.currencySymbol)+"</td>\n      </tr>\n    "),t.id&&(i+='\n      <tr>\n        <td class="">'+e["order-number"]+'</td>\n        <td class="align-right">#'+entities(t.id)+"</td>\n      </tr>\n    "),t.date&&(i+='\n      <tr>\n        <td class="">'+e.date+'</td>\n        <td class="align-right">'+entities(new Date(t.date).toLocaleString(a))+"</td>\n      </tr>\n    "),i+="</table>"},LineItems=function(t,e,a){if(!t.lineitems||!t.lineitems.length)return"";var i=t.currencySymbol,n="";n+=divider,n+='\n\t\t<table class="receipt-lineitems">\n\t\t\t<tr>\n\t\t\t\t<th class="align-left">'+e.name+'</th>\n\t\t\t\t<th class="align-center">'+e.quantity+'</th>\n\t\t\t\t<th class="align-right">'+e.price+"</th>\n\t\t\t</tr>\n\t";for(var r=0,s=t.lineitems;r<s.length;r++){var o=s[r],l=o.original_price>o.sale_price;n+='\n\t\t\t<tr class="line-item">\n\t\t\t\t<td class="align-left">\n\t\t\t\t\t<div class="line-item-name">'+entities(o.name||o.barcode)+'</div>\n\t\t\t\t</td>\n\t\t\t\t<td class="align-center">'+entities(o.quantity)+'</td>\n\t\t\t\t<td class="align-right">\n\t\t\t\t\t<span class="receipt-original-price '+(l?"receipt-line-through":"")+'">'+amount(o.original_price,i)+'</span>\n\t\t\t\t\t<span class="receipt-sale-price receipt-strong">'+amount(o.sale_price,i)+"</span>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t"}return n+="</table>"},LineTaxes=function(t,e,a){if(!t.linetaxes||!t.linetaxes.length)return"";var i=t.currencySymbol,n="";n+=divider,n+='\n\t\t<table class="receipt-linetaxes">\n\t\t\t<tr>\n\t\t\t\t<th class="align-left">'+e["tax-rate"]+'</th>\n\t\t\t\t<th class="align-center">'+e["order-value"]+'</th>\n\t\t\t\t<th class="align-right">'+e["tax-value"]+"</th>\n\t\t\t</tr>\n\t";for(var r=0,s=t.linetaxes;r<s.length;r++){var o=s[r];n+='\n\t\t\t<tr class="tax-line">\n\t\t\t\t<td class="var-rate align-left">'+entities(o.rate)+'%</td>\n\t\t\t\t<td class="order-value align-center">'+amount(o.order_value,i)+'</td>\n\t\t\t\t<td class="vat align-right">'+amount(o.tax_value,i)+"</td>\n\t\t\t</tr>\n\t\t"}return n+="</table>"},Totals=function(t,e,a){var i="";return i+=divider,i+='<table class="receipt-totals">',i+='\n\t\t<tr class="receipt-subtotal">\n\t\t\t<td>'+e.subtotal+'</td>\n\t\t\t<td class="align-right">'+amount(t.subtotal,t.currencySymbol)+"</td>\n\t\t</tr>\n\t",i+='\n\t\t<tr class="receipt-strong">\n\t\t\t<td>'+e.total+'</td>\n\t\t\t<td class="align-right">'+amount(t.total,t.currencySymbol)+"</td>\n\t\t</tr>\n\t",i+="</table>"},Wallet=function(t,e,a){var i=t.wallet,n=t.totalEarned,r=t.totalSpent,s=t.currencySymbol;if(!n&&!r)return"";var o="";if(o+=divider,o+='<table class="receipt-wallet">',o+='<tr><td class="receipt-strong">'+entities(i.title)+"</td></tr>",n&&(o+="\n\t\t\t<tr>\n\t\t\t\t<td>"+entities(i.title)+" "+e.earned+'</td>\n\t\t\t\t<td align="right">'+amount(n,s)+"</td>\n\t\t\t</tr>\n\t\t",i.contributions.length>1))for(var l=0,p=i.contributions;l<p.length;l++){var c=p[l];o+="\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>&nbsp;&nbsp;&nbsp;&nbsp;"+entities(c.campaign_title)+'</td>\n\t\t\t\t\t\t<td align="right">'+amount(c.amount,s)+"</td>\n\t\t\t\t\t</tr>\n\t\t\t\t"}return r&&(o+="\n\t\t\t<tr>\n\t\t\t\t<td>"+entities(i.title)+" "+e.spent+'</td>\n\t\t\t\t<td align="right">'+amount(r,s)+"</td>\n\t\t\t</tr>\n\t\t"),o+='\n\t\t<tr class="receipt-total">\n\t\t\t<td>'+e["new-balance"]+'</td>\n\t\t\t<td align="right" class="receipt-strong">'+amount(i.total,s)+"</td>\n\t\t</tr>\n\t",o+="</table>"},Download=function(t,e,a){var i="";return t.downloadURL&&(i+=divider,i+='<div class="btn-download"><a href="'+entities(t.downloadURL)+'" target="_blank">'+e.label+"</a><div>"),i},Store=function(t,e,a){if(!(t.name||t.message||t.address||t.contact||t.email||t.website||t.towncity||t.postalcode))return"";var i="";return i+=divider,i+='<table class="receipt-store">',i+='\n\t\t<tr>\n\t\t\t<td class="align-left">\n\t',t.name&&(i+="<div>"+entities(t.name)+"</div>"),t.email&&(i+='<div><a href="mailto:'+entities(t.email)+'">'+entities(t.email)+"</a></div>"),t.website&&(i+='<div><a href="'+entities(t.website)+'" target="_blank">'+entities(t.website)+"</a></div>"),i+='\n\t\t</td>\n\t\t<td class="align-right">\n\t',t.contact&&(i+='<a href="tel:'+entities(t.contact)+'">'+entities(t.contact)+"</a>"),t.address&&(i+="<div>"+entities(t.address)+"</div>"),t.towncity&&t.postalcode?i+="<div>"+entities(t.towncity)+", "+entities(t.postalcode)+"</div>":t.towncity&&!t.postalcode?i+="<div>"+entities(t.towncity)+"</div>":!t.towncity&&t.postalcode&&(i+="<div>"+entities(t.postalcode)+"</div>"),i+="\n\t\t\t</td>\n\t\t</tr>\n\t",i+="</table>",e.message&&(i+=divider,i+='<p class="receipt-emphasys receipt-footer-message">'+e.message+"</p>"),i},Receipt$2=function(t,e,a){var i={header:["brand","details"],content:["lineitems","linetaxes","totals","wallet","pointswallet","download"],footer:["store"]},n={brand:Brand,details:Details,lineitems:LineItems,linetaxes:LineTaxes,totals:Totals,wallet:Wallet,download:Download,store:Store},r='<div class="spaaza-receipt"><div class="main content">';for(var s in i){r+="<section>";for(var o=0,l=i[s];o<l.length;o++){var p=l[o],c="pointswallet"===p?n.wallet:n[p],d="pointswallet"===p?e.wallet:e[p];r+=c(t[p],d,a)}r+="</section>"}return r+="</div></div>"},Error$1=function(t,e,a){return'\n\t\t<div class="spaaza-receipt"><div class="main content">\n\t\t\t<p>'+e.message+"</p>\n\t\t</div></div>\n\t"},styles='.spaaza-receipt a,.spaaza-receipt div,.spaaza-receipt table,.spaaza-receipt td{box-sizing:border-box}.spaaza-receipt img{-ms-interpolation-mode:bicubic;max-width:100%}.spaaza-receipt :host{display:block;font-family:"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;height:100%!important;line-height:1.6em;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;width:100%!important}.spaaza-receipt table{border-collapse:separate!important;mso-table-lspace:0;mso-table-rspace:0;width:100%}.spaaza-receipt table td,.spaaza-receipt table th{font-family:"Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-size:14px;vertical-align:top}.spaaza-receipt table th{font-size:12px;text-transform:uppercase;font-weight:400;color:#aaa}.spaaza-receipt .ExternalClass{width:100%}.spaaza-receipt .ExternalClass,.spaaza-receipt .ExternalClass div,.spaaza-receipt .ExternalClass font,.spaaza-receipt .ExternalClass p,.spaaza-receipt .ExternalClass span,.spaaza-receipt .ExternalClass td{line-height:100%}.spaaza-receipt body{background-color:#f6f6f6}.spaaza-receipt .body{background-color:#f6f6f6;width:100%}.spaaza-receipt .container{display:block;Margin:0 auto!important;max-width:580px;padding:10px;width:auto!important;width:580px}.spaaza-receipt .content{display:block;margin:0 auto;max-width:580px;padding:10px}.spaaza-receipt .main{background:#fff;border:1px solid #e9e9e9;border-radius:3px;width:100%;padding:2em}.spaaza-receipt .wrapper{padding:30px}.spaaza-receipt .content-block{padding:0 0 30px}.spaaza-receipt .header{margin-bottom:30px;margin-top:20px;width:100%}.spaaza-receipt .footer{clear:both;width:100%}.spaaza-receipt .footer *{color:#999;font-size:12px}.spaaza-receipt .footer td{padding:20px 0}.spaaza-receipt h1,.spaaza-receipt h2,.spaaza-receipt h3,.spaaza-receipt h4{color:#111!important;font-family:"Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight:400;line-height:1.4em;margin:0;margin-bottom:30px}.spaaza-receipt h1{font-size:38px;text-transform:capitalize;font-weight:300}.spaaza-receipt h2{font-size:24px}.spaaza-receipt h3{font-size:18px}.spaaza-receipt h4{font-size:14px;font-weight:500}.spaaza-receipt ol,.spaaza-receipt p,.spaaza-receipt ul{font-family:"Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-size:14px;font-weight:400;margin:0;margin-bottom:15px}.spaaza-receipt ol li,.spaaza-receipt p li,.spaaza-receipt ul li{list-style-position:inside;margin-left:5px}.spaaza-receipt a{color:#348eda;text-decoration:underline}.spaaza-receipt .word-wrap,.spaaza-receipt code,.spaaza-receipt pre{word-break:break-word;word-wrap:break-word;-webkit-hyphens:auto;-moz-hyphens:auto;hyphens:auto}.spaaza-receipt .divider{border-collapse:separate}.spaaza-receipt .divider-spacer{padding:20px 0}.spaaza-receipt .divider td{border-top:1px solid #ccc;line-height:0;font-size:0;height:1px;margin:0;padding:0}.spaaza-receipt .last{margin-bottom:0}.spaaza-receipt .first{margin-top:0}.spaaza-receipt .align-center{text-align:center}.spaaza-receipt .align-right{text-align:right}.spaaza-receipt .align-left{text-align:left}.spaaza-receipt .clear{clear:both}.spaaza-receipt .mt0{margin-top:0}.spaaza-receipt .mb0{margin-bottom:0}.spaaza-receipt .preheader{color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0}@media only screen and (max-width:620px){.spaaza-receipt table[class=body] h1,.spaaza-receipt table[class=body] h2,.spaaza-receipt table[class=body] h3,.spaaza-receipt table[class=body] h4{font-weight:600!important}.spaaza-receipt table[class=body] h1{font-size:22px!important}.spaaza-receipt table[class=body] h2{font-size:18px!important}.spaaza-receipt table[class=body] h3{font-size:16px!important}.spaaza-receipt table[class=body] .content,.spaaza-receipt table[class=body] .wrapper{padding:10px!important}.spaaza-receipt table[class=body] .container{padding:0!important;width:100%!important}.spaaza-receipt table[class=body] .btn a,.spaaza-receipt table[class=body] .btn table{width:100%!important}}.spaaza-receipt .receipt-strong{font-weight:700;text-transform:uppercase}.spaaza-receipt .receipt-emphasys{font-style:italic}.spaaza-receipt .receipt-line-through{text-decoration:line-through}.spaaza-receipt table.receipt-lineitems td,.spaaza-receipt table.receipt-lineitems th,.spaaza-receipt table.receipt-linetaxes td,.spaaza-receipt table.receipt-linetaxes th{width:33%}.spaaza-receipt img{display:block;margin:3em auto;height:100px}.spaaza-receipt h1{text-align:center}.spaaza-receipt .receipt-original-price{display:none}.spaaza-receipt .receipt-original-price.receipt-line-through{display:inline}.spaaza-receipt .btn-download{width:100%;padding-bottom:15px;background-color:#348eda;border-radius:5px;text-align:center;font-family:"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;height:100%!important;line-height:1.6em;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.spaaza-receipt .btn-download a{background-color:#348eda;border:solid 1px #348eda;border-radius:5px;color:#fff;cursor:pointer;display:inline-block;font-size:14px;font-weight:700;margin:0;padding:12px 25px;text-decoration:none;text-transform:capitalize}.spaaza-receipt .receipt-footer-message{text-align:center}',Receipt=function(t){function e(){var e=t.call(this)||this;return e.attachShadow({mode:"open"}),e}return __extends(e,t),Object.defineProperty(e,"observedAttributes",{get:function(){return["language","redraw"]},enumerable:!0,configurable:!0}),e.prototype.connectedCallback=function(){this.redraw()},e.prototype.attributeChangedCallback=function(t,e,a){this.redraw()},e.prototype.getConfig=function(){var t=this,e=function(e){var a=t.shadowRoot.host.querySelector("script[data-"+e+"]");if(a&&a.textContent)try{return JSON.parse(a.textContent)}catch(t){console.error("Failed to parse "+e+" data: ",t)}},a=this.shadowRoot.host.getAttribute("language")||"",i=strings(a),n=e("strings"),r=n?overrideStrings(i,n):i;return{langCode:i.langCode,receipt:e("receipt"),strings:r}},e.prototype.redraw=function(){var t=this.getConfig();if(t.receipt){var e=parseReceipt(t.receipt),a=applySubstitutions(t.strings,{$GIVEN_NAME:t.receipt.shopper.first_name,$FAMILY_NAME:t.receipt.shopper.last_name,$CHAIN_NAME:t.receipt.chain.name}),i=transformStrings(a,function(t){return entities(t)});this.shadowRoot.innerHTML="<style>"+styles+"</style>\n"+Receipt$2(e,i,t.langCode)}else this.shadowRoot.innerHTML="<style>"+styles+"</style>\n"+Error$1({},t.strings.error,t.langCode)},e}(HTMLElement);customElements.define("spaaza-receipt",Receipt),module.exports=Receipt;