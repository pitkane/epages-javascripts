/*
1. Script parses REST API url from the current web page
2. Parses product id from the page, and uses that to fetch data from ePages REST API
3. Mounts data to Product page

<script src="/WebRoot/Store/Shops/DemoShop/MediaGallery/fetchRestApiData_manual.js"></script>

<script type="text/javascript">
  DUMP THE SCRIPT BELOW
</script>

*/

jQuery(document).ready(function($) {
  require(["jquery", "jquery/cookie", "ep/fn/busy"], function($) {
    fetchProductDataFromRest();
  });
});

function fetchProductDataFromRest() {
  // resolve needed variables
  console.log(
    "requestProtocolAndServer: ",
    window.ep.config.requestProtocolAndServer
  );
  console.log("storeFrontUrl: ", window.ep.config.storeFrontUrl);

  var url =
    window.ep.config.requestProtocolAndServer || "http://epages02.mikko.pri/";
  var storefront =
    window.ep.config.requestProtocolAndServer ||
    "http://epages02.mikko.pri/epages/DemoShop.sf";

  // extremely shady
  var shopName = storefront.substring(
    storefront.lastIndexOf("/") + 1,
    storefront.lastIndexOf(".")
  );

  var restUrl = url + "rs/shops/" + shopName;
  console.log(restUrl);

  var canonicalUrl = window.ep.config.canonicalUrl;
  var productNumber = /[^/]*$/.exec(canonicalUrl)[0];

  console.log("productNumber: ", productNumber);

  // http: //epages02.mikko.pri/rs/shops/DemoShop/products/?resultsPerPage=100&q=md_49417110
  var requestUrl = restUrl + "/products/?q=" + productNumber;

  console.log("requestUrl", requestUrl);

  jQuery.ajax({
    url: requestUrl,
    type: "GET",
    success: function(data, textStatus, jqXHR) {
      console.log(data);

      var productUrl = data.items[0].links[0].href;

      jQuery.ajax({
        url: productUrl,
        type: "GET",
        success: function(data, textStatus, jqXHR) {
          console.log("Manufacturer", data.manufacturer);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("nounou");
        }
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("nounou");
    }
  });

  // "https://www.maalinpaikka.fi/epages/maalinpaikka.sf"
  // http://epages02.mikko.pri/rs/shops/DemoShop
}
