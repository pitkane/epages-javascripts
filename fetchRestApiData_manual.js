/*


<script src="/WebRoot/Store/Shops/DemoShop/MediaGallery/fetchRestApiData_manual.js"></script>


<script type="text/javascript">
  DUMP THE SCRIPT BELOW
</script>

*/

jQuery(document).ready(function($) {
  require(["jquery", "jquery/cookie", "ep/fn/busy"], function($) {
    function fetchProductData() {
      // resolve needed variables
      console.log(
        "requestProtocolAndServer: ",
        window.ep.config.requestProtocolAndServer
      );
      console.log("storeFrontUrl: ", window.ep.config.storeFrontUrl);

      var url =
        window.ep.config.requestProtocolAndServer ||
        "http://epages02.mikko.pri/";
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
      var productId = /[^/]*$/.exec(canonicalUrl)[0];

      console.log(productId);

      // http: //epages02.mikko.pri/rs/shops/DemoShop/products/?resultsPerPage=100&q=md_49417110
      var requestUrl = restUrl + "/products/?q=" + productId;

      console.log("requestUrl", requestUrl);

      jQuery.ajax({
        url: requestUrl,
        type: "GET",
        success: function(data, textStatus, jqXHR) {
          console.log(data);

          const productUrl = data.items[0].links[0].href;

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

      // jQuery(function () {
      //   jQuery('.InfoArea').load('?ObjectPath=#Shop.Path[url]/Categories/TermsAndConditions .TermsAndConditions');
      // });
    }

    fetchProductData();
  });
});
