$(document).ready(()=>
{
    let count = localStorage.getItem("cartCount");
    console.log(count);
    $("#cart-count").text(count);
});


$(".buy-button").click(() =>
    {
        window.location.href="products.html"
    }
);
