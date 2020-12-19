const Data = {
  async Search(user) {
    return fetch(`https://34.121.66.77:8000/search/`)
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
