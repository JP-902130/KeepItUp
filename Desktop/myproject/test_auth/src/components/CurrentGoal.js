import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "react-bootstrap";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
function CurrentGoal() {
  const { currentUser } = useAuth();
  var db = firebase.firestore();
  const [goals, setGoals] = useState([]);
  const [indents, setIndents] = useState([]);
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

  const render = () => {
    var list_of_html = [];
    var arr = goals[0] || [];
    for (let i = 0; i < arr.length; i++) {
      list_of_html.push(
        <div key={uuidv4()}>
          <Card.Body>
            <h2 className="text-center mb-4">
              {goals.length != 0 ? goals[0][i]["goalName"] : "Loading..."}
            </h2>
            <strong>Alert Setup: </strong>
            {goals.length != 0 ? goals[0][i]["goalAlert"] : "Loading..."}
            <br></br>
            <strong>Goal Log: </strong>
            {goals.length != 0 ? goals[0][i]["goalLog"] : "Loading..."}
            <br></br>
            <strong>Goal Period: </strong>
            <div>
              You plan to do this task once every{" "}
              {goals.length != 0 ? goals[0][i]["goalPeriod"] : "Loading..."}
            </div>
            <br></br>
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

  return <div>{indents}</div>;
}

export default CurrentGoal;
