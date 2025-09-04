$(document).ready(function () 
{

    let count = localStorage.getItem("cartCount");
    console.log(count);
    $("#cart-count").text(count);

    // fetch all product
    getProductsAPI().then(()=>
    {
        getAllProducts(allProducts, "#tab-allproducts");
    });
});


let allProducts = []; // common array
let cartCount = $("#cart-count"); // cart count span element
let cartArray = []; // keep added products

function updateCartCount(count)
{
    cartCount.text(count);
    localStorage.setItem("cartCount",count);
    console.log("Updated count");
}

function storeCartDetails()
{
    localStorage.setItem("cartDetails",JSON.stringify(cartArray));
}

// Fetch and Store in common array
async function getProductsAPI() {
    try {
        const response = await fetch(PRODUCTS_ENDPOINT, { method: 'GET', });
        if (!response.ok) {
            throw new Error("Fetch products failed");
        }

        allProducts = await response.json();
    }
    catch (error) {
        console.log(error);
    }


}

// Fetch and display from common array
function getAllProducts(inputArray, componentId) {
    var tagsample = $(`${componentId}`);;
    var productContainer = $(`<div class="products d-flex gap-5 justify-content-center flex-wrap"></div>`);


    tagsample.empty();

    inputArray.forEach((item) => {


        var productList = 
  $(`<div class="card p-2" style="width: 13rem;"></div>`)
    .append(`<img class="card-img-top" style="height: 200px; object-fit: contain;" 
           src="${item.path}" alt="${item.name}">`)
    .append(`<div class="card-body">
          <h6 class="card-title text-center text-break" style="white-space: normal;">
              ${item.name}
          </h6>
          <h5 class="text-center">&#8377;${item.price}</h5>
      </div>`)
    .append(
        $(`<div class="card-footer"></div>`)
        .append(
            $(`<button></button>`)
            .text("Add to cart")
            .addClass("btn btn-info w-100")
            .click(()=>{

                cartArray.push(item);
                storeCartDetails();

                let value = Number(cartCount.text());
                value++;
                updateCartCount(value.toString());
            })
            
        ))

        productContainer.append(productList);
    });
    tagsample.append(productContainer);
};



// Nav tab click events handling

$("#bags").click(function () {
    let filteredArray = allProducts.filter((item) => {
        return item.category == "1";
    });

    getAllProducts(filteredArray, "#tab-bags");
});

$("#clothes").click(function () {
    let filteredArray = allProducts.filter((item) => {
        return item.category == "2";
    });

    getAllProducts(filteredArray, "#tab-clothes");
});

$("#homecare").click(function () {
    let filteredArray = allProducts.filter((item) => {
        return item.category == "3";
    });

    getAllProducts(filteredArray, "#tab-homecare");
});

$("#electronics").click(function () {
    let filteredArray = allProducts.filter((item) => {
        return item.category == "4";
    });

    getAllProducts(filteredArray, "#tab-electronics");
});

$("#allproducts").click(function () {
    
    getAllProducts(allProducts, "#tab-allproducts");
});