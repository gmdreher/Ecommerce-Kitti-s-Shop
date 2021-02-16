const server = require('express').Router();
const { User,CreateAdoption,ReviewApprovedAdoption } = require('../db.js');
const bodyParser = require('body-parser')


server.post("/createAdoption", (req, res) => {
    const { reason, condition, userId,province,contact } = req.body
   
    
    CreateAdoption.create({
        reason:reason,
        condition:condition,
        state:'Creada',
        userId:userId,
        province:province,
        contact:contact
        //photo:data
    }).then((adopt)=>{
        res.json(adopt)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})

server.post("/application", (req, res) => {
    const { condition, state, userId, createAdoptionId } = req.body
    
    ReviewApprovedAdoption.create({
        condition:condition,
        state:state,
        userId:userId,
        createAdoptionId:createAdoptionId
    }).then((application)=>{
        res.json(application)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})

server.put("/createAdoption/:id/photo", (req,res)=>{
    const {data} = req.files.image;
    const {id} = req.params
    CreateAdoption.update({
      photo:data
    }, {where:{
            id:id
        } }
    ).then((act)=>{
        res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
})
server.put("/createAdoption/:id", (req,res)=>{
    const {id} = req.params
    const {state} = req.body
    CreateAdoption.update({
      state:state
    }, {where:{
            id:id
        } }
    ).then((act)=>{
        res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
})
server.put("/application/:id", (req,res)=>{
    const {id} = req.params
    const {state,address} = req.body
    if (address){
        ReviewApprovedAdoption.update({
                state:state,
                adress:adress
            }, {where:{id:id }})
         .then((act)=>{
             res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
    }else{
        ReviewApprovedAdoption.update({
            state:state,
        }, {where:{id:id }})
        .then((act)=>{
            res.json(act)})
        .catch((err)=>{
            res.status(400).json(err)
        })
    }
})
server.get("/application/:userId", (req,res)=>{//////////////posiblemente
    const {userId} = req.params
        ReviewApprovedAdoption.findAll({where:{userId:userId}})
         .then((act)=>{
             res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})
server.get("/createAdoption/creada", (req,res)=>{
    
    CreateAdoption.findAll({where:{state:'Creada' }})
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 })
 server.get("/application/:state", (req,res)=>{
     const {state} = req.params
    
     ReviewApprovedAdoption.findAll({
        where:{state:state }
    },{
        include: [
            {
              model: CreateAdoption,
            },],
    })
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 })
 server.get("/application/:id", (req,res)=>{//para que el admin y los users  vea las soliciturdes que tiene una adopcion
    const {id} = req.params
   
    ReviewApprovedAdoption.findOne({
       where:{id:id }
   },{
       include: [
           {
             model: CreateAdoption,
           },],
   })
         .then((act)=>{
             res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})
server.get("/createAdoption/:id", (req,res)=>{//para que el user que creo la adopcion vea las slicitudes de adopcion
    const {id} = req.params
   
    CreateAdoption.findAll({
       where:{userId:id }
   },{
       include: [
           {
             model: ReviewApprovedAdoption,
           },],
   })
         .then((act)=>{
             res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})

server.get("/createAdoption", (req,res)=>{//encuentra todas las adopciones que creo
    
    CreateAdoption.findAll()
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 })
 server.get("/:id", (req,res)=>{//encuentra una adopcion por su id
    const {id}=req.params
    CreateAdoption.findOne({where:{id:id}})
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 })
module.exports = server;

