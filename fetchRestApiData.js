/*

//Depends on cartridge FI_GAGAR::AllSeeingEye which maps object AllSeeingEye to
// epConfig object. See https://github.com/vilkasgroup/FI_GAGAR/tree/develop/AllSeeingEye
// for more details

// Provides function to fetch wanted product data from REST API. If no attribute is given, returns whole product data object.

<script src="/WebRoot/Store/Shops/DemoShop/MediaGallery/fetchRestApiData.js"></script>

<script type="text/javascript">
  DUMP THE SCRIPT BELOW
</script>

*/

jQuery(document).ready(function($) {
  require(["jquery"], function($) {
    //
    // Main logic
    //
    try {
      checkAllSeeingEye();
    } catch (error) {
      console.log(error);
      return;
    }

    // verify that we are on a product page (no mobileSF support, responsive all the things)
    //  || PageTypeAlias === "MobileSF-Product"
    var PageTypeAlias = epConfig.AllSeeingEye.v1.PageType.Alias;
    if (PageTypeAlias !== "SF-Product") {
      return;
    }

    fetchProductData("manufacturer")
      .then(function(manufacturer) {
        mountTextToProductPage(manufacturer);
        return;
      })
      .catch(function(error) {
        console.log(error);
        return;
      });
  });
});

//
// HELPER FUNCTIONS
//

function mountTextToProductPage(manufacturer) {
  console.log(manufacturer);
  jQuery(".ProductRating").after("<p>Valmistaja: " + manufacturer + "</p>");
}

function checkAllSeeingEye() {
  if (!("epConfig" in window)) {
    throw new Error("epConfig not defined");
  }

  if (!("AllSeeingEye" in epConfig)) {
    throw new Error("AllSeeingEye not defined in epConfig object");
  }

  if (!("RESTAPIURL" in epConfig.AllSeeingEye.v1.Shop)) {
    throw new Error("RESTAPIURL not defined in AllSeeingEye object");
  }

  return;
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
      epConfig.AllSeeingEye.v1.Shop.RESTAPIURL +
      /products/ +
      epConfig.AllSeeingEye.v1.Object.GUID;

    jQuery.ajax({
      url: fullUrl,
      type: "GET",
      success: function(data, textStatus, jqXHR) {
        console.log(data);

        // return the whole product object if no attribute is given
        if (attribute === undefined) {
          return resolve(data);
        } else {
          return resolve(data[attribute]);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        return reject("Failed to fetch product data");
      }
    });
  });
}
