import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const WorkoutForm = ({ formData, handleChange, handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="startTime">Start Time</Label>
                <Input
                    type="datetime-local"
                    name="startTime"
                    id="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="endTime">End Time</Label>
                <Input
                    type="datetime-local"
                    name="endTime"
                    id="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="type">Workout Type</Label>
                <Input
                    type="select"
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a type</option>
                    <option value="Run">Run</option>
                    <option value="Lift">Lift</option>
                    <option value="Squats">Squats</option>
                    <option value="Pushups">Pushups</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="reps">Reps</Label>
                <Input
                    type="number"
                    name="reps"
                    id="reps"
                    value={formData.reps}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button color="primary" type="submit">Submit</Button>
        </Form>
    );
};

export default WorkoutForm;
