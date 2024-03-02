var express = require('express');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));

let findOneByEmail = require('../controllers/findByMail.controller');
let getRoomChat = require('../controllers/getRoomChat.controller');
let sendRoomChat = require('../controllers/sendRoomChat.controller');

router.get('/',async (req,res)=>{
    if(req.isAuthenticated()){
      findOneByEmail(req.user)
      .then((data)=>{
          res.status(200).render("rooms", {first_name :data.first_name, id : data._id , profilePic : data.profileImg});
      })
  }
    else 
      res.redirect('/login')
})
//outdoor 

router.get('/outdoor',async (req,res)=>{
    let pageNo = Number(req.query.pageNo) || 1;
    const data = await getRoomChat('outdoor',pageNo);
    res.status(200).send(data);
})

router.post('/outdoor/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  sendRoomChat('outdoor',data);
  res.status(201).send("data-recieved");
})

//Cooking routes 

router.get('/cooking',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('cooking',pageNo);
  res.status(200).send(data);
})

router.post('/cooking/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  sendRoomChat('cooking',data);
  res.status(201).send("data-recieved");
})

//gaming-routes 
router.get('/gaming',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('gaming',pageNo);
  res.status(200).send(data);
})

router.post('/gaming/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  sendRoomChat('gaming',data);
  res.status(201).send("data-recieved");  
})
//art-routes 
router.get('/art',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('art',pageNo);
  res.status(200).send(data);
})

router.post('/art/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('art',data);
    res.status(201).send("data-recieved");  
  }
})

//travel routes
router.get('/travel',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('travel',pageNo);
  res.status(200).send(data);
})

router.post('/travel/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('travel',data);
    res.status(201).send("data-recieved");  
  }
})
// fitness routes 
router.get('/fitness',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('fitness',pageNo);
  res.status(200).send(data);
})

router.post('/fitness/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('fitness',data);
    res.status(201).send("data-recieved");  
  }
})

//reading routes 
router.get('/reading',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('reading',pageNo);
  res.status(200).send(data);
})

router.post('/reading/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('reading',data);
    res.status(201).send("data-recieved");  
  }
})

// music routes 
router.get('/music',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('music',pageNo);
  res.status(200).send(data);
})

router.post('/music/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('music',data);
    res.status(201).send("data-recieved");  
  }
}) 

//technology routes 
router.get('/technology',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('technology',pageNo);
  res.status(200).send(data);
})

router.post('/technology/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('technology',data);
    res.status(201).send("data-recieved");  
  }
}) 

//fashion routes 
router.get('/fashion',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('fashion',pageNo);
  res.status(200).send(data);
})

router.post('/fashion/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('fashion',data);
    res.status(201).send("data-recieved");  
  }
}) 
// photography routes 
router.get('/photography',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('photography',pageNo);
  res.status(200).send(data);
})

router.post('/photography/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('photography',data);
    res.status(201).send("data-recieved");  
  }
}) 


//science routes
router.get('/science',async (req,res)=>{
  let pageNo = Number(req.query.pageNo) || 1;
  const data = await getRoomChat('science',pageNo);
  res.status(200).send(data);
})

router.post('/science/post-message',async (req,res)=>{
  let data  = {sentBy :req.body.userId , message : req.body.message} ;
  if(data.message === ""){
    res.status(400).send("Wrong data");
  }
  else{
    sendRoomChat('science',data);
    res.status(201).send("data-recieved");  
  }
}) 
module.exports = router;
