
const context =({req})=>{
 const token = req.headers.authorization || '';

 const user = getUser(token);

 if (!user) throw new AuthenticationError('you must be logged in');

 return { user };
};

export default context;