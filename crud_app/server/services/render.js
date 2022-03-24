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