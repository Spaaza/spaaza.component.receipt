!function(){"use strict";var e={"en-GB":{langCode:"en-GB",brand:{title:"Your Receipt",message:"Hi there $GIVEN_NAME, thanks for your purchase!"},details:{message:"Your order details from $CHAIN_NAME:",charged:"CHARGED","order-number":"Order number",date:"Date",payment:"Payment method","employee-name":"Employee"},lineitems:{name:"Name",quantity:"Qty",price:"Price"},taxes:{"tax-rate":"VAT Rate","order-value":"Order value","tax-value":"VAT"},paymentmethods:{},totals:{subtotal:"Subtotal",total:"Total",voucher:"Voucher"},wallet:{earned:"earned",spent:"spent","new-balance":"Your new balance"},download:{label:"Download your PDF Receipt"},store:{message:"Thank you!"},error:{message:"There was a problem showing this receipt."}},"nl-NL":{langCode:"nl-NL",brand:{title:"Jouw Bon",message:"Bedankt voor je aankoop, $GIVEN_NAME!"},details:{message:"Informatie over je aankoop bij $CHAIN_NAME:",charged:"In rekening gebracht","order-number":"Bestellingsnummer",date:"Datum",payment:"Betaalmethode","employee-name":"Werknemer"},lineitems:{name:"Naam",quantity:"Aantal",price:"Prijs"},taxes:{"tax-rate":"BTW %","order-value":"Waarde","tax-value":"BTW"},paymentmethods:{},totals:{subtotal:"Subtotaal",total:"Totaal",voucher:"Kortingsbon"},wallet:{earned:"verdiend",spent:"uitgegeven","new-balance":"Jouw nieuwe totaal"},download:{label:"Download je bon als PDF"},store:{message:"Hartelijk bedankt!"},error:{message:"Er was een probleem met het tonen van deze bon."}}},t=function(t){return e[function(e){var t="en-GB";return"nl"!==(e=e.toLowerCase().trim())&&"nl-"!==e.substr(0,3)&&"nl_"!==e.substr(0,3)||(t="nl-NL"),t}(t)]},a=function(e,t){var a={};for(var n in e)e.hasOwnProperty(n)&&(a[n]=t(e[n],n));return a},n=function(e,t){var a={};for(var n in e)e.hasOwnProperty(n)&&"object"==typeof e[n]&&(a[n]=t(e[n],n));return a},r=function(e,t){return function(e,t){return n(e,function(e,n){return a(e,t)})}(e,function(e){return function(e,t){var a=e;for(var n in t)t.hasOwnProperty(n)&&(a=a.replace(new RegExp(n.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|\#]/g,function(e){return"\\"+e}),"g"),t[n]));return a}(e,t)})},i=function(e,t){return n(e,function(e,n){var r=t[n];return a(e,function(e,t){return r&&t in r?r[t]:e})})},l=function(e,t){var a="pts"===t,n=!a,r=(+e).toFixed(a?0:2);return n?t+" "+r:r+" "+t},o=function(e,t){return(e||[]).map(function(e){return e[t]}).reduce(function(e,t){return e+t},0)},s=function(e,t,a,n){return(e||[]).filter(function(e){return e[a]===n}).map(function(e){return e[t]}).reduce(function(e,t){return e+t},0)};function c(e,t){for(var a,n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i=n.length?(a=[]).concat.apply(a,n):null;if("string"==typeof e)return{nodeName:e,attributes:t,children:i};var l=t;return i&&(l.children=i),e(l)}var p=function(e,t){return function(e,t){return c("table",null,e.logoURL&&c("tr",null,c("td",null,c("img",{class:"brand_logo",src:e.logoURL}))),t.title&&c("tr",null,c("td",null,c("h1",null,t.title))),t.message&&c("tr",null,c("td",null,c("p",null,t.message))))}({logoURL:e.chain.logo_url},t.brand)},u=function(e,t,a){return function(e,t,a){var n=t.message?c("tr",null,c("td",{colSpan:2},t.message)):null,r=e.total?c("tr",{class:"receipt-strong"},c("td",{class:""},t.charged),c("td",{class:"align-right"},l(e.total,e.currencySymbol))):null,i=e.retailerCode?c("tr",null,c("td",{class:""},t["order-number"]),c("td",{class:"align-right"},"#",e.retailerCode)):null,o=e.employeeName?c("tr",null,c("td",{class:""},t["employee-name"]),c("td",{class:"align-right"},e.employeeCode)):null;return c("table",null,n,r,i,e.date?c("tr",null,c("td",{class:""},t.date),c("td",{class:"align-right"},new Date(e.date).toLocaleString(a))):null,o)}({total:e.total_value,date:e.timestamp,retailerCode:e.retailer_basket_code,currencySymbol:e.chain.currency_symbol,employeeName:e.employee.name,employeeCode:e.employee.code},t.details,a)},d=function(e,t){return function(e,t){if(!e.lineitems||!e.lineitems.length)return null;var a=e.currencySymbol;return c("table",{class:"receipt-lineitems"},c("tr",null,c("th",{class:"align-left"},t.name),c("th",{class:"align-center"},t.quantity),c("th",{class:"align-right"},t.price)),e.lineitems.map(function(e){var t=Math.abs(e.original_price)>Math.abs(e.sale_price);return c("tr",{class:"line-item"},c("td",{class:"align-left"},c("div",{class:"line-item-name"},e.description||e.barcode)),c("td",{class:"align-center"},e.quantity),c("td",{class:"align-right"},c("span",{class:{"receipt-original-price":!0,"receipt-line-through":t}},l(e.original_price,a)),c("span",{class:"receipt-sale-price receipt-strong"},l(e.sale_price,a))))}))}({lineitems:e.line_items,currencySymbol:e.chain.currency_symbol},t.lineitems)},m=function(e,t,a){return function(e,t,a){if(!e.taxes||!e.taxes.length)return null;var n=e.currencySymbol;return c("table",{class:"receipt-linetaxes"},c("tr",null,c("th",{class:"align-left"},t["tax-rate"]),c("th",{class:"align-center"},t["order-value"]),c("th",{class:"align-right"},t["tax-value"])),e.taxes.map(function(e){return c("tr",{class:"tax-line"},c("td",{class:"var-rate align-left"},Math.round(100*e.rate),"%"),c("td",{class:"order-value align-center"},l(e.order_value,n)),c("td",{class:"vat align-right"},l(e.tax_value,n)))}))}({taxes:e.tax_lines,currencySymbol:e.chain.currency_symbol},t.taxes)},h=function(e,t,a){return function(e,t,a){if(!e.paymentMethods||!e.paymentMethods.length)return null;var n=e.currencySymbol;return c("table",{class:"receipt-paymentmethods"},e.paymentMethods.map(function(e){return c("tr",{class:"payment-method"},c("td",{class:"var-rate align-left"},e.payment_method),c("td",{class:"order-value align-right"},l(e.payment_amount,n)))}))}({paymentMethods:e.payment_methods,currencySymbol:e.chain.currency_symbol},t.paymentmethods)},g=function(e,t){return function(e,t){return c("table",{class:"receipt-totals"},e.basketVouchers.map(function(a){return c("tr",null,c("td",null,t.voucher,": ",a.campaign_title),c("td",{align:"right",class:"voucher"},l(-1*a.amount,e.currencySymbol)))}),c("tr",{class:"receipt-subtotal"},c("td",null,t.subtotal),c("td",{class:"align-right"},l(e.subtotal,e.currencySymbol))),c("tr",{class:"receipt-strong receipt-total"},c("td",null,t.total),c("td",{class:"align-right"},l(e.total,e.currencySymbol))))}({total:e.total_value,subtotal:e.subtotal,loyaltyVouchersSpent:s(e.basket_vouchers,"amount","type","loyalty"),walletVouchersSpent:s(e.basket_vouchers,"amount","type","wallet"),currencySymbol:e.chain.currency_symbol,basketVouchers:e.basket_vouchers},t.totals)},b=function(e,t){var a=e.wallet,n=e.totalEarned,r=e.totalSpent,i=e.currencySymbol,o=e.showPoints;if(!a||!o||!n&&!r)return null;return c("table",{class:"receipt-wallet"},c("tr",null,c("td",{class:"receipt-strong"},a.title)),n?c("tr",null,c("td",null,a.title," ",t.earned),c("td",{align:"right"},l(n,i))):null,a.contributions.length>1&&a.contributions.map(function(e){return c("tr",null,c("td",null,"    ",e.campaign_title),c("td",{align:"right"},l(e.amount,i)))}),r?c("tr",null,c("td",null,a.title," ",t.spent),c("td",{align:"right"},l(r,i))):null,c("tr",null,c("td",null,t["new-balance"]),c("td",{align:"right",class:"receipt-strong"},l(a.total,i))))},f=function(e,t){return t<=0?e:Math.round(e*t)},y=function(e,t){return b({wallet:e.monetary_wallet&&{title:e.monetary_wallet.title,total:f(e.monetary_wallet.total,e.wallet_points_ratio),contributions:e.monetary_wallet.contributions.map(function(t){return{campaign_title:t.campaign_title,amount:f(t.amount,e.wallet_points_ratio)}})},showPoints:!0,totalEarned:f(o(e.monetary_wallet?e.monetary_wallet.contributions:[],"amount"),e.wallet_points_ratio),totalSpent:f(s(e.basket_vouchers,"amount","type","wallet"),e.wallet_points_ratio),currencySymbol:e.wallet_points_ratio>0?"pts":e.chain.currency_symbol},t.wallet)},v=function(e,t){return b({wallet:e.points_wallet,showPoints:e.show_points,totalEarned:e.points_wallet&&o(e.points_wallet.contributions,"amount")||0,totalSpent:0,currencySymbol:"pts"},t.wallet)},w=function(e,t,a){if(!e.download_url)return null;return c("div",{class:"btn-download"},c("form",{target:"_blank",method:"POST",action:e.download_url+"/receipts/print/"+e.id+".pdf"},c("input",{type:"hidden",name:"content",value:"<b>empty</b>"})),c("a",{onClick:function(e){var t=e.target.closest("div.spaaza-receipt"),a=e.target.parentElement.querySelector("form"),n=a.querySelector('input[name="content"]');n.value="",n.value=t.outerHTML,a.submit(),e.preventDefault()}},t.download.label))},z=function(e,t,a){var n=e.chain.business;return function(e,t,a){return e.name||e.address||e.postalcode||e.city||e.contact||e.email||e.website?c("table",{class:"receipt-store"},c("tr",null,c("td",{class:"align-left"},e.name&&c("div",null,e.name),e.address&&c("div",null,e.address),(e.postalcode||e.city)&&c("div",null,e.postalcode," ",e.city),e.email&&c("div",null,c("a",{href:"mailto:"+e.email},e.email)),e.website&&c("div",null,c("a",{href:e.website,target:"_blank"},e.website)),e.contact&&c("a",{href:"tel:"+e.contact},e.contact)))):null}({name:n.name,contact:n.phone_number,email:n.email,website:n.website_url,address:(n.address.address_1+" "+n.address.address_2+" "+n.address.address_3).trim(),postalcode:n.address.postal_code,city:n.address.towncity},t.store)},_=function(e,t){return function(e){return e.retailerCode?"staging"===e.environment||"test01"===e.environment?c("div",{class:"content barcode"},c("div",{class:"image",title:"Barcode: "+e.retailerCode,style:"background-image: url(https://missetam-test01.spaaza.com/barcode/"+e.retailerCode+")"})):c("div",{class:"content barcode"},c("div",{class:"image",title:"Barcode: "+e.retailerCode,style:"background-image: url(https://acme-prod.spaaza.com/barcode/"+e.retailerCode+")"})):null}({retailerCode:e.retailer_basket_code,environment:e.environment})};function x(e){return c("table",{class:"divider-wrapper"},c("tr",null,c("td",{class:"divider-spacer"},c("table",{class:"divider",cellPadding:0,cellSpacing:0},c("tr",null,c("td",null))))))}var k=function(e,t){return function(e){if(!e.notes&&!e.customNotes)return null;return c("div",{class:"receipt-notes"},e.customNotes?c("p",null,e.customNotes):null,!e.notes||e.customNotes?null:c("p",null,e.notes))}({notes:e.notes,customNotes:e.custom_notes})},E=function(e,t,a){var n=function(n){return n(e,t,a)},r=function(e){var t=n(e);return t?c("div",null,c(x,null),t):t};return c("div",{class:"main content"},c("section",null,n(p),n(u)),c("section",null,r(d),r(m),r(g),n(h),r(y),r(v),c("div",{class:"download"},c(x,null),n(w))),c("section",null,r(z),r(k),n(_)))},C=function(e,t,a){return c("div",{class:"main content"},c("p",null,t.error.message))},N='.spaaza-receipt{font-size:16px;font-family:"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.6em;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;color:#000;text-align:left}@media print{.spaaza-receipt{font-size:7pt}.spaaza-receipt div.download{display:none}}.spaaza-receipt html#pdf{font-size:9pt}.spaaza-receipt html#pdf div.download{display:none}.spaaza-receipt section{margin:0}.spaaza-receipt a,.spaaza-receipt div,.spaaza-receipt table,.spaaza-receipt td{box-sizing:border-box}.spaaza-receipt img{-ms-interpolation-mode:bicubic;max-width:100%}.spaaza-receipt table{border-collapse:separate!important;width:100%}.spaaza-receipt table td{font-size:87%}.spaaza-receipt table th{vertical-align:top;font-size:75%;text-transform:uppercase;font-weight:400;color:#aaa}.spaaza-receipt .ExternalClass{width:100%}.spaaza-receipt .ExternalClass,.spaaza-receipt .ExternalClass div,.spaaza-receipt .ExternalClass font,.spaaza-receipt .ExternalClass p,.spaaza-receipt .ExternalClass span,.spaaza-receipt .ExternalClass td{line-height:100%}.spaaza-receipt .body{background-color:#f6f6f6;width:100%}.spaaza-receipt .container{display:block;margin:0 auto;max-width:36em;padding:.6em;width:auto}.spaaza-receipt .content{display:block;max-width:36em;margin:0 auto;padding:.6em}.spaaza-receipt .main{background:#fff;border:1px solid #e9e9e9;border-radius:3px;width:100%;padding:2em}.spaaza-receipt .wrapper{padding:2em}.spaaza-receipt .content-block{padding:0 0 2em}.spaaza-receipt .header{margin-bottom:2em;margin-top:1.5em;width:100%}.spaaza-receipt .footer{clear:both;width:100%;font-size:75%;color:#999}.spaaza-receipt .footer td{padding:2em 0}.spaaza-receipt h1,.spaaza-receipt h2,.spaaza-receipt h3,.spaaza-receipt h4{color:#111!important;font-family:inherit;font-weight:400;line-height:1.4em;margin:0;margin-bottom:2em}.spaaza-receipt h1{font-size:230%;text-transform:capitalize;font-weight:300}.spaaza-receipt h2{font-size:150%}.spaaza-receipt h3{font-size:120%}.spaaza-receipt h4{font-size:87%;font-weight:500}.spaaza-receipt p{font-family:inherit;font-weight:400;margin:0 0 1.2em 0}.spaaza-receipt a{color:#000;text-decoration:underline}.spaaza-receipt .word-wrap,.spaaza-receipt code,.spaaza-receipt pre{word-break:break-word;word-wrap:break-word;-webkit-hyphens:auto;-moz-hyphens:auto;hyphens:auto}.spaaza-receipt .divider{border-collapse:separate}.spaaza-receipt .divider-spacer{padding:1.5em 0}.spaaza-receipt .divider td{border-top:1px solid #ccc;line-height:0;font-size:0;height:1px;margin:0;padding:0}.spaaza-receipt .last{margin-bottom:0}.spaaza-receipt .first{margin-top:0}.spaaza-receipt .align-center{text-align:center}.spaaza-receipt .align-right{text-align:right}.spaaza-receipt .align-left{text-align:left}.spaaza-receipt .clear{clear:both}.spaaza-receipt .mt0{margin-top:0}.spaaza-receipt .mb0{margin-bottom:0}.spaaza-receipt .preheader{color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0}@media only screen and (max-width:620px){.spaaza-receipt table[class=body] h1,.spaaza-receipt table[class=body] h2,.spaaza-receipt table[class=body] h3,.spaaza-receipt table[class=body] h4{font-weight:600!important}.spaaza-receipt table[class=body] h1{font-size:22px!important}.spaaza-receipt table[class=body] h2{font-size:18px!important}.spaaza-receipt table[class=body] h3{font-size:16px!important}.spaaza-receipt table[class=body] .content,.spaaza-receipt table[class=body] .wrapper{padding:10px!important}.spaaza-receipt table[class=body] .container{padding:0!important;width:100%!important}.spaaza-receipt table[class=body] .btn a,.spaaza-receipt table[class=body] .btn table{width:100%!important}}.spaaza-receipt .receipt-strong{font-weight:700;text-transform:uppercase}.spaaza-receipt .receipt-total td{font-size:inherit}.spaaza-receipt .receipt-emphasis{font-style:italic}.spaaza-receipt .receipt-line-through{text-decoration:line-through}.spaaza-receipt table.receipt-lineitems td,.spaaza-receipt table.receipt-lineitems th,.spaaza-receipt table.receipt-linetaxes td,.spaaza-receipt table.receipt-linetaxes th{width:33%}.spaaza-receipt img.brand_logo{display:block;margin:3em auto;height:6em}.spaaza-receipt h1{text-align:center}.spaaza-receipt .receipt-original-price{display:none}.spaaza-receipt .receipt-original-price.receipt-line-through{display:inline;padding-right:.4em}.spaaza-receipt .btn-download{width:100%;padding-bottom:1em;background-color:#000;border-radius:.2em;text-align:center;font-family:inherit;-webkit-font-smoothing:antialiased;font-size:87%;height:45px!important;line-height:1.6em;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.spaaza-receipt .btn-download a{background-color:#000;border:solid 1px #000;border-radius:.2em;color:#fff;cursor:pointer;display:inline-block;font-weight:700;margin:0;padding:.75em 1.5em;text-decoration:none;text-transform:capitalize}.spaaza-receipt .receipt-footer-message{text-align:center}.spaaza-receipt .receipt-notes p{text-align:center}.spaaza-receipt .barcode{padding:2em 0}.spaaza-receipt .barcode .image{background-position:center top;background-repeat:no-repeat;height:2.8em}';function S(e,a){var n,l=function(e){var a=function(t){var a=e.querySelector("script[data-"+t+"]");if(a&&a.textContent)try{return JSON.parse(a.textContent)}catch(e){console.warn("Failed to parse "+t+" data: ",e)}},n=e.getAttribute("language")||"",r=t(n),l=a("strings"),o=l?i(r,l):r,s=a("receipt");if(s){var c=Math.max(0,parseFloat(e.getAttribute("walletpointsratio")||"")||0);s.wallet_points_ratio=c;var p=e.getAttribute("customnotes")||"";s.custom_notes=p;var u=e.getAttribute("environment")||"";s.environment=u;var d=!0;e.getAttribute("showpoints")&&(d="true"===e.getAttribute("showpoints")),s.show_points=d}return s.download_url=e.getAttribute("download-url")||"https://services-prod.spaaza.com",{receipt:s,langCode:r.langCode,strings:o}}(e);if(l.receipt){var o=r(l.strings,{$GIVEN_NAME:l.receipt.shopper.first_name,$FAMILY_NAME:l.receipt.shopper.last_name,$CHAIN_NAME:l.receipt.chain.name});n=E(l.receipt,o,l.langCode)}else console.warn("Could not render receipt",l),n=C({},l.strings,l.langCode);a.appendChild(function e(t){if(!t)return null;if("string"==typeof t){var a=t.replace(/%u([0-9a-fA-F]{4})/g,function(e,t){var a=document.createElement("span");return a.innerHTML="&#x"+t,a.innerText});return document.createTextNode(a)}if("number"==typeof t)return document.createTextNode(t+"");var n=document.createElement(t.nodeName);return t.attributes&&Object.keys(t.attributes).forEach(function(e){var a=t.attributes[e];if("function"!=typeof a)if("object"!=typeof a)"string"!=typeof a||n.setAttribute(e,a);else{var r=!0,i=Object.keys(a).map(function(e){var t=a[e];return!0===t?e:!1!==t&&null!==t&&void 0!==t?(r=!1,e+": "+t):void 0}).filter(function(e){return!!e}).join(r?" ":", ");n.setAttribute(e,i)}else{var l=e.substr(2).toLowerCase();n.addEventListener(l,a)}}),t.children&&t.children.forEach(function(t){var a=e(t);a&&n.appendChild(a)}),n}(c("div",{class:"spaaza-receipt"},c("style",null,N),n)))}function A(e){if(!e.querySelector(".receipt-body")){var t=document.createElement("div");t.className="receipt-body",e.appendChild(t),S(e,t)}}function M(){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null});for(var e=0,t=[].slice.call(document.querySelectorAll("spaaza-receipt"),0);e<t.length;e++){A(t[e])}!function(){if(!("MutationObserver"in window))return;new MutationObserver(function(e){for(var t=0,a=e;t<a.length;t++)for(var n=a[t],r=Array.prototype.slice.call(n.addedNodes,0),i=0,l=r;i<l.length;i++){var o=l[i];o.nodeType===Node.ELEMENT_NODE&&"spaaza-receipt"===o.nodeName.toLowerCase()&&A(o)}}).observe(document,{childList:!0,subtree:!0})}()}"loading"===document.readyState?document.addEventListener("readystatechange",function(){"loading"!==document.readyState&&M()}):M()}();
//# sourceMappingURL=spaaza-receipt.js.map
