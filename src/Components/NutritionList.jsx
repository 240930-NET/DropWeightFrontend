import React from "react";
import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';

const NutritionList = ({ nutrition, onDelete }) => {    

    return (
        <Container className="nutrition-list">
            <h3 className="mb-3">Nutrition List</h3>
            <ListGroup>
            {nutrition.map((item) => (
                <ListGroupItem key={item.nutritionId} className="border rounded mb-2 d-flex">
                    <Container className="flex-grow-1">
                        <strong>{item.description}</strong> - {format(new Date(item.date), 'MM/dd/yyyy hh:mm a')} <br />
                        <small>
                            Serving Size: {item.servingSize}g | Calories: {item.calories} kcal
                            | Total Fat: {item.totalFat}g | Saturated Fat: {item.saturatedFat}g 
                            | Cholesterol: {item.cholesterol}mg | Sodium: {item.sodium}mg
                            | Carbs: {item.carbohydrates}g | Fiber: {item.fiber}g | Sugar: {item.sugar}g
                            | Protein: {item.protein}g 
                        </small>
                    </Container>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: "pointer", color: "gray" }}
                        onClick={() => onDelete(item.nutritionId)}
                        
                    />
                </ListGroupItem>
            ))}
            </ListGroup>
        </Container>
    );
};

export default NutritionList;


