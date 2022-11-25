import login from "../auth/login.js";

const context = ({req})=>{
//  console.log(req.body);

 const token = req.headers.authorization || '';

 const member = login.checkAuth(token);

 if (!member) throw new AuthenticationError('you must be logged in');

 return {member}
}

export default context;