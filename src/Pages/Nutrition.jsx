import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../Utils/UserContext";
import { addNutrition, getUserNutrition, deleteNutrition } from "../Api/Nutrition";

function Nutrition() {
    const { authToken, currentUser } = useContext(UserContext);
    const [nutritions, setNutrition] = useState([]);
    const [todayNutrition, setToday] = useState([]);
    const [error, setError] = useState(null);
    const [addNutritionModal, setAddNutritionModal] = useState(false);
    const [showPopUp, setShowPopup] = useState(false);

    const initialAddNutritionFormData = {
        description: '', 
        dateTime: '', 
    };

    const [addNutritionFormData, setAddNutritionFormData] = useState(initialAddNutritionFormData);

    const toggle = () => setAddNutritionModal(!addNutritionModal);

    const isToday = (dateString) => { //utility function to check if a date is today
        const today = new Date();
        const date = new Date(dateString);
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
    };

    const handleAddNutritionChange = (e) => { //Handle changes to the add nutrition form
        setAddNutritionFormData({
          ...addNutritionFormData,
          [e.target.name]: e.target.value,
        });
    };

    const handleAddNutritionSubmit = async (e) => { //Handle add nutrition form submit
        e.preventDefault();
        const success = await addNutrition(addNutritionFormData.description, 
                                            addNutritionFormData.dateTime, 
                                            authToken, currentUser.userId);
        
        if (success == null) {
            setShowPopup(true);
            setError("Food not recognized")
            return;
        }
        if (!success) {
            setShowPopup(true);
            setError("Error adding food")
            return;

        }
        const updatedNutrition = await getUserNutrition(authToken, currentUser.userId);
        setNutrition(updatedNutrition.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setToday(updatedNutrition.filter(item => isToday(item.date)));
        setAddNutritionFormData(initialAddNutritionFormData);
        toggle(); 
    };

    const handleCancel = () => { //handle nutrition form cancel button
        setAddNutritionFormData(initialAddNutritionFormData);
        toggle();
    };

    const closePopup = () => {
        setShowPopup(!showPopUp);
    };
    
    const handleDeleteItem = async (id) => { //handle the user pressing the delete nutrition button
        const success = await deleteNutrition(id, authToken);
        if (!success) return;
        const updatedData = nutritions.filter(item => item.nutritionId !== id);
        setNutrition(updatedData.sort((a, b) => new Date(b.date) - new Date(a.date))); 
        setToday(updatedData.filter(item => isToday(item.date)));
    };

    useEffect( ()  => { //Gets all user nutrition on first run
       
        async function getNutritions() {
            const userNutrition = await getUserNutrition(authToken, currentUser.userId);
            setNutrition(userNutrition.sort((a, b) => new Date(b.date) - new Date(a.date)));
            setToday(userNutrition.filter(item => isToday(item.date)));
        };
        getNutritions();        
    }, [] );

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
            <Modal isOpen={showPopUp} toggle={closePopup}>
                <ModalHeader toggle={closePopup}>Error</ModalHeader>
                <ModalBody>
                <p>{error}</p>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={closePopup}>Close</Button>
            </ModalFooter>
        </Modal>
        </Container>
        
    );
}

export default Nutrition;

