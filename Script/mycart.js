$(document).ready(()=>
{
    let count = localStorage.getItem("cartCount");
    console.log(count);
    $("#cart-count").text(count);
    
    if(Number(count)>0)
    {
        $("#cart-count").text(`Cart count : ${count}`);
        console.log("setted");


        let cardDetails = JSON.parse(localStorage.getItem("cartDetails"));

        displayProducts(cardDetails);
        
    }
    else
    {
        $("main").css("height","100vh");

        $("#cart-count")
        .addClass("text-danger")
        .text(`Cart is Empty !`);
    }
    


});


function displayProducts(inputArray)
{

    inputArray.forEach((item) => {
        
        $("#displayContainer").append(
        $(`<div></div>`)
        .addClass('d-flex w-75 gap-2 m-5 border rounded p-3')
        .append(
            $(`<img src="${item.path}" />`)
            .addClass("w-25")
            .css("object-fit","contain")
            .css("height","200px")
        )
        .append(
            `<div>
                <h3 class="m-2">${item.name}</h3>
                <p class="m-2">${item.description}</p>
                <h4 class="m-2">&#8377;${item.price}</h4>
            </div>`)
    )

    }); 
}


