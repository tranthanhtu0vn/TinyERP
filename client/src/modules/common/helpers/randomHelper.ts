let randomHelper ={
    getRnd: getRnd
};
export default randomHelper;

function getRnd(){
    return Math.random().toString();
}