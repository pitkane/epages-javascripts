/*

//Depends on cartridge FI_GAGAR::AllSeeingEye which maps object AllSeeingEye to
// window object. See https://github.com/vilkasgroup/FI_GAGAR/tree/develop/AllSeeingEye
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
  });
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
