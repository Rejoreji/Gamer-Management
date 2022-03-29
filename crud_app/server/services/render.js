const axios=require('axios')

exports.homeRoutes = (req,res)=>{

    res.render('sign_up');
}

exports.home = (req,res)=>{
  
    res.render('welcome_admin');
}

exports.add_user = (req,res)=>{
  
    res.render('add_user');
}

exports.edit_user = (req,res)=>{
  
    res.render('edit_user');
}

//login function 
exports.login = (req,res)=>{
  
    res.render('login');
}


exports.userAdmin = (req,res)=>{

    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            
            res.render('user_admin',{users:response.data})
        })
    .catch(err=>{
        res.send(err);
    })
  
}

exports.access_user= (req,res)=>{
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            
            res.render('access_request',{users:response.data})
        })
    .catch(err=>{
        res.send(err);
    })
}



//login function
 exports.login = async(req,res)=>{

    
  
    try{
        axios.get('http://localhost:3000/api/users')
        const email = "sample2@gmail.com";
        //const password = req.body.password;

        const useremail= await users.findOne({email});
        res.send(useremail);
        console.log(useremail);
    

    } catch(error){
        res.status(400).send("Invalid Email")

    }
}
