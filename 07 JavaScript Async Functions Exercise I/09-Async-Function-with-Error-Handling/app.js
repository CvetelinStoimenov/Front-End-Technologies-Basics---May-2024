async function promiseRejectionAsync() {
   let promise = new Promise(function (resolve, reject) {
      setTimeout(() => {
         reject(new Error('Error here!'))
      }, 2000);
   });


   try {
      await promise;
   }
   catch (err) {
      console.log(err);
   }
}