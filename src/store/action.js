  export const getExchangeRate = () => async () => {
    return new Promise(async (resolve) => {
      try {
        fetch('http://api.exchangeratesapi.io/v1/latest?access_key=1abed3b7eb947d7509e3fa740dc7a42e&base=GBP&symbols=USD,AUD,CAD,PLN,MXN').then(
            res => res.json().then(
                res1 => console.log(res1)
            )
        )
        // return resolve(result);
      } catch (e) {
        return resolve(false);
      }
    });
  };
  