import axios from 'axios';

const sendDocsForClustering = async (docs) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/cluster', { docs });
    console.log('Clusters:', response.data.clusters);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default sendDocsForClustering;

