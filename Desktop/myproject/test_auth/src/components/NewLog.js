import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { Card, Button, Form, Alert } from "react-bootstrap";

function NewGoal() {
  const { currentUser } = useAuth();
  const logNameRef = useRef();
  const navigate = useNavigate();
  var db = firebase.firestore();
  const createGoal = async function (goalID) {
    const goalRef = doc(db, "users", goalID);
    await updateDoc(goalRef, {
      goals: arrayUnion({
        goalLogs: [],
      }),
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
            <Form.Group id="logName">
              <Form.Label>Log Name</Form.Label>
              <Form.Control type="text" ref={logNameRef} required />
            </Form.Group>
            <br />
            <Button className="w-100" type="submit">
              Submit Your Log
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
