const displayuserContainer = $("#displayUserContainer");
$('.countrypicker').countrypicker();
const searchButton = $("#searchButton");
function createUsers(arr){
    let n=arr.length;
    if(n==0){
        alert("There are no users with the entered value.")
    }
    let htmlCode =""
    console.log(arr)
    for(let i=0;i<n;i++){
        let imgSrc = ""
        if(arr[i].gender == "Male") 
        imgSrc="https://www.shutterstock.com/image-vector/businessman-icon-260nw-564112600.jpg";
        else
        imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09jmvXRSVsoLauaIW8p3wRQkMPIzJ8CguLw&usqp=CAU"
        htmlCode+= `
        <div class="col">
        <div class="card shadow-sm" style="max-width:325px;">
            <img class="bd-placeholder-img card-img-top" src="${imgSrc}">
            <div class="card-body">
            <h5 class="card-title">${arr[i].first_name} ${arr[i].last_name}</h5>
            <p class="card-text">Age : ${arr[i].age}</p><pclass="card-text">country: ${arr[i].country}</p>
            </div>

        </div>
        </div>
        `
    }
    htmlCode = `<h2>User Details </h2><div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
    ` +htmlCode +`</div>`;
    displayuserContainer.html(htmlCode);
}


searchButton.click((event)=>{
    event.preventDefault();
    console.log("Button Clicked")
    let form_data = {
        "userName": $('#username').val(),
        "country" : $('#country').attr("data-tokens"),
        "startAge" : $('#stAge').val(),
        "endAge" :$('#enAge').val()
    }
    console.log(country);
    $.post( "/users", form_data)
        .done(function( data ) {

        createUsers(data);
        console.log( "Data Loaded: " , data );
    });
})