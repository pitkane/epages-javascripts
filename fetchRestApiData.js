/*


<script src="/WebRoot/Store/Shops/DemoShop/MediaGallery/fetchRestApiData.js"></script>


<script type="text/javascript">
  DUMP THE SCRIPT BELOW
</script>

*/

jQuery(document).ready(function ($) {
  require(["jquery", "jquery/cookie", "ep/fn/busy"], function ($) {

    function fetchProductData() {
      // resolve needed variables
      console.log("requestProtocolAndServer: ", window.ep.config.requestProtocolAndServer);
      console.log("storeFrontUrl: ", window.ep.config.storeFrontUrl);

      var url = window.ep.config.requestProtocolAndServer || "http://epages02.mikko.pri/";
      var storefront = window.ep.config.requestProtocolAndServer || "http://epages02.mikko.pri/epages/DemoShop.sf";

      // extremely shady
      var shopName = storefront.substring(storefront.lastIndexOf("/") + 1, storefront.lastIndexOf("."))

      var restUrl = url + "rs/shops/" + shopName;
      console.log(restUrl)

      var canonicalUrl = window.ep.config.canonicalUrl;
      var productId = /[^/]*$/.exec(canonicalUrl)[0];

      console.log(productId)

      // http: //epages02.mikko.pri/rs/shops/DemoShop/products/?resultsPerPage=100&q=md_49417110
      var requestUrl = restUrl + "/products/?q=" + productId

      console.log("requestUrl", requestUrl)

      jQuery.ajax({
        url: requestUrl,
        type: "GET",
        success: function (data, textStatus, jqXHR) {
          console.log(data)

          const productUrl = data.items[0].links[0].href

          jQuery.ajax({
            url: productUrl,
            type: "GET",
            success: function (data, textStatus, jqXHR) {
              console.log("Manufacturer", data.manufacturer)
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("nounou")
            }
          });

        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("nounou")
        }
      });

      // "https://www.maalinpaikka.fi/epages/maalinpaikka.sf"
      // http://epages02.mikko.pri/rs/shops/DemoShop

      // jQuery(function () {
      //   jQuery('.InfoArea').load('?ObjectPath=#Shop.Path[url]/Categories/TermsAndConditions .TermsAndConditions');
      // });

    }

    fetchProductData();

  });


});


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
