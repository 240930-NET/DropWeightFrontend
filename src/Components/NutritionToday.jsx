import React from "react";
import { Card, CardBody, Container } from "reactstrap";

const formatCategoryName = (category) => {
    if (category === 'totalfat') {
        return 'Total Fat';
    }
    if (category === 'saturatedfat') {
        return 'Saturated Fat';
    }
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

const getSymbol = (category) => {
    if (category === 'calories') return 'kcal';
    if (category === 'cholesterol' || category === 'sodium') return 'mg';
    return 'g';
}

const NutritionToday = ({ nutrition }) => {   
    
    const categoryTotals = {
        calories: 0,
        totalfat: 0,
        saturatedfat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 0,
        fiber: 0,
        sugar: 0,
        protein: 0
    };
    
    nutrition.forEach(item => {
        categoryTotals.calories += item.calories || 0;
        categoryTotals.totalfat += item.totalfat || 0;
        categoryTotals.saturatedfat += item.saturatedfat || 0;
        categoryTotals.cholesterol += item.cholesterol || 0;
        categoryTotals.sodium += item.sodium || 0;
        categoryTotals.carbohydrates += item.carbohydrates || 0;
        categoryTotals.fiber += item.fiber || 0;
        categoryTotals.sugar += item.sugar || 0;
        categoryTotals.protein += item.protein || 0;
    });

    return (
        <Container className="nutrition-toay">
            <h3 className="mb-3">Today's Nutrition</h3>
            <Card className="mt-3">
                <CardBody>
                        {Object.entries(categoryTotals).map(([category, total], index) => (
                            <div key={category} className="d-flex justify-content-between mb-2  border-bottom pb-2">
                                <span>{formatCategoryName(category)}:</span>
                                <span>{total} {getSymbol(category)}</span>
                          </div>
                        ))}
                </CardBody>
            </Card>
        </Container>
    );
};

export default NutritionToday;