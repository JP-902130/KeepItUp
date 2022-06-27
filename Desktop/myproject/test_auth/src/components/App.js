import React from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import NewGoal from "./NewGoal";
import CurrentGoal from "./CurrentGoal";
import NewLog from "./NewLog";
import CurrentGoalLog from "./CurrentGoalLog";
import GoalBoard from "./GoalBoard";
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/new-goal"
                element={
                  <PrivateRoute>
                    <NewGoal />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/current-goal"
                element={
                  <PrivateRoute>
                    <CurrentGoal />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/new-log"
                element={
                  <PrivateRoute>
                    <NewLog />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/current-goal-log"
                element={
                  <PrivateRoute>
                    <CurrentGoalLog />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/goalboard" element={<GoalBoard />}></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              ></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
