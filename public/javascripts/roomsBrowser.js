let interestToIconMapper = {} 
interestToIconMapper['outdoor'] = 'images/hiking.png';
interestToIconMapper['cooking'] = 'images/cooking.png';
interestToIconMapper['gaming'] = 'images/gamepad.png';
interestToIconMapper['art'] = "images/art.png";
interestToIconMapper['travel'] = "images/travel-luggage.png";
interestToIconMapper['fitness'] = "images/dumbbell.png";
interestToIconMapper['reading'] = "images/book.png";
interestToIconMapper['music'] = "images/music.png";
interestToIconMapper['technology'] = "images/innovation.png";
interestToIconMapper['fashion'] = "images/trade-show.png";
interestToIconMapper['photography'] = "images/camera.png"
interestToIconMapper['science'] = "images/atom.png";

const socket = io();

socket.on('room-join-message',(data)=>{
    $('#chatMessagesContainer').append(`<div class="text-center"><p>${data}</p></div>`)
})

socket.on("room-message",(payload)=>{
    let date = new Date(payload.updatedAt);
    displayMessageBottom(date,payload.fromP,payload.from,payload.message);

})

function loadData(page,interestName){
    $.ajax({
        method:'GET',
        url:`/rooms/${interestName}?pageNo=${page}`
    }).then((data)=>{
        data.forEach(item => {
            let date = new Date(item.updatedAt);
            displayMessage(date,item.result.profileImg,item.result.first_name,item.message)
        });
        let buttonData = `<div class="d-flex align-items-center justify-content-center"> <btn class="btn btn-sm btn-outline-dark" id="loadMoreDataBtn">Load previous messages</btn> </div>`
        $('#chatMessagesContainer').prepend(buttonData);
        $('#loadMoreDataBtn').on('click',(e)=>{
            e.preventDefault();
            loadData(page+1,interestName);
            $('#loadMoreDataBtn').remove();
        })
    })
}

function displayMessage(date,profileImg,first_name,message){
    htmlData = `
    <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time"> ${date.getHours()}: ${date.getMinutes()}</span>
            <div class="d-flex">
                <img class="mx-2" src="${profileImg}" alt="profilepic">
                
                <div style="display:flex;align-items:center;">${first_name}</div>
            </div>
        </div>
        <div class="message other-message float-left">${message} </div>
    </li>`
    $('#chatMessagesContainer').prepend(htmlData);
}

function displayMessageBottom(date,profileImg,first_name,message){
    htmlData = `
    <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time"> ${date.getHours()}: ${date.getMinutes()}</span>
            <div class="d-flex">
                <img class="mx-2" src="${profileImg}" alt="profilepic">
                
                <div style="display:flex;align-items:center;">${first_name}</div>
            </div>
        </div>
        <div class="message other-message float-left">${message} </div>
    </li>`
    $('#chatMessagesContainer').append(htmlData);
}

function displayChatHeader(interestName){
    const htmlData = `
    <div class="mx-1" style="display: flex; align-items: center;justify-content: space-between;">
        <img src=${interestToIconMapper[interestName]} class="img-thumbnail">
        <h6>${interestName.toUpperCase()}</h6>
    </div>`
    $('#chatHeaderContainer').html(htmlData);
}

function displayChat(interestName){
    $('#chatMessagesContainer').html("")
    let page = 1;
    loadData(page,interestName);
}

function joinRoom(interestName){
    socket.emit('join-room', interestName) ;
}
function displaySendButton(interestName){
    let buttonData = 
    `<div class="input-group-prepend ">
        <span class="input-group-text"><button id="sendButton" class=${interestName}><i class="fa fa-send"></button></i></span>
    </div>` ;
    $('#sendButtonContainer').html(buttonData);
}

$('.interests').on('click',(e)=>{
    e.preventDefault();
    let interestId = e.currentTarget.id;
    let interestName = interestId.substring(0,interestId.length-3);
    joinRoom(interestName);
    displayChatHeader(interestName);
    displayChat(interestName);
    displaySendButton(interestName);
    listenChanges(interestName); 
    
})

function listenChanges(interestName){ 

    $('#sendButton').on('click',(e)=>{
        e.preventDefault();
        let interest =(e.currentTarget.className);
        let message = $('#message').val()
        $('#message').val("") 
        let isChannel = true
        let from = userFirstName ;
        let fromP = userProfileImg ;
        let id = userId ;
        let updatedAt = new Date(); 
        if(message !== ""){
            $.ajax({
                method:"POST",
                url:`/rooms/${interest}/post-message`,
                data :{ userId : id , message : message }
            }).then((data)=>{
                console.log(data);
            });
            socket.emit('send-message', {message,interestName,isChannel,from,fromP,updatedAt});
        }
    })
}