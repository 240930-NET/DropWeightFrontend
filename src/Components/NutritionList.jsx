import React from "react";
import { Container } from "reactstrap";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

const NutritionList = ({ nutrition, onDelete }) => {
  return (
    <Container className="nutrition-list">
      <h3>Nutrition List</h3>
      {nutrition.map((item) => (
        <div key={item.nutritionId} className="nutrition-list-item">
          <div>
            <strong>{item.description}</strong> -{" "}
            {format(new Date(item.date), "MM/dd/yyyy hh:mm a")}
            <br />
            <small>
              Serving Size: {item.servingSize}g | Calories: {item.calories} kcal
              | Total Fat: {item.totalFat}g | Saturated Fat: {item.saturatedFat}g
              | Cholesterol: {item.cholesterol}mg | Sodium: {item.sodium}mg |
              Carbs: {item.carbohydrates}g | Fiber: {item.fiber}g | Sugar:{" "}
              {item.sugar}g | Protein: {item.protein}g
            </small>
          </div>
          <Trash2
            className="trash-icon"
            color="red"
            cursor="pointer"
            size={25}
            onClick={() => onDelete(item.nutritionId)}
          />
        </div>
      ))}
    </Container>
  );
};

export default NutritionList;
