function multiplePromises() {
      const p1 = new Promise(resolve => setTimeout(() => resolve('Resolve 1'), 1000));

      const p2 = new Promise(resolve => setTimeout(() => resolve('Resolve 2'), 2000));

      const p3 = new Promise(resolve => setTimeout(() => resolve('Resolve 3'), 3000));

      Promise.allSettled([p1, p2, p3]).then(results => {
            results.forEach(result => console.log(result.status, result.value || result.reason));
      });
}