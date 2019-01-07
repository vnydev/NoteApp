var express = require('express');
var router = express.Router();

const Notes = require('../notes-app-db/notes');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/create-note', (req,res)=>{
  console.log("req", req.body)
  let note = req.body['Note'];
  let createdBy = req.body['CreatedBy'];
  let createOn = req.body['CreateOn'];
  let favorite = req.body['Favorite'];
  if(!note && !createdBy && !createOn){
    return res.status(401).json({status:false, message:"Some field is missing."});
  }

  Notes.CreateNote(req.body, (err,suc)=>{
    if(err){
     return res.status(500).json({status:false, message:"Internal error"});
    }

    return res.status(200).json({status:true, data:suc});
  })
})

router.post('/update-note', (req,res)=>{
  console.log("req", req.body)
  let Id = req.body['Id'];
  let note = req.body['Note'];
  let createdBy = req.body['CreatedBy'];
  let createOn = req.body['CreateOn'];
  let favorite = req.body['Favorite'];
  if(!Id && !note && !createdBy && !createOn){
    return res.status(401).json({status:false, message:"Some field is missing."});
  }

  Notes.UpdateNote(req.body, (err,suc)=>{
    if(err){
     return res.status(500).json({status:false, message:"Internal error"});
    }

    return res.status(200).json({status:true, data:suc});
  })
})
router.get('/notes', (req,res)=>{
  console.log("req", req.query);
  let id = req.query.id;
  let favorite = req.query.favorite;
  if(id && favorite == 'false'){
    // Delete Note By Id
    Notes.RemoveNote(id, (err, suc)=>{
      if(err){
        return res.status(500).json({status:false, message:"Internal error in removing note"});
       }
  
      return res.status(200).json({status:true, message:"success", data:suc});
    })
  }else if(id && favorite){
    // Favorite note
    Notes.FavoriteNote(id, favorite, (err, suc)=>{
      if(err){
        return res.status(500).json({status:false, message:"Internal error in favorite note"});
       }
  
      return res.status(200).json({status:true, message:"success", data:suc});
    })
  }else if(id == '' && favorite == 'false') {
    Notes.GetAllNotes((err, suc)=>{
      if(err){
        return res.status(500).json({status:false, message:"Internal error in notes"});
       }
  
      return res.status(200).json({status:true, data:suc});
    })
  }
  
})

module.exports = router;
