import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
function CurrentGoal() {
  const { currentUser } = useAuth();
  var db = firebase.firestore();
  const [goals, setGoals] = useState([]);
  const [indents, setIndents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        db.collection("users")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "==",
            currentUser.uid
          )
          .get()
          .then((snap) => {
            const docSnapshots = snap.docs;
            for (var i in docSnapshots) {
              const doc = docSnapshots[i].data();
              setGoals([doc["goals"]]);
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    render();
  }, [goals]);

  const fetchUserData = async () => {
    try {
      db.collection("users")
        .where(firebase.firestore.FieldPath.documentId(), "==", currentUser.uid)
        .get()
        .then((snap) => {
          const docSnapshots = snap.docs;
          for (var i in docSnapshots) {
            const doc = docSnapshots[i].data();
            setGoals([doc["goals"]]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const RemoveGoal = async (e) => {
    let goal_id = e.target.parentNode.parentNode.id;
    let new_arr = [];
    await db
      .collection("users")
      .where(firebase.firestore.FieldPath.documentId(), "==", currentUser.uid)
      .get()
      .then((snap) => {
        const docSnapshots = snap.docs;
        const doc = docSnapshots[0].data();
        new_arr = doc["goals"];
      });
    new_arr = new_arr.filter((goal) => goal["goalID"] !== goal_id);
    await db.collection("users").doc(currentUser.uid).update({
      goals: new_arr,
    });
    fetchUserData();
  };
  const NavigateToNewLog = (e) => {
    navigate(`/new-log?goalID=${e.target.parentNode.parentNode.id}`);
  };

  const render = () => {
    var list_of_html = [];
    var arr = goals[0] || [];
    for (let i = 0; i < arr.length; i++) {
      list_of_html.push(
        <div key={goals[0][i]["goalID"]} id={goals[0][i]["goalID"]}>
          <Card.Body style={{ border: "2px solid black", margin: "2px" }}>
            <h2 className="text-center mb-4">
              {goals.length !== 0 ? goals[0][i]["goalName"] : "Loading..."}
            </h2>
            <strong>Alert Setup: </strong>
            {goals.length !== 0 ? goals[0][i]["goalAlert"] : "Loading..."}
            <br></br>
            <strong>Goal Log: </strong>
            {goals.length !== 0 ? goals[0][i]["goalLog"] : "Loading..."}
            <br></br>
            <strong>Goal Period: </strong>
            <div>
              You plan to do this task once every{" "}
              {goals.length !== 0 ? goals[0][i]["goalPeriod"] : "Loading..."}
            </div>
            <br></br>
            <Button onClick={NavigateToNewLog} variant="success">
              Add a new log
            </Button>
            <br></br>
            <Button onClick={RemoveGoal} variant="danger">
              Delete
            </Button>
          </Card.Body>
        </div>
      );
    }
    list_of_html.push(
      <div key={uuidv4()} className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    );
    setIndents(list_of_html);
  };

  return (
    <div>
      <Card>{indents}</Card>
    </div>
  );
}

export default CurrentGoal;
