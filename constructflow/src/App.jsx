// Main app component - sets up routing and authentication context
// All pages are protected by the authentication provider
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerOnboarding from "./pages/WorkerOnboarding";
import BlueprintViewer from "./pages/BlueprintViewer";
import ProjectsPage from "./pages/ProjectsPage";
import WorkersPage from "./pages/WorkersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function DashboardRouter() {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <LoginPage />;
  }

  if (userProfile?.role === "manager") {
    return (
      <Routes>
        <Route path="/dashboard" element={<ManagerDashboard />} />
        <Route path="/blueprint" element={<BlueprintViewer />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  // Worker routes
  if (userProfile?.role === "electrician" || userProfile?.role === "plumber" || userProfile?.role === "carpenter") {
    return (
      <Routes>
        <Route path="/onboarding" element={<WorkerOnboarding />} />
        <Route path="/dashboard" element={<WorkerDashboard />} />
        <Route path="/blueprint" element={<BlueprintViewer />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <DashboardRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;
