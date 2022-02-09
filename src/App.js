import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Subscriptions from "./Screens/Subscriptions";
import PrivateRoute from "./Helpers/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/subscription" element={<Subscriptions />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
