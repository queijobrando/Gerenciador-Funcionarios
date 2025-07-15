import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import EmployerLista from "./pages/Employers/employerLista";
import EmployerForm from "./pages/Employers/employerForm";
import EmployerEditPage from "./pages/Employers/employerEdit";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CompanyFormPage from "./pages/Company/companyFormPage";
import Login from "./pages/Home/login";
import Profile from "./pages/User/profile";
import RegisterPage from "./pages/Home/registerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/create-company"
          element={
            <ProtectedRoute>
              <CompanyFormPage />
            </ProtectedRoute>
          }
        />
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
                        <EmployerLista />
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
