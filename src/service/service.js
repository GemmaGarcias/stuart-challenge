import { api } from './api.js';

export async function getJobsCoordinates(job) {
    return api.post('jobs', job);
}

export async function getGeocodeAddress(address) {
    return api.post('geocode', address);
}