// With callback

function helloWorld() {
    console.log('Hello');

    setTimeout(function () {
        console.log('World')
    }, 2000)
}

// Call function when click button:
// let button = document.querySelector('button');
// button.addEventListener('click', helloWorld);


// With promises
function helloWorldWithPromise() {
    console.log('Hello');

    let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('World');
        }, 2000);
    });

    promise.then(function (result) {
        console.log(result);
    });
}

// With async function

async function helloWorldWithAsync() {

    console.log('Hello');

    let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('World');
        }, 2000);
    });

    let result = await promise;
    console.log(result);
}