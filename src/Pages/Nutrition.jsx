import React, { useState, useEffect } from "react";
import { 
    Container, 
    Row, 
    Col, 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';
import NutritionList from "../Components/NutritionList";
import NutritionToday from "../Components/NutritionToday";
import NutritionForm from "../Components/NutritionForm";

function Nutrition() {

    const [nutritions, setNutrition] = useState([]);
    const [todayNutrition, setToday] = useState([]);
    const [error, setError] = useState(null);
    const [addNutritionModal, setAddNutritionModal] = useState(false);

    const initialAddNutritionFormData = {
        description: '', // Default value for description
        dateTime: '', // Default value for dateTime (optional)
    };

    const [addNutritionFormData, setAddNutritionFormData] = useState(initialAddNutritionFormData);

    

    const toggle = () => setAddNutritionModal(!addNutritionModal);

    const handleAddNutritionChange = (e) => {
        setAddNutritionFormData({
          ...addNutritionFormData,
          [e.target.name]: e.target.value,
        });
    };
    
    const handleAddNutritionSubmit = async (e) => {
        e.preventDefault();
        console.log(addNutritionFormData); // Handle the form submit api call here, POST request to add new nutrition
        
        const apiKey = '';
        const url = `https://api.api-ninjas.com/v1/nutrition?query=${addNutritionFormData.description}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            setError(null); // Clear any previous error
        } catch (err) {
            setError(err.message);
            //setData(null); // Clear any previous data
        }
        console.log()
        setAddNutritionFormData(initialAddNutritionFormData);
        toggle(); 
    };

    const handleCancel = () => {
        setAddNutritionFormData(initialAddNutritionFormData);
        toggle();
    };

    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
    };

    
    const handleDeleteItem = (id) => {
        //send fetch request to actually delete the nutrition from the database
        const updatedData = nutritionData.filter(item => item.nutritionId !== id);
        setNutrition(updatedData); 
    };

    const nutritionData = [ //Used to simulate the results of fetch remove later
        {
          nutritionId: 1,
          date: "2024-11-19T08:30:00Z", 
          description: "Grilled Chicken Breast",
          servingSize: 100, // in grams
          calories: 165,
          totalFat: 3.6,
          saturatedFat: 1.0,
          cholesterol: 85, // in mg
          sodium: 74, // in mg
          carbohydrates: 0,
          fiber: 0,
          sugar: 0,
          protein: 31,
          userId: 100,
        },
        {
          nutritionId: 2,
          date: "2024-11-19T14:45:00Z",
          description: "Cooked White Rice",
          servingSize: 150, // in grams
          calories: 206,
          totalFat: 0.4,
          saturatedFat: 0.1,
          cholesterol: 0,
          sodium: 1, // in mg
          carbohydrates: 45,
          fiber: 0.6,
          sugar: 0,
          protein: 4.3,
          userId: 100,
        },
        {
          nutritionId: 3,
          date: "2024-11-18T10:00:00Z",
          description: "Steamed Broccoli",
          servingSize: 85, // in grams
          calories: 55,
          totalFat: 0.6,
          saturatedFat: 0.1,
          cholesterol: 0,
          sodium: 33, // in mg
          carbohydrates: 11.2,
          fiber: 5.1,
          sugar: 2.2,
          protein: 3.7,
          userId: 100,
        },
        {
          nutritionId: 4,
          date: "2024-11-16T17:00:00Z",
          description: "Raw Apple",
          servingSize: 182, // in grams
          calories: 95,
          totalFat: 0.3,
          saturatedFat: 0.1,
          cholesterol: 0,
          sodium: 2, // in mg
          carbohydrates: 25,
          fiber: 4.4,
          sugar: 19,
          protein: 0.5,
          userId: 100,
        },
        {
          nutritionId: 5,
          date: "2024-11-19T23:59:59Z",
          description: "Almond Milk, Unsweetened",
          servingSize: 240, // in ml
          calories: 30,
          totalFat: 2.5,
          saturatedFat: 0.2,
          cholesterol: 0,
          sodium: 170, // in mg
          carbohydrates: 1,
          fiber: 0,
          sugar: 0,
          protein: 1,
          userId: 100,
        },
      ];

    
    useEffect(() => { //update this to actually fetch the data first with fetch request
        setNutrition(nutritionData.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setToday(nutritionData.filter(item => isToday(item.date)));
    }, []);

    return (
        <Container style={{marginTop: '20px'}}>
            <Row className="align-items-start">
                <Col md={8}> 
                    <NutritionList nutrition={nutritions} onDelete={handleDeleteItem}/>
                </Col>
                <Col md={4} className="flex-column d-flex align-items-center">
                    <NutritionToday nutrition={todayNutrition} />
                    <Button color="primary" className="mt-2" onClick={toggle}>Add Nutrition</Button>
                </Col>
            </Row>
            <Modal isOpen={addNutritionModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Fill Out the Form</ModalHeader>
                <ModalBody>
                    <NutritionForm 
                        formData={addNutritionFormData} 
                        handleChange={handleAddNutritionChange} 
                        handleSubmit={handleAddNutritionSubmit} 
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
        
    );
}

export default Nutrition;

