const baseUrl = 'http://localhost:5276/api/geospatial/';

const getCommonHeader = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
});

export const getGeoSpatialById = async (id, token) => {
    try {
        const response = await fetch(`${baseUrl}${id}`, {
            method: 'GET',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to fetch geospatial data");
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error(`Error fetching geospatial data with ID ${id}:`, error);
        return null;
    }
};

export const getAllGeoSpatials = async (token) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to fetch all geospatial data");
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching all geospatial data:", error);
        return [];
    }
};

export const getGeoSpatialsByWorkoutId = async (workoutId, token) => {
    try {
        const response = await fetch(`${baseUrl}workout/${workoutId}`, {
            method: 'GET',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to fetch geospatial data by workout ID");
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error(`Error fetching geospatial data for workout ID ${workoutId}:`, error);
        return [];
    }
};

export const addGeoSpatial = async (geoSpatial, token) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(geoSpatial),
        });
        if (!response.ok) throw new Error("Failed to add geospatial data");
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error("Error adding geospatial data:", error);
        return null;
    }
};

export const updateGeoSpatial = async (geoSpatial, token) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'PUT',
            ...getCommonHeader(token),
            body: JSON.stringify(geoSpatial),
        });
        if (!response.ok) throw new Error("Failed to update geospatial data");
        return true;
    } catch (error) {
        console.error("Error updating geospatial data:", error);
        return false;
    }
};

export const deleteGeoSpatial = async (id, token) => {
    try {
        const response = await fetch(`${baseUrl}${id}`, {
            method: 'DELETE',
            ...getCommonHeader(token),
        });
        if (!response.ok) throw new Error("Failed to delete geospatial data");
        return true;
    } catch (error) {
        console.error(`Error deleting geospatial data with ID ${id}:`, error);
        return false;
    }
};
