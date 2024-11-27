import { format } from 'date-fns';

const url = 'https://dropweightbackend.azurewebsites.net/api/Nutrition/';

export const getAllNutrition = async () => { 
    try {
        const response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
              },
          })
          return response.json();
    }
    catch {
        console.error("Error fetching nutrition");
        return null;
    }
}

export const getUserNutrition = async (authToken, userId) => { //Need to change this to return nutrition by userid
    try {        
        const response = await fetch(`${url}user/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
              },
          })
          return response.json();
    }
    catch {
        console.error("Error fetching nutrition");
        return null;
    }
}


export const queryNutrition = async (query) => { //Used to ping external API for nutrition data
    const apiKey = '5eee1abaeec557c8f0a60c874dbac983';
    const appId = '9ee93a71';
    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
    try {
        const response = await fetch(url, {
            method: 'Post',
            headers: {
                'x-app-id': appId,
                'x-app-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "query": query
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        return null;
    }
}


export const addNutrition = async (query, dateTime, authToken, userId) => {

    const nutritionData = await queryNutrition(query);
    if(nutritionData == null) return null;
    
    const nutritionToAdd = { 
        description: query.charAt(0).toUpperCase()
                        + query.slice(1),
        date: dateTime || format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        servingSize: nutritionData.foods[0].serving_weight_grams || 0,
        calories: nutritionData.foods[0].nf_calories || 0,
        totalFat: nutritionData.foods[0].nf_total_fat || 0,
        saturatedFat: nutritionData.foods[0].nf_saturated_fat || 0,
        cholesterol: nutritionData.foods[0].nf_cholesterol || 0,
        sodium: nutritionData.foods[0].nf_sodium || 0,
        carbohydrates: nutritionData.foods[0].nf_total_carbohydrate || 0,
        fiber: nutritionData.foods[0].nf_dietary_fiber || 0,
        sugar: nutritionData.foods[0].nf_sugars || 0,
        protein: nutritionData.foods[0].nf_protein || 0,
        userId: userId
    };

    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
              },
            body: JSON.stringify(  nutritionToAdd )
          })
          return true;
    }
    catch {
        console.error("Error adding nutrition");
        return false;
    }
};

export const deleteNutrition = async (id, authToken)  => {
    try {
        const response = await fetch(`${url}${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
              }
        })
        return true;
    }
    catch {
        console.error("Error deleting nutrition");
        return false;
    }
};
