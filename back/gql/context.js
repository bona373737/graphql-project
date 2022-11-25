
const context =({req})=>{
 const token = req.headers.authorization || '';

 const user = sgetUer(token);

 if (!user) throw new AuthenticationError('you must be logged in');

 return { user };
};

export default context;