!function(){"use strict";function n(e,t){var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t(e[r],r));return a}function i(e,t){var a={};for(var r in e)e.hasOwnProperty(r)&&"object"==typeof e[r]&&(a[r]=t(e[r],r));return a}function r(e,t){var a=e;for(var r in t)t.hasOwnProperty(r)&&(a=a.replace(new RegExp(r.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|\#]/g,function(e){return"\\"+e}),"g"),t[r]));return a}function d(e,t){var a="pts"===t,r=!a,n=(+e).toFixed(a?0:2);return r?t+" "+n:n+" "+t}function a(e,t){return(e||[]).map(function(e){return e[t]}).reduce(function(e,t){return e+t},0)}function l(e,t,a,r){return(e||[]).filter(function(e){return e[a]===r}).map(function(e){return e[t]}).reduce(function(e,t){return e+t},0)}var o={"en-GB":{langCode:"en-GB",brand:{title:"Your Receipt",message:"Hi there $GIVEN_NAME, thanks for your purchase!"},details:{message:"Your order details from $CHAIN_NAME:",charged:"CHARGED","order-number":"Order number",date:"Date",payment:"Payment method","employee-name":"Employee"},lineitems:{name:"Name",quantity:"Qty",price:"Price"},taxes:{"tax-rate":"VAT Rate","order-value":"Order value","tax-value":"VAT"},paymentmethods:{},totals:{subtotal:"Subtotal",total:"Total",voucher:"Voucher"},wallet:{earned:"earned",spent:"spent","new-balance":"Your new balance"},download:{label:"Download your PDF Receipt"},store:{message:"Thank you!"},error:{message:"There was a problem showing this receipt."}},"nl-NL":{langCode:"nl-NL",brand:{title:"Jouw Bon",message:"Bedankt voor je aankoop, $GIVEN_NAME!"},details:{message:"Informatie over je aankoop bij $CHAIN_NAME:",charged:"In rekening gebracht","order-number":"Bestellingsnummer",date:"Datum",payment:"Betaalmethode","employee-name":"Werknemer"},lineitems:{name:"Naam",quantity:"Aantal",price:"Prijs"},taxes:{"tax-rate":"BTW %","order-value":"Waarde","tax-value":"BTW"},paymentmethods:{},totals:{subtotal:"Subtotaal",total:"Totaal",voucher:"Kortingsbon"},wallet:{earned:"verdiend",spent:"uitgegeven","new-balance":"Jouw nieuwe totaal"},download:{label:"Download je bon als PDF"},store:{message:"Hartelijk bedankt!"},error:{message:"Er was een probleem met het tonen van deze bon."}}},u=function(e){return o[(a="en-GB","nl"!==(t=(t=e).toLowerCase().trim())&&"nl-"!==t.substr(0,3)&&"nl_"!==t.substr(0,3)||(a="nl-NL"),a)];var t,a},s=function(e,t){return a=function(e){return r(e,t)},i(e,function(e,t){return n(e,a)});var a},m=function(e,r){return i(e,function(e,t){var a=r[t];return n(e,function(e,t){return a&&t in a?a[t]:e})})};function h(e,t){for(var a,r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];var i=r.length?(a=[]).concat.apply(a,r):null;if("string"==typeof e)return{nodeName:e,attributes:t,children:i};var l=t;return i&&(l.children=i),e(l)}function c(e,t){return a={logoURL:e.chain.logo_url},r=t.brand,h("table",null,a.logoURL&&h("tr",null,h("td",null,h("img",{class:"brand_logo",src:a.logoURL}))),r.title&&h("tr",null,h("td",null,h("h1",null,r.title))),r.message&&h("tr",null,h("td",null,h("p",null,r.message))));var a,r}function p(e,t,a){return r={total:e.total_value,date:e.timestamp,retailerCode:e.retailer_basket_code,currencySymbol:e.chain.currency_symbol,employeeName:e.employee.name,employeeCode:e.employee.code},n=t.details,i=a,l=n.message?h("tr",null,h("td",{colSpan:2},n.message)):null,o=r.total?h("tr",{class:"receipt-strong"},h("td",{class:""},n.charged),h("td",{class:"align-right"},d(r.total,r.currencySymbol))):null,s=r.retailerCode?h("tr",null,h("td",{class:""},n["order-number"]),h("td",{class:"align-right"},"#",r.retailerCode)):null,c=r.employeeName?h("tr",null,h("td",{class:""},n["employee-name"]),h("td",{class:"align-right"},r.employeeCode)):null,p=r.date?h("tr",null,h("td",{class:""},n.date),h("td",{class:"align-right"},new Date(r.date).toLocaleString(i))):null,h("table",null,l,o,s,p,c);var r,n,i,l,o,s,c,p}function g(e,t){return function(e,t){if(!e.lineitems||!e.lineitems.length)return null;var a=e.currencySymbol;return h("table",{class:"receipt-lineitems"},h("tr",null,h("th",{class:"align-left"},t.name),h("th",{class:"align-center"},t.quantity),h("th",{class:"align-right"},t.price)),e.lineitems.map(function(e){var t=Math.abs(e.original_price)>Math.abs(e.sale_price);return h("tr",{class:"line-item"},h("td",{class:"align-left"},h("div",{class:"line-item-name"},e.description||e.barcode)),h("td",{class:"align-center"},e.quantity),h("td",{class:"align-right"},h("span",{class:{"receipt-original-price":!0,"receipt-line-through":t}},d(e.original_price,a)),h("span",{class:"receipt-sale-price receipt-strong"},d(e.sale_price,a))))}))}({lineitems:e.line_items,currencySymbol:e.chain.currency_symbol},t.lineitems)}function b(e,t,a){return function(e,t){if(!e.taxes||!e.taxes.length)return null;var a=e.currencySymbol;return h("table",{class:"receipt-linetaxes"},h("tr",null,h("th",{class:"align-left"},t["tax-rate"]),h("th",{class:"align-center"},t["order-value"]),h("th",{class:"align-right"},t["tax-value"])),e.taxes.map(function(e){return h("tr",{class:"tax-line"},h("td",{class:"var-rate align-left"},Math.round(100*e.rate),"%"),h("td",{class:"order-value align-center"},d(e.order_value,a)),h("td",{class:"vat align-right"},d(e.tax_value,a)))}))}({taxes:e.tax_lines,currencySymbol:e.chain.currency_symbol},t.taxes)}function f(e,t,a){return function(e){if(!e.paymentMethods||!e.paymentMethods.length)return null;var t=e.currencySymbol;return h("table",{class:"receipt-paymentmethods"},e.paymentMethods.map(function(e){return h("tr",{class:"payment-method"},h("td",{class:"var-rate align-left"},e.payment_method),h("td",{class:"order-value align-right"},d(e.payment_amount,t)))}))}({paymentMethods:e.payment_methods,currencySymbol:e.chain.currency_symbol},t.paymentmethods)}function y(e,t){return a={total:e.total_value,subtotal:e.subtotal,loyaltyVouchersSpent:l(e.basket_vouchers,"amount","type","loyalty"),walletVouchersSpent:l(e.basket_vouchers,"amount","type","wallet"),currencySymbol:e.chain.currency_symbol,basketVouchers:e.basket_vouchers},r=t.totals,h("table",{class:"receipt-totals"},a.basketVouchers.map(function(e){return h("tr",null,h("td",null,r.voucher,": ",e.campaign_title),h("td",{align:"right",class:"voucher"},d(-1*e.amount,a.currencySymbol)))}),h("tr",{class:"receipt-subtotal"},h("td",null,r.subtotal),h("td",{class:"align-right"},d(a.subtotal,a.currencySymbol))),h("tr",{class:"receipt-strong receipt-total"},h("td",null,r.total),h("td",{class:"align-right"},d(a.total,a.currencySymbol))));var a,r}function v(e,t){var a=e.wallet,r=e.totalEarned,n=e.totalSpent,i=e.currencySymbol,l=e.showPoints;return a&&l&&(r||n)?h("table",{class:"receipt-wallet"},h("tr",null,h("td",{class:"receipt-strong"},a.title)),r?h("tr",null,h("td",null,a.title," ",t.earned),h("td",{align:"right"},d(r,i))):null,1<a.contributions.length&&a.contributions.map(function(e){return h("tr",null,h("td",null,"    ",e.campaign_title),h("td",{align:"right"},d(e.amount,i)))}),n?h("tr",null,h("td",null,a.title," ",t.spent),h("td",{align:"right"},d(n,i))):null,h("tr",null,h("td",null,t["new-balance"]),h("td",{align:"right",class:"receipt-strong"},d(a.total,i)))):null}function w(e,t){return t<=0?e:Math.round(e*t)}function z(t,e){return v({wallet:t.monetary_wallet&&{title:t.monetary_wallet.title,total:w(t.monetary_wallet.total,t.wallet_points_ratio),contributions:t.monetary_wallet.contributions.map(function(e){return{campaign_title:e.campaign_title,amount:w(e.amount,t.wallet_points_ratio)}})},showPoints:!0,totalEarned:w(a(t.monetary_wallet?t.monetary_wallet.contributions:[],"amount"),t.wallet_points_ratio),totalSpent:w(l(t.basket_vouchers,"amount","type","wallet"),t.wallet_points_ratio),currencySymbol:0<t.wallet_points_ratio?"pts":t.chain.currency_symbol},e.wallet)}function _(e,t){return v({wallet:e.points_wallet,showPoints:e.show_points,totalEarned:e.points_wallet&&a(e.points_wallet.contributions,"amount")||0,totalSpent:0,currencySymbol:"pts"},t.wallet)}function x(e,t,a){return e.download_url?h("div",{class:"btn-download"},h("form",{target:"_blank",method:"POST",action:e.download_url+"/receipts/print/"+e.id+".pdf"},h("input",{type:"hidden",name:"content",value:"<b>empty</b>"})),h("a",{onClick:function(e){var t=e.target.closest("div.spaaza-receipt"),a=e.target.parentElement.querySelector("form"),r=a.querySelector('input[name="content"]');r.value="",r.value=t.outerHTML,a.submit(),e.preventDefault()}},t.download.label)):null}function k(e,t,a){var r,n=e.chain.business;return r={name:n.name,contact:n.phone_number,email:n.email,website:n.website_url,address:(n.address.address_1+" "+n.address.address_2+" "+n.address.address_3).trim(),postalcode:n.address.postal_code,city:n.address.towncity},t.store,r.name||r.address||r.postalcode||r.city||r.contact||r.email||r.website?h("table",{class:"receipt-store"},h("tr",null,h("td",{class:"align-left"},r.name&&h("div",null,r.name),r.address&&h("div",null,r.address),(r.postalcode||r.city)&&h("div",null,r.postalcode," ",r.city),r.email&&h("div",null,h("a",{href:"mailto:"+r.email},r.email)),r.website&&h("div",null,h("a",{href:r.website,target:"_blank"},r.website)),r.contact&&h("a",{href:"tel:"+r.contact},r.contact)))):null}function E(e,t){return(a={retailerCode:e.retailer_basket_code,environment:e.environment}).retailerCode?"staging"===a.environment||"test01"===a.environment?h("div",{class:"content barcode"},h("div",{class:"image",title:"Barcode: "+a.retailerCode,style:"background-image: url(https://missetam-test01.spaaza.com/barcode/"+a.retailerCode+")"})):h("div",{class:"content barcode"},h("div",{class:"image",title:"Barcode: "+a.retailerCode,style:"background-image: url(https://acme-prod.spaaza.com/barcode/"+a.retailerCode+")"})):null;var a}function N(e){return h("table",{class:"divider-wrapper"},h("tr",null,h("td",{class:"divider-spacer"},h("table",{class:"divider",cellPadding:0,cellSpacing:0},h("tr",null,h("td",null))))))}function C(e,t){return function(e){if(!e.notes&&!e.customNotes)return null;return h("div",{class:"receipt-notes"},e.customNotes?h("p",null,e.customNotes):null,!e.notes||e.customNotes?null:h("p",null,e.notes))}({notes:e.notes,customNotes:e.custom_notes})}var S=function(t,a,r){function n(e){return e(t,a,r)}function e(e){var t=n(e);return t?h("div",null,h(N,null),t):t}return h("div",{class:"main content"},h("section",null,n(c),n(p)),h("section",null,e(g),e(b),e(y),n(f),e(z),e(_),h("div",{class:"download"},h(N,null),n(x))),h("section",null,e(k),e(C),n(E)))},A=function(e,t,a){return h("div",{class:"main content"},h("p",null,t.error.message))},M='.spaaza-receipt{font-size:16px;font-family:"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.6em;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;color:#000;text-align:left}@media print{.spaaza-receipt{font-size:7pt}.spaaza-receipt div.download{display:none}}.spaaza-receipt html#pdf{font-size:9pt}.spaaza-receipt html#pdf div.download{display:none}.spaaza-receipt section{margin:0}.spaaza-receipt a,.spaaza-receipt div,.spaaza-receipt table,.spaaza-receipt td{box-sizing:border-box}.spaaza-receipt img{-ms-interpolation-mode:bicubic;max-width:100%}.spaaza-receipt table{border-collapse:separate!important;width:100%}.spaaza-receipt table td{font-size:87%}.spaaza-receipt table th{vertical-align:top;font-size:75%;text-transform:uppercase;font-weight:400;color:#aaa}.spaaza-receipt .ExternalClass{width:100%}.spaaza-receipt .ExternalClass,.spaaza-receipt .ExternalClass div,.spaaza-receipt .ExternalClass font,.spaaza-receipt .ExternalClass p,.spaaza-receipt .ExternalClass span,.spaaza-receipt .ExternalClass td{line-height:100%}.spaaza-receipt .body{background-color:#f6f6f6;width:100%}.spaaza-receipt .container{display:block;margin:0 auto;max-width:36em;padding:.6em;width:auto}.spaaza-receipt .content{display:block;max-width:36em;margin:0 auto;padding:.6em}.spaaza-receipt .main{background:#fff;border:1px solid #e9e9e9;border-radius:3px;width:100%;padding:2em}.spaaza-receipt .wrapper{padding:2em}.spaaza-receipt .content-block{padding:0 0 2em}.spaaza-receipt .header{margin-bottom:2em;margin-top:1.5em;width:100%}.spaaza-receipt .footer{clear:both;width:100%;font-size:75%;color:#999}.spaaza-receipt .footer td{padding:2em 0}.spaaza-receipt h1,.spaaza-receipt h2,.spaaza-receipt h3,.spaaza-receipt h4{color:#111!important;font-family:inherit;font-weight:400;line-height:1.4em;margin:0;margin-bottom:2em}.spaaza-receipt h1{font-size:230%;text-transform:capitalize;font-weight:300}.spaaza-receipt h2{font-size:150%}.spaaza-receipt h3{font-size:120%}.spaaza-receipt h4{font-size:87%;font-weight:500}.spaaza-receipt p{font-family:inherit;font-weight:400;margin:0 0 1.2em 0}.spaaza-receipt a{color:#000;text-decoration:underline}.spaaza-receipt .word-wrap,.spaaza-receipt code,.spaaza-receipt pre{word-break:break-word;word-wrap:break-word;-webkit-hyphens:auto;-moz-hyphens:auto;hyphens:auto}.spaaza-receipt .divider{border-collapse:separate}.spaaza-receipt .divider-spacer{padding:1.5em 0}.spaaza-receipt .divider td{border-top:1px solid #ccc;line-height:0;font-size:0;height:1px;margin:0;padding:0}.spaaza-receipt .last{margin-bottom:0}.spaaza-receipt .first{margin-top:0}.spaaza-receipt .align-center{text-align:center}.spaaza-receipt .align-right{text-align:right}.spaaza-receipt .align-left{text-align:left}.spaaza-receipt .clear{clear:both}.spaaza-receipt .mt0{margin-top:0}.spaaza-receipt .mb0{margin-bottom:0}.spaaza-receipt .preheader{color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0}@media only screen and (max-width:620px){.spaaza-receipt table[class=body] h1,.spaaza-receipt table[class=body] h2,.spaaza-receipt table[class=body] h3,.spaaza-receipt table[class=body] h4{font-weight:600!important}.spaaza-receipt table[class=body] h1{font-size:22px!important}.spaaza-receipt table[class=body] h2{font-size:18px!important}.spaaza-receipt table[class=body] h3{font-size:16px!important}.spaaza-receipt table[class=body] .content,.spaaza-receipt table[class=body] .wrapper{padding:10px!important}.spaaza-receipt table[class=body] .container{padding:0!important;width:100%!important}.spaaza-receipt table[class=body] .btn a,.spaaza-receipt table[class=body] .btn table{width:100%!important}}.spaaza-receipt .receipt-strong{font-weight:700;text-transform:uppercase}.spaaza-receipt .receipt-total td{font-size:inherit}.spaaza-receipt .receipt-emphasis{font-style:italic}.spaaza-receipt .receipt-line-through{text-decoration:line-through}.spaaza-receipt table.receipt-lineitems td,.spaaza-receipt table.receipt-lineitems th,.spaaza-receipt table.receipt-linetaxes td,.spaaza-receipt table.receipt-linetaxes th{width:33%}.spaaza-receipt img.brand_logo{display:block;margin:3em auto;height:6em}.spaaza-receipt h1{text-align:center}.spaaza-receipt .receipt-original-price{display:none}.spaaza-receipt .receipt-original-price.receipt-line-through{display:inline;padding-right:.4em}.spaaza-receipt .btn-download{width:100%;padding-bottom:1em;background-color:#000;border-radius:.2em;text-align:center;font-family:inherit;-webkit-font-smoothing:antialiased;font-size:87%;height:45px!important;line-height:1.6em;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.spaaza-receipt .btn-download a{background-color:#000;border:solid 1px #000;border-radius:.2em;color:#fff;cursor:pointer;display:inline-block;font-weight:700;margin:0;padding:.75em 1.5em;text-decoration:none;text-transform:capitalize}.spaaza-receipt .receipt-footer-message{text-align:center}.spaaza-receipt .receipt-notes p{text-align:center}.spaaza-receipt .barcode{padding:2em 0}.spaaza-receipt .barcode .image{background-position:center top;background-repeat:no-repeat;height:2.8em}';function L(a){function e(t){var e=a.querySelector("script[data-"+t+"]");if(e&&e.textContent)try{return JSON.parse(e.textContent)}catch(e){console.warn("Failed to parse "+t+" data: ",e)}}var t=a.getAttribute("language")||"",r=u(t),n=e("strings"),i=n?m(r,n):r,l=e("receipt");if(l){var o=Math.max(0,parseFloat(a.getAttribute("walletpointsratio")||"")||0);l.wallet_points_ratio=o;var s=a.getAttribute("customnotes")||"";l.custom_notes=s;var c=a.getAttribute("environment")||"";l.environment=c;var p=!0;a.getAttribute("showpoints")&&(p="true"===a.getAttribute("showpoints")),l.show_points=p}return l.download_url=a.getAttribute("download-url")||"https://services-prod.spaaza.com",{receipt:l,langCode:r.langCode,strings:i}}function T(e,t){var a,r=L(e);if(r.receipt){var n=s(r.strings,{$GIVEN_NAME:r.receipt.shopper.first_name,$FAMILY_NAME:r.receipt.shopper.last_name,$CHAIN_NAME:r.receipt.chain.name});a=S(r.receipt,n,r.langCode)}else console.warn("Could not render receipt",r),a=A({},r.strings);t.appendChild(function a(i){if(!i)return null;if("string"==typeof i){var e=i.replace(/%u([0-9a-fA-F]{4})/g,function(e,t){var a=document.createElement("span");return a.innerHTML="&#x"+t,a.innerText});return document.createTextNode(e)}if("number"==typeof i)return document.createTextNode(i+"");var l=document.createElement(i.nodeName);return i.attributes&&Object.keys(i.attributes).forEach(function(e){var a=i.attributes[e];if("function"!=typeof a)if("object"!=typeof a)"string"!=typeof a||l.setAttribute(e,a);else{var r=!0,t=Object.keys(a).map(function(e){var t=a[e];return!0===t?e:!1!==t&&null!=t?(r=!1,e+": "+t):void 0}).filter(function(e){return!!e}).join(r?" ":", ");l.setAttribute(e,t)}else{var n=e.substr(2).toLowerCase();l.addEventListener(n,a)}}),i.children&&i.children.forEach(function(e){var t=a(e);t&&l.appendChild(t)}),l}(h("div",{class:"spaaza-receipt"},h("style",null,M),a)))}function j(e){if(!e.querySelector(".receipt-body")){var t=document.createElement("div");t.className="receipt-body",e.appendChild(t),T(e,t)}}function e(){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null});for(var e=0,t=[].slice.call(document.querySelectorAll("spaaza-receipt"),0);e<t.length;e++){j(t[e])}!function(){if(!("MutationObserver"in window))return;new MutationObserver(function(e){for(var t=function(e){var n=function(e){for(var t=0,a=Array.prototype.slice.call(e,0);t<a.length;t++){var r=a[t];r.nodeType===Node.ELEMENT_NODE&&"spaaza-receipt"===r.nodeName.toLowerCase()?j(r):r.hasChildNodes()&&n(r.childNodes)}};n(e.addedNodes)},a=0,r=e;a<r.length;a++){t(r[a])}}).observe(document,{childList:!0,subtree:!0})}()}"loading"===document.readyState?document.addEventListener("readystatechange",function(){"loading"!==document.readyState&&e()}):e()}();
//# sourceMappingURL=spaaza-receipt.js.map
