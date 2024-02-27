let activePreferences =[];

$('.icon').on('click',(req)=>{
    req.preventDefault();
    console.log('button clicked');
    let classes = req.currentTarget.getAttribute('class').split(' ');
    req.currentTarget.classList.toggle("clicked")
    let preference = (classes[2]);
    let ind = activePreferences.indexOf(preference)
    if( ind === -1 ){
        activePreferences.push(preference);
    }
    else{
        activePreferences.splice(ind,1);
    }
    let form_data = {active : activePreferences};
    JSON.stringify(form_data);
    $.post( "/search", form_data)
    .done(function( data ) {
        const itemsPerPage = 12; // Change this to your desired items per page
        const initialPage = 1;
        displayItems(initialPage, itemsPerPage,data);
        generatePaginationLinks(Math.ceil(data.length / itemsPerPage), initialPage,data);
        // displayUsers(data);
    })
})

function displayItems(pageNumber, itemsPerPage,items) {
const startIndex = (pageNumber - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedItems = items.slice(startIndex, endIndex);

const itemsContainer = document.getElementById('userContainer');
itemsContainer.innerHTML = '';

displayedItems.forEach(item => {
let imgSrc=item.profileImg ;
if(imgSrc ===""){
            if(item.gender === "Male")
                imgSrc='https://www.shutterstock.com/image-vector/businessman-icon-260nw-564112600.jpg';
            else 
                imgSrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09jmvXRSVsoLauaIW8p3wRQkMPIzJ8CguLw&usqp=CAU'
}
const div = document.createElement('div');
div.classList.add('col');
div.innerHTML = `
    <div class="card shadow-sm">
        <img src="${imgSrc}" class="bd-placeholder-img card-img-top" width="100%" height="225">
        <div class="card-body">
            <h3 class="card-title">${item.first_name} ${item.last_name}</h3>
            <p class="card-text">Interests: ${item.interests}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="    ">
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal${item.id}">View</button>
                    <div class="modal fade" id="exampleModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <section class="modal-dialog" style="background-color: #f4f5f7;">
                            <div class="container ">
                            <div class="row d-flex justify-content-center align-items-center">
                                <div class="col p-0 style="border-radius: .5rem;"">
                                <div class="card ">
                                    <div class="row g-0">
                                    <div class="col gradient-custom text-center text-white"
                                        style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                                        <img src="${imgSrc}"
                                        alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
                                        <h5>${item.first_name} ${item.last_name}</h5>
                                        <i class="far fa-edit mb-5"></i>
                                    </div>
                                    <div class="col">
                                        <div class="card-body p-4">
                                        <h6>Information</h6>
                                        <hr class="mt-0 mb-4">
                                        <div class="row pt-1">
                                            <div class="col-12">
                                            <h6>Country</h6>
                                            <p class="text-muted">${item.country}</p>
                                            </div>
                                            <div class="col-12">
                                            <h6>Age</h6>
                                            <p class="text-muted">${item.age}</p>
                                            </div>
                                        </div>
                                        <h6>Bio</h6>
                                        <div class="row pt-1">
                                            <div class="col-12">
                                            <p class="text-muted">${item.bio}</p>
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" style="cursor:pointer;" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                                </div>
                               
                                </div>
                                
                            </div>
                            

                        </section>
                    </div>
                    <button class="like btn btn-sm btn-outline-secondary" data-custom-data="${item.email}" id ="likeButton${item.id}">Like</button>
                </div>
            </div>
        </div>
    </div>
`;
itemsContainer.appendChild(div);

});
$('.like').on('click',(e)=>{
    e.preventDefault();
    const buttonId = e.currentTarget.id;
    const userId = buttonId.substring(10,buttonId.length);

    $.ajax({
        type:"POST",
        url:"/search/like",
        data:{id : userId}
    }).done((data)=>{
    })
})

var socket = io();
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        $('.like').on('click', (e) => {
        console.log(e);
        let re_email =(e.currentTarget.getAttribute('data-custom-data'));
        socket.emit('sendNotification', { recieverEmail: re_email, senderName : name});
        })
}
// Function to generate pagination links


function generatePaginationLinks(totalPages, currentPage,data) {
const paginationContainer = document.getElementById('pagination');
paginationContainer.innerHTML = '';

for (let i = 1; i <= totalPages; i++) {
const pageLink = document.createElement('span');
pageLink.classList.add('page-item');
pageLink.classList.add('page-link');
if (i === currentPage) {
    pageLink.classList.add('active');
}
pageLink.textContent = i;
pageLink.addEventListener('click', () => {
    displayItems(i, 12 , data); // Change 10 to your desired items per page
    generatePaginationLinks(totalPages, i,data);
});
paginationContainer.appendChild(pageLink);
}
}