let scheduleHelper={
    run:run
};
export default scheduleHelper;
function run(task: any, interval: number){
    window.setTimeout(()=>{
        task();
    }, interval);
}