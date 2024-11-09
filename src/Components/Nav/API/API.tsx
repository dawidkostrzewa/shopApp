//

export const api = async (event: string) => {
  // return fetch('https://api.escuelajs.co/api/v1/products')
  return fetch(`https://api.escuelajs.co/api/v1/${event}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })

    .catch((error) => {
      console.error('Wystąpił błąd podczas pobierania danych:', error);
    });
};
