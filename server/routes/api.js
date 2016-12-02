import express from 'express';
import commonValidations from '../shared/validations/signup_valid';
import User from '../model/users';
import isEmpty  from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

function validateInput(data, otherValidations){
   let { errors } = otherValidations(data);

  return User.findOne({$or: [{'username':data.username},{'email': data.email}]}).then(user =>{
    if(user){
      if(data.username === user.username ){
        console.log('Username already present');
        errors.username = 'Username already taken';
      }
      if(data.email === user.email ){
        console.log('Mail ID already present');
        errors.email = 'Mail ID already present';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  });
 }

router.post('/users', (req,res) =>{
  validateInput(req.body, commonValidations).then(({ errors, isValid }) =>{
    if(isValid){
      const { username,email, password, timezone } = req.body;
      let newUser = new User();
          newUser.username = username;
          newUser.email= email;
          newUser.password = newUser.encryptedPassword(password);
          newUser.timezone = timezone;

          newUser.save()
          .then(user => res.status(200).json({success: true}))
          .catch(err => res.status(500).json({error:err}));
    }
    else{
      res.status(400).json(errors);
    }
  });
  }
);

router.get('/users/:fieldname/:identifier', (req,res) => {
let findValue =req.params.identifier
console.log(findValue);
  console.log(req.params);
  if(req.params.fieldname == 'username'){
    var findKey= req.params.fieldname;
  }
  else{
    var findKey = req.params.fieldname;
  }
  console.log(findKey);
  findValue= findValue.toString();
  console.log(findKey);
  User.findOne({$or: [{'username':findValue}, {'email':findValue}]}).then(user =>{
    console.log(user);
    if(user){
      console.log('found');
      res.json({errors:"Already Exists"})
    }
    else if(!user){
      res.json({success:true});
    }
  })
})

router.post('/users/auth', (req,res) =>{
  const { identifier, password } = req.body;
  User.findOne({$or: [{'email':identifier},{'username':identifier}]}).then(user =>{
    if(user){
      console.log(user.validPassword(password));
        if(user.validPassword(password)){
          const token = jwt.sign({
            id: user.get('_id'),
            username: user.get('username')
          }, config.jwtSecret);
          res.json({token});
        }
      else{
        res.status(401).json({ errors:{ form:'Invalid credentials'}});
      }
    }
    else{
      res.status(401).json({ errors:{ form:'Invalid credentials'}})
    }
  });
});
export default router;
