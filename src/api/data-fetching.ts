import axios from 'axios';

export async function fetchCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        console.log("fetch data: ", response)
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}
