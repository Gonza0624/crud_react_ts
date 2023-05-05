import CreateUser from "./components/users/createUsers";
import EditUsers from "./components/users/editUsers";
import UserDetails from "./components/users/userDetails";
import UserList from "./components/users/users";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<CreateUser />}></Route>
        <Route path="/userDetail/:id" element={<UserDetails />} />
        <Route path="/update/:id" element={<EditUsers />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
