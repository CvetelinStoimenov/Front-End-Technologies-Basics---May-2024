function allPromise() {
    let promise1 = new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('1');
        }, 1000);
    })

    let promise2 = new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('2');
        }, 1000)
    })

    let promise3 = new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('3');
        }, 1000)
    })

    Promise.all([promise1, promise2, promise3])
        .then(function (result) {
            console.log(result);
        });
}