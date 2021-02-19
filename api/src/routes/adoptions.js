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
    }).then((adopt)=>{
        res.json(adopt)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})

server.post("/application", (req, res) => {
    const { condition, userId, contact, province, createAdoptionId } = req.body
    
    ReviewApprovedAdoption.create({
        condition:condition,
        state:'Creada',
        userId:userId,
        createAdoptionId:createAdoptionId,
        contact:contact,
        province:province
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
        } },
        {order: [
            ['id', 'ASC']]}
    ).then((act)=>{
        res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
})
server.put("/application/:id", (req,res)=>{
    const {id} = req.params
    const {state,address,createAdoptionId} = req.body
    if (address){
        ReviewApprovedAdoption.update({
                state:state,
                address:address
            }, {where:{id:id }})
         .then((act)=>{
         if(state=='Aprobada'){
             CreateAdoption.update({
                state:'Adoptado'
            },{where:{id:createAdoptionId}})
             .then((adop)=>{
                 res.json(adop)
             }).catch((err)=>{
                 res.status(400).json(err)
             }) 
            }else{
                res.json(act)
            }
          
            
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
server.get("/application/:userId", (req,res)=>{
    const {userId} = req.params
        ReviewApprovedAdoption.findAll({where:{userId:userId}})
         .then((act)=>{
             res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    }) 
  
})
server.get("/createAdoption/acept", (req,res)=>{
    
    CreateAdoption.findAll({where:{state:'Aprobada' }})
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 })
 server.get("/createAdoption/state/:state", (req,res)=>{
    const {state} = req.params
   
    CreateAdoption.findAll({
       where:{state:state }
    },{order: [
        ['id', 'ASC']]}
    ).then((act)=>{
         res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})
server.get("/application/state/:state", (req,res)=>{
    const {state} = req.params
   
    ReviewApprovedAdoption.findAll({
       where:{state:state },
       include:[{
            model:CreateAdoption,
            where:{id:createAdoptionId}
       }],
       order: [
            ['id', 'ASC']
    ]})
    .then((act)=>{
         res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})

 server.get("/application", (req,res)=>{
     const {state} = req.params
    
     ReviewApprovedAdoption.findAll({
        include: [
            {
              model: CreateAdoption,
            },],
    },{order: [
        ['id', 'ASC']]})
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 }) 
 
server.get("/createAdoption/:id", (req,res)=>{
    const {id} = req.params
   
    CreateAdoption.findAll({
       where:{userId:id }
   },{order: [
        ['id', 'ASC']]})
         .then((act)=>{
             res.json(act)
    }).catch((err)=>{
        res.status(400).json(err)
    })
  
})

server.get("/createAdoption", (req,res)=>{
    
    CreateAdoption.findAll()
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 })
 server.get("/:id", (req,res)=>{
    const {id}=req.params
    CreateAdoption.findOne({where:{id:id}})
          .then((act)=>{
              res.json(act)
     }).catch((err)=>{
         res.status(400).json(err)
     })
   
 })
module.exports = server;

