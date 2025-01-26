
export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();

  }
  catch (error) {
    console.error('An error occurred while retrieving data:', error);
    throw error;
  };
}
