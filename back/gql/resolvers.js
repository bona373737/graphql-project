/**
 * @description 
 */

const resolvers ={
    Query:{
        allMembersAdmin(){
            console.log("안녕");
            return null;
        },
        memberAdmin(){
            //데이터베이스에 접근하여 특정 SQL코드를 실행시키는 동작
            return null;

        }
    }
}

export default resolvers;