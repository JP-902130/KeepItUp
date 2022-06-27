import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { Card, Button, Form } from "react-bootstrap";

function NewLog() {
  const { currentUser } = useAuth();
  const logNameRef = useRef();
  const logDateRef = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  var db = firebase.firestore();

  const createLog = async function (goalID, newlog) {
    const goalRef = doc(db, "goals", goalID);
    await updateDoc(goalRef, {
      goalLogs: firebase.firestore.FieldValue.arrayUnion({
        name: newlog.name,
        date: newlog.date,
      }),
    });
    navigate("/current-goal");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createLog(searchParams.get("goalID"), {
      name: logNameRef.current.value,
      date: logDateRef.current.value,
    });
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add a new log</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="logName">
              <Form.Label>Log Name</Form.Label>
              <Form.Control type="text" ref={logNameRef} required />
            </Form.Group>
            <br />
            <Form.Group id="logDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" ref={logDateRef} required />
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

export default NewLog;
