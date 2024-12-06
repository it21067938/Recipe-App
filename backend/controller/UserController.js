// import jwt from 'jsonwebtoken'
// let refreshtokens = [];
// import User from '../moduls/User.js';
// import Mailgen from "mailgen";
// import nodemailer from 'nodemailer'
 
// const EMAIL = "";
// const PASSWORD = "";
 
// export const UserRegister = async (req, res) => {
//   console.log(req.body)
//  try{
 
//   console.log(req.body.email)
//     const ExsistUser = await User.findOne({ email: req.body.email });
//     console.log(ExsistUser)
//     if (ExsistUser) {
 
//       res.status(404).json({
//         message: "User Already registered..!",
 
//       })
//     } else if(!ExsistUser) {
//       const prefix = 'UID'
//       const USER_ID = (prefix + Date.now())
//       console.log(USER_ID)
//       const newUser = new User({
//         user_id: USER_ID,
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         phone_number: req.body.phone_number,
//         address: req.body.address,
//         gender: req.body.gender,
//         age: req.body.age,
//         money: 0,
//       });
 
//       console.log(newUser);
//       const newAcct = await newUser.save();
//       console.log(newAcct)
//       if (newAcct) {
//         console.log('1')
//         res.status(201).json({
//           message: "Registration Sucessfull..!",
//           payload: newAcct
//         })
//       } else {
//         console.log('2')
//         res.status(400).json({
//           message: "Somthing Went Wrong In Account Creating..!"
//         })
//       }
 
 
//     }
//   } catch (error) {
//     console.log('3')
//     res.status(500).json({
//       message: "Somthing Went Wrong..!",
//       error: error
//     })
 
 
 
//   }
// }
 
// export const Signin = async (req, res) => {
//   try {
   
//     /*console.log(req.body.email)*/
//     const RegisterdUser = await User.findOne({ email: req.body.email });
//    // console.log(RegisterdUser)  
//     if (RegisterdUser) {
//       const enterdPwd = req.body.password;
//       const dbPwd = RegisterdUser.password;
//       const uid = RegisterdUser._id;
//       //console.log(enterdPwd,dbPwd);
//       console.log(uid);
//       if (enterdPwd === dbPwd) {
//         const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h'});
//         const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '24h' });
//         // console.log("token  "+token)
//         // console.log("refresh token    "+refreshToken)
//         refreshtokens.push(refreshToken);
//         res.status(201).json({
//           token,
//           RegisterdUser
//         })
//       } else {
//         res.status(401).json({
//           message: "Incorrect Password..!"
//         })
//       }
//     } else {
//       res.status(404).json({
//         message: "User Not Registered..!"
//       })
//     }
 
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       message: "Server error..!",
//       error: error
//     })
//   }
// }
 
// export const tokenRefresh = (req, res, next) => {
//   const refreshToken = req.body.refreshToken;
//   if (refreshToken == null) {
//     res.status(401).json({
//       message: "Unauthorized..!"
//     })
//   } else if (!refreshtokens.includes(refreshToken)) {
//     res.status(403).json({
//       message: "Forbidden..!"
//     })
//   } else {
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
//       if (err) {
//         res.status(403).json({
//           message: "Forbidden..!"
//         })
//       } else {
//         const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: "1h" });
//         res.status(201).json({
//           message: "Session Extended..!",
//           token
//         })
//       }
//     })
//   }
// }
 
// export const Signout = (req, res) => {
//   try {
//     const refreshToken = req.body.refreshToken;
//     refreshtokens = refreshtokens.filter(token => token !== refreshToken);
//     res.status(200).json({
//       message: "Signout successful!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Something went wrong!",
//       error: error,
//     });
//   }
// }
 
// export const getAllUsers = async (req, res) => {
//   try {
//     const allusers = await User.find();
//     if (allusers) {
//       res.status(200).json({
//         message: "Fetched Successfull..!",
//         payload: allusers
//       })
//     }
//   }catch(error){
//     console.log(error)
//   }
// }
 
// export const getOneUser = async (req, res) => {
//   try {
//     let userId = req.params.user_id;
//     const user = await User.findById(userId);
//     if (user) {
//       res.status(200).json({user
//       })
//     }
//   }catch(error){
//     console.log(error)
//   }
// }
 
// export const updateMoney = async (req, res) => {
//   const id = req.params.id;
// console.log(id);
//   const user = await User.findById(id);
 
//   const user_id = user.user_id;
//   const name = user.name;
//   const email = user.email;
//   const password = user.password;
//   const phone_number = user.phone_number;
//   const address = user.address;
//   const gender = user.gender;
//   const nmoney = parseInt(req.body.money);
//   const pmoney = parseInt(user.money);
 
//   const money = pmoney + nmoney;
 
//   const upadetEvent = {
//     user_id,
//     name,
//     email,
//     phone_number,
//     password,
//     address,
//     gender,
//     money
//   }
 
//   console.log(upadetEvent)
 
//   const update = await User.findByIdAndUpdate(id, upadetEvent).then(() => {
//     res.status(200).send({status: "Event Updated"})
//   }).catch((err) =>{
//       console.log(err);
//       res.status(500).send({status: "Error with updation data"});
//   })
 
// };
 
// export const SendOTP = async (req, res) => {
//   try {
//     let Memail = req.body.email;
//     const user = await User.findOne({email: Memail});
 
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();
 
//   const user_id = user.user_id;
//   const name = user.name;
//   const email = user.email;
//   const password = otp;
//   const phone_number = user.phone_number;
//   const address = user.address;
//   const gender = user.gender;
//   const money = user.money;
//   const id = user._id;
 
//   const upadetEvent = {
//     user_id,
//     name,
//     email,
//     phone_number,
//     password,
//     address,
//     gender,
//     money
//   }
 
//   let config = {
//     service:'gmail',
//     auth:{
//         user:EMAIL,
//         pass:PASSWORD
//     }
// }
 
 
// let transpoter = nodemailer.createTransport(config);
 
// let MailGenereto = new Mailgen({
//     theme:'default',
//     product: {
//         name: "Zero Waste Living",
//         link: "https://mailgen.js/"
//     }
// })
 
// let response = {
//     body:{
//         name:name,
//         intro:"Your OTP Code",
//         table:{
//             data:[
//                 {
//                 OTP:otp
//                 }
//             ]
//         },
//         outro:"Thank you"
//     }
// }
 
// let mail = MailGenereto.generate(response)
 
// let message = {
//     from : EMAIL,
//     to : email,
//     subject:"Reset Password",
//     html: mail
// }
 
// transpoter.sendMail(message)
 
//   const update = await User.findByIdAndUpdate(id, upadetEvent).then(() => {
//     res.status(200).send({status: "Event Updated"})
//   }).catch((err) =>{
//       console.log(err);
//       res.status(500).send({status: "Error with updation data"});
//   })
//   }catch(error){
//     console.log(error)
//   }
// }
 
// export const checkOTP = async (req, res) => {
//   try {
//     let Motp = req.body.otp;
//     let Memail = req.body.email;
//     const user = await User.findOne({email:Memail});
 
//     if (user.password === Motp) {
//       res.status(200).json({user
//       })
//     }
//   }catch(error){
//     console.log(error)
//   }
// }
 
// export const UpdatePassword = async (req, res) => {
//   try {
//     let Mps = req.body.password;
//     let Memail = req.body.email;
//     const user = await User.findOne({email:Memail});
 
//     const user_id = user.user_id;
//     const name = user.name;
//     const email = user.email;
//     const password = Mps;
//     const phone_number = user.phone_number;
//     const address = user.address;
//     const gender = user.gender;
//     const money = user.money;
//     const id = user._id;
 
//     const upadetEvent = {
//       user_id,
//       name,
//       email,
//       phone_number,
//       password,
//       address,
//       gender,
//       money
//     }
 
//     const update = await User.findByIdAndUpdate(id, upadetEvent).then(() => {
//       res.status(200).send({status: "Event Updated"})
//     }).catch((err) =>{
//         console.log(err);
//         res.status(500).send({status: "Error with updation data"});
//     })
   
//   }catch(error){
//     console.log(error)
//   }
// }