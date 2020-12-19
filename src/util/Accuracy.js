const Accuracy = {
  async Accuracy(user) {
    return fetch(`http://34.121.66.77:8000/accuracy/`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        return jsonResponse;
      });
  },
};

export default Accuracy;
