import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestePage from "./pages/testePage";
import Sidebar from "./components/Sidebar";
import UsersPage from "./pages/Users/usersPage";
import UserForm from "./pages/Users/userForm";
import UserEditPage from "./pages/Users/userEdit";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="ml-56">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/form" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserEditPage />} />
          <Route path="/teste" element={<TestePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
