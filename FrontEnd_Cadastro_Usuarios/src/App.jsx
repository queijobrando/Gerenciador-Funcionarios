import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import EmployersPage from "./pages/Employers/employersPage";
import EmployerForm from "./pages/Employers/employerForm";
import EmployerEditPage from "./pages/Employers/employerEdit";
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
                    path="/employers"
                    element={
                      <ProtectedRoute>
                        <EmployersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/employers/form"
                    element={
                      <ProtectedRoute>
                        <EmployerForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/employers/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EmployerEditPage />
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