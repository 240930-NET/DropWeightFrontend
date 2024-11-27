import React from "react";
import { Card, CardBody, Container } from "reactstrap";

const NutritionToday = ({ nutrition }) => {
  const getUnits = (category) => {
    if (category === "calories") {
        return 'kcal';
    }
    else if (category === "sodium" || category === "cholesterol") {
        return 'mg';
    }
    else return 'g';
  }
  const categoryTotals = {
    calories: 0,
    totalfat: 0,
    saturatedfat: 0,
    cholesterol: 0,
    sodium: 0,
    carbohydrates: 0,
    fiber: 0,
    sugar: 0,
    protein: 0,
  };

  nutrition.forEach((item) => {
    categoryTotals.calories += item.calories || 0;
    categoryTotals.totalfat += item.totalFat || 0;
    categoryTotals.saturatedfat += item.saturatedFat || 0;
    categoryTotals.cholesterol += item.cholesterol || 0;
    categoryTotals.sodium += item.sodium || 0;
    categoryTotals.carbohydrates += item.carbohydrates || 0;
    categoryTotals.fiber += item.fiber || 0;
    categoryTotals.sugar += item.sugar || 0;
    categoryTotals.protein += item.protein || 0;
  });

  return (
    <Container className="nutrition-today">
      <h3>Today's Nutrition</h3>
      <Card>
        <CardBody>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <div key={category} className="category">
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
              <span>{total.toFixed(2)} {getUnits(category)}</span>
            </div>
          ))}
        </CardBody>
      </Card>
    </Container>
  );
};

export default NutritionToday;
