import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://stuart­-frontend-challenge.now.sh',
    timeout: 1000
  });