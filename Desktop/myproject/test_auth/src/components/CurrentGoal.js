import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

function CurrentGoal() {
  const { currentUser } = useAuth();
  var db = firebase.firestore();
  const [test, setTest] = useState("");
  const [goals, setGoals] = useState([]);

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
    console.log("fefer");
    fetchUserData();
  }, []);

  return (
    <>
      {/* <input
        type="button"
        onClick={() => {
          setTest("dd");
        }}
      /> */}
      <div>{goals.length != 0 ? goals[0][0]["goalLog"] : "none"}</div>
    </>
  );
}

export default CurrentGoal;
