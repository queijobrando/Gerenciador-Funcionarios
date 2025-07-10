import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import UsersPage from "./pages/Users/usersPage";
import UserForm from "./pages/Users/UserForm";
import UserEditPage from "./pages/Users/userEdit";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Home/login";
import Profile from "./pages/User/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <>
              <Sidebar />
              <div className="ml-56">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <UsersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users/form"
                    element={
                      <ProtectedRoute>
                        <UserForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users/edit/:id"
                    element={
                      <ProtectedRoute>
                        <UserEditPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;