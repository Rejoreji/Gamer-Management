const { name } = require('ejs');
var Userdb=require('../model/registers');

//create and save new user

exports.create=(req,res)=>{

    if(!req.body){
        res.status(400).send({ message : "Content cannot be emtpy!"});
        return;
    }
    const password= req.body.psw;
    const confirmpassword=req.body.psw1;

    if(password===confirmpassword){

    // new user
    const user = new Userdb({
        
        email : req.body.email,
        password : req.body.psw,
        first_name : req.body.fname,
        last_name: req.body.lname,
        DOB : req.body.dob,
        access_type: req.body.access_type || "Gamer",
        department:req.body.department || "NOT ASSIGNED",
        phone_number:req.body.phone || "NOT GIVEN",
        address:req.body.address || "NOT GIVEN"
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/login'); //change after 
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
    }
    else{
        res.status(500).send({
            message : "password not matching"
            
        });
        console.log("password not matching");
        res.redirect('/');
    }

}

//
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }


}

exports.update=(req,res)=>{

    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })

}

exports.delete=(req,res)=>{

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

}