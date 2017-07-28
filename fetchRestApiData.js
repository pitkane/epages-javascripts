/*


<script src="/WebRoot/Store/Shops/DemoShop/MediaGallery/fetchRestApiData.js"></script>


<script type="text/javascript">
  DUMP THE SCRIPT BELOW
</script>

*/

// Depends on cartridge FI_GAGAR::AllSeeingEye which maps object AllSeeingEye to
// window object. See https://github.com/vilkasgroup/FI_GAGAR/tree/develop/AllSeeingEye
// for more details

jQuery(document).ready(function($) {
  require(["jquery", "jquery/cookie", "ep/fn/busy"], function($) {
    //
    // Main logic
    //
    try {
      checkAllSeeingEye();
    } catch (error) {
      console.log(error);
      return;
    }

    // verify that product data exists (so that we are on product page)
    if (!("Product" in window.AllSeeingEye)) {
      return;
    }

    fetchProductData("manufacturer")
      .then(function(manufacturer) {
        console.log("Products manufacturer: " + manufacturer);
        // now we should mount it to page
      })
      .catch(function(error) {
        console.log(error);
        return;
      });

    //
    // HELPER FUNCTIONS
    //

    function checkAllSeeingEye() {
      if (!("AllSeeingEye" in window)) {
        throw new Error("AllSeeingEye not defined in window object");
      }

      if (!("RESTAPIURL" in window.AllSeeingEye.Shop)) {
        throw new Error("RESTAPIURL not defined in AllSeeingEye object");
      }
    }

    function mountTextToHtml() {
      jQuery(".ProductDetails.");
    }

    //
    // fetchProductData(attribute)
    //
    // Attribute from: https://developer.epages.com/apps/api-reference/get-shopid-products-productid
    //
    function fetchProductData(attribute) {
      return new Promise((resolve, reject) => {
        // before this checkAllSeeingEye() should have been ran

        var fullUrl =
          window.AllSeeingEye.Shop.RESTAPIURL +
          /products/ +
          window.AllSeeingEye.Product.GUID;

        jQuery.ajax({
          url: fullUrl,
          type: "GET",
          success: function(data, textStatus, jqXHR) {
            console.log(data);
            return resolve(data[attribute]);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            throw new Error("Failed to fetch product data");
          }
        });
      });
    }
  });
});

//
//
//
//
//
//

// resolve needed variables
// console.log(
//   "requestProtocolAndServer: ",
//   window.ep.config.requestProtocolAndServer
// );
// console.log("storeFrontUrl: ", window.ep.config.storeFrontUrl);

// var url =
//   window.ep.config.requestProtocolAndServer ||
//   "http://epages02.mikko.pri/";
// var storefront =
//   window.ep.config.requestProtocolAndServer ||
//   "http://epages02.mikko.pri/epages/DemoShop.sf";

// // extremely shady
// var shopName = storefront.substring(
//   storefront.lastIndexOf("/") + 1,
//   storefront.lastIndexOf(".")
// );

// var restUrl = url + "rs/shops/" + shopName;
// console.log(restUrl);

// var canonicalUrl = window.ep.config.canonicalUrl;
// var productId = /[^/]*$/.exec(canonicalUrl)[0];

// console.log(productId);

// // http: //epages02.mikko.pri/rs/shops/DemoShop/products/?resultsPerPage=100&q=md_49417110
// var requestUrl = restUrl + "/products/?q=" + productId;

// console.log("requestUrl", requestUrl);

// jQuery.ajax({
//   url: requestUrl,
//   type: "GET",
//   success: function(data, textStatus, jqXHR) {
//     console.log(data);

//     var productUrl = data.items[0].links[0].href;

//     jQuery.ajax({
//       url: productUrl,
//       type: "GET",
//       success: function(data, textStatus, jqXHR) {
//         console.log("Manufacturer", data.manufacturer);
//       },
//       error: function(jqXHR, textStatus, errorThrown) {
//         console.log("nounou");
//       }
//     });
//   },
//   error: function(jqXHR, textStatus, errorThrown) {
//     console.log("nounou");
//   }
// });

// "https://www.maalinpaikka.fi/epages/maalinpaikka.sf"
// http://epages02.mikko.pri/rs/shops/DemoShop

// jQuery(function () {
//   jQuery('.InfoArea').load('?ObjectPath=#Shop.Path[url]/Categories/TermsAndConditions .TermsAndConditions');
// });

// helper to log
// console.logf = function(msg, url, line) {
//   try {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open("POST", "?ObjectID=1&ViewAction=JSONLogClientError", true);
//     xmlHttp.setRequestHeader(
//       "Content-type",
//       "application/x-www-form-urlencoded"
//     );
//     xmlHttp.send(
//       "ErrorLocation=" +
//         escape(url + " line " + line) +
//         "&ErrorMessage=" +
//         escape(msg) +
//         "&Location=" +
//         escape(document.location.href) +
//         "&Referrer=" +
//         escape(document.referrer)
//     );
//   } catch (e) {
//     try {
//       console.log(e.toString());
//     } catch (e) {}
//   }
//   return false;
// };

// helper method for using the ePages flags
// if the language requested is already used does nothing
// if the language requested is not the language in use
// clicks the language flag
// function navigateWithFlag(language) {
//   if (epConfig.language === language) {
//     console.logf(
//       "requested to switch to " +
//         language +
//         " but we are already viewing that language"
//     );
//   } else {
//     console.logf(
//       "requested to switch to " + language + ", clicking the flag"
//     );
//     $("body").busy("show");

//     // for safety, if click does not work
//     setTimeout(function() {
//       jQuery("body").busy("hide");
//     }, 4000);

//     // $('.LocaleFlags a[href*="Locale='+language+'"]')[0].click();
//     $('.LocaleFlags a[href*="' + language + '_"]')[0].click();
//   }
// }

// language switcher
// on first page load of the session gets the users country
// from freegeoip and calls navigateWithFlag with the
// desired language
// var cookieName = "LocaleSwitch";
// if ($.cookie(cookieName)) {
//   // cookie already exists language has already been detected
//   console.logf(cookieName + " cookie exists not running locale switch");
// } else {
//   // set the cookie straight away, we dont want to run this multiple times
//   // $.cookie(cookieName, "ran");
//   $.getJSON("http://freegeoip.net/json/?callback=?", function(i) {
//     var country = i.country_code.toLowerCase();
//     console.logf("freegeoip says: " + country);
//     console.logf("current language: " + epConfig.language);
//     if (country === "fi") {
//       navigateWithFlag("fi");
//     } else {
//       navigateWithFlag("en");
//     }
//   });
// }
