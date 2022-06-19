import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function NewGoal() {
  const { currentUser } = useAuth();
  const goalNameRef = useRef();
  const goalPeriodRef = useRef();
  const goalLogRef = useRef();
  const goalAlertRef = useRef();
  const navigate = useNavigate();
  var db = firebase.firestore();

  const createGoal = async function (userID) {
    const userRef = doc(db, "users", userID);
    const goalID = uuidv4();
    await updateDoc(userRef, {
      goals: arrayUnion({
        goalName: goalNameRef.current.value,
        goalTime: firebase.firestore.Timestamp.now(),
        goalPeriod: goalPeriodRef.current.value,
        goalLog: goalLogRef.current.value,
        goalAlert: goalAlertRef.current.value,
        goalID: goalID,
      }),
    });

    const goalRef = doc(db, "goals", goalID);
    await setDoc(goalRef, {
      goalLogs: [],
    });
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createGoal(currentUser.uid);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Setup a new goal</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="goalName">
              <Form.Label>Goal Name</Form.Label>
              <Form.Control type="text" ref={goalNameRef} required />
            </Form.Group>
            <br />
            <Form.Group id="goalPeriod">
              <Form.Label>Implmentation Period</Form.Label>
              <Form.Control ref={goalPeriodRef} as="select">
                <option>1 Day</option>
                <option>2 Days</option>
                <option>3 Days</option>
                <option>4 Days</option>
                <option>5 Days</option>
                <option>6 Days</option>
                <option>1 Week</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group id="goalLog">
              <Form.Label>
                Do you want to add a reflection for each individual checkin?
              </Form.Label>
              <Form.Control ref={goalLogRef} as="select">
                <option>Yes</option>
                <option>No</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="goalAlert">
              <Form.Label>
                Do you want to add an alert for yourself periodicly
              </Form.Label>
              <Form.Control ref={goalAlertRef} as="select">
                <option>Yes</option>
                <option>No</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Button className="w-100" type="submit">
              Submit your goal
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}

export default NewGoal;
