const Data = {
  async Search(user) {
    return fetch(`https://www.alfredo-recommends.ml/search/`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        return jsonResponse.map((business, index) => {
          return {
            id: index,
            name: business[0],
            categories: business[1],
          };
        });
      });
  },
};

export default Data;
