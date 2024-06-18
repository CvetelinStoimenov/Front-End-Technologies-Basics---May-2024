let stopWatchSeconds = 0
let stopWatchInterval;
let saveTimeInterval;

function startStopWatch(){
    stopWatchInterval = setInterval(function(){
        stopWatchSeconds ++;
        console.log('Elapsed time: ' + stopWatchSeconds + ' s');
    }, 1000);

    saveTimeInterval =  setInterval(async function () {
        await saveTime(stopWatchSeconds);
    }, 5000)
}

function stopStopWatch(){
    clearInterval(stopWatchInterval);
    clearInterval(saveTimeInterval);
    stopWatchSeconds = 0;
}

function saveTime(saveTime){

    return new Promise(function(resolve, reject){
        console.log('Saved time: ' + saveTime + ' s');
        resolve();
    });
}