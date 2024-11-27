import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const NutritionForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Form className="nutrition-form" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="description">Food Description</Label>
        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Enter food item (e.g., '1 cup rice' or '200g chicken breast')"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="dateTime">When did you eat this?</Label>
        <Input
          type="datetime-local"
          name="dateTime"
          id="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" className="submit-btn">
        Add Food Item
      </Button>
    </Form>
  );
};

export default NutritionForm;
