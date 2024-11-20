import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const NutritionForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input 
          type="text" 
          name="description" 
          id="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </FormGroup>
      <FormGroup>
        <Label for="dateTime">Date and Time</Label>
        <Input 
          type="datetime-local" 
          name="dateTime" 
          id="dateTime" 
          value={formData.dateTime} 
          onChange={handleChange} 
        />
      </FormGroup>
      <Button color="primary" type="submit">Submit</Button>
    </Form>
  );
};

export default NutritionForm;