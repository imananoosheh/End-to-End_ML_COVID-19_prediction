import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const getData = async ({country,degree}) => {
  if (country) {
    url = `${url}/countries/${country}`;
  }
  if(degree){
    url = `${url}/countries/${country},${degree}`;
  }
  if(!country && !degree){
    url = `${url}/countries/Canada,7`;
  }
  try {
    const data = await axios.get(url);

    return data;
  } catch (error) {
    return error;
  }
};

export const getPredictedData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const countries = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};