import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
function GoalBoard() {
  var db = firebase.firestore();
  const [personLogs, setPersonLogs] = useState([]);
  const [isDataReady, setIsDataReady] = useState(0);
  const [allGoals, setAllGoals] = useState([]);
  const [indents, setIndents] = useState([]);
  const navigate = useNavigate();
  const NavigateBackToHomePage = (e) => {
    navigate(`/`);
  };
  const fetchAllData = async () => {
    const Ref = collection(db, "users");
    getDocs(Ref)
      .then((snapshot) => {
        let users = [];
        let goals = [];
        snapshot.docs.forEach((doc) => {
          users.push({ ...doc.data() });
        });
        var this_user_goals = [];
        for (let i = 0; i < users.length; i++) {
          this_user_goals = users[i].goals;
          for (let j = 0; j < this_user_goals.length; j++) {
            goals.push(this_user_goals[j]);
          }
        }
        setAllGoals(goals);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchDataAndDisplay = async () => {
    // This function fetch all goal objects from the DB and push it to frontend components;
    fetchAllData();

    var list_of_html = [];

    for (let i = 0; i < allGoals.length; i++) {
      list_of_html.push(
        <div key={uuidv4()} id={uuidv4()}>
          <Card.Body style={{ border: "2px solid black", margin: "2px" }}>
            <h2 className="text-center mb-4">
              {allGoals.length !== 0 ? allGoals[i].goalName : "Loading..."}
            </h2>

            <strong>Goal: </strong>
            {allGoals.length !== 0 ? allGoals[i].goalName : "Loading..."}
            <br></br>
          </Card.Body>
        </div>
      );
    }

    setIndents(list_of_html);
  };
  useEffect(() => {
    fetchDataAndDisplay();
  }, [allGoals]);

  return (
    <div>
      <Card>{indents}</Card>
      <Button onClick={NavigateBackToHomePage}>Back to homepage</Button>
    </div>
  );
}

export default GoalBoard;
