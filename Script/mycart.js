$(document).ready(()=>
{
    let count = localStorage.getItem("cartCount");
    console.log(count);
    $("#cart-count").text(count);
    
    checkCartCount(count);

});


function checkCartCount(count)
{
    if(Number(count)>0)
    {
        $(".detail").show();
        console.log("setted");


        let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));

        displayProducts(cartDetails);
        
    }
    else
    {
        $("main").css("height","100vh");
        $(".detail").hide();

        $("#carts")
        .addClass("text-danger")
        .text(`Cart is Empty !`);
    }
}

let cartDetails = JSON.parse(localStorage.getItem("cartDetails"));



function displayProducts(inputArray)
{
    let linePrice=0;
    
    $("#displayContainer").empty();

    inputArray.forEach((item) => {

        $("#displayContainer").append(
        $(`<div></div>`)
        .addClass('d-flex w-75 gap-4 m-5 border rounded p-3')
        .append(
            $(`<img src="${item.path}" />`)
            .addClass("w-25")
            .css("object-fit","contain")
            .css("height","200px")
        )
        .append(
            $(`<div>
                <h3 class="m-2">${item.name}</h3>
                <p class="m-2">${item.description}</p>
                <h4 class="m-2">&#8377;${item.price}</h4>
                <p>Quantity : ${item.userquantity}</p>
            </div>`)  
            .append(
                $(`<button>Remove</button>`)
                .addClass("btn btn-warning mt-2")
                .click(()=>{

                    cartDetails=cartDetails.filter((curritem)=> curritem.id !== item.id);
                    localStorage.setItem("cartDetails",JSON.stringify(cartDetails));
                    let totalCount = cartDetails.reduce((sum, p) => sum + Number(p.userquantity), 0);
                    localStorage.setItem("cartCount",totalCount);

                        checkCartCount(cartDetails.length);
                        
                        $("#cart-count").text(totalCount);
                })
            )  
        )
    )
    linePrice += Number(item.price) * Number(item.userquantity);
    let totalCount = cartDetails.reduce((sum, p) => sum + Number(p.userquantity), 0);
    $("#display-quantity").html(totalCount);
    $("#display-tprice").html(`&#8377;${linePrice}`);
    $("#display-count").text(cartDetails.length);
    $("#display-dprice").html(`&#8377;${10}`);
    let totalAmount = Number( $("#display-tprice").text().slice(1))-Number($("#display-dprice").text().slice(1));
    $("#display-total").html(`&#8377;${totalAmount}`);
    }
); 
}

$("#remove-all").click((e)=>{
    e.preventDefault();

    cartDetails=[];

    localStorage.setItem("cartDetails",JSON.stringify(cartDetails));
    localStorage.setItem("cartCount",0);
     $("#cart-count").text(0);
    checkCartCount(0);
})


