function racePromise() {
    let promise1 = new Promise(function (resolve, reject) {
        setTimeout( ()=> {
            resolve('Promise 1');
        }, 4000);
    });

    let promise2 = new Promise(function (resolve, reject) {
        setTimeout(()=> {
            resolve('Promise 2');
        }, 2000);
    });

    let promise3 = new Promise(function (resolve, reject) {
        setTimeout(()=> {
            resolve('Promise 3');
        }, 3000);
    });

    Promise.race([promise1, promise2, promise3])
    .then(function(result){
        console.log(result);
    });
}