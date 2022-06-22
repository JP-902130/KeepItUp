import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";
function CurrentGoalLog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [alllogs, setAlllogs] = useState([]);
  const [indents, setIndents] = useState([]);
  const db = firebase.firestore();
  const getAllLogs = () => {
    const current_goal_id = searchParams.get("goalID");
    console.log(current_goal_id);
    try {
      db.collection("goals")
        .where(firebase.firestore.FieldPath.documentId(), "==", current_goal_id)
        .get()
        .then((snap) => {
          const docSnapshots = snap.docs;
          for (var i in docSnapshots) {
            const doc = docSnapshots[i].data();
            setAlllogs(doc["goalLogs"]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const render = () => {
    var list_of_html = [];

    for (let i = 0; i < alllogs.length; i++) {
      list_of_html.push(
        <div id={uuidv4()} key={uuidv4()}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {alllogs[i].date}
            </Card.Subtitle>
            <Card.Text>{alllogs[i].name}</Card.Text>
            <Card.Link href="/">Card Link</Card.Link>
            <Card.Link href="/">Another Link</Card.Link>
          </Card.Body>
        </div>
      );
    }
    list_of_html.push(
      <div key={uuidv4()} className="w-100 text-center mt-2">
        <Link to="/current-goal">Cancel</Link>
      </div>
    );
    setIndents(list_of_html);
  };

  useEffect(() => {
    getAllLogs();
  }, []);
  useEffect(() => {
    render();
  }, [alllogs]);
  return (
    <>
      <Card style={{ width: "18rem" }}>{indents}</Card>
    </>
  );
}

export default CurrentGoalLog;
