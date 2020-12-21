const Accuracy = {
  async Accuracy(user) {
    return fetch(`https://www.alfredo-recommends.ml/accuracy/`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        return jsonResponse;
      });
  },
};

export default Accuracy;
