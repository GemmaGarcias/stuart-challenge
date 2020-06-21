import { api } from './api.js';

export function getJobsCoordinates() {
    const address={ 
        "pickup": "29 Rue du 4 Septembre", 
        "dropoff": "15 Rue de Bourgogne" 
    }; 
    
    return api.post('jobs', address)
}