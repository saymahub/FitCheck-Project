//App.js

import "./App.css";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { RequireAuth } from 'react-auth-kit';
import RoleBasedAuth from "./components/RoleBasedAuth";
import Unauthorized from "./pages/unauthorized.js";
import LandingPage from "./pages/landing.js";
import LoginPage from "./pages/login.js";
import UserProfile from "./pages/userprofile.js";
import BusinessDashboard from "./pages/businessDashboard.js";
import BusinessAnalytics from "./pages/businessAnalytics.js";
import BusinessAddPost from "./pages/businessAddPost.js";
import BusinessProfile from "./pages/businessProfile.js";
import ForYou from "./pages/foryou.js";
import Catalog from './pages/catalog.js';
import AdminDashboard from "./pages/adminDashboard.js";
import ForYouAddPost from "./pages/foryou-addpost.js";
import AdminFeed from "./pages/adminFeed.js";
import AdminSearchPage from "./pages/adminSearchPage.js";
import UserProfileAddItem from "./pages/userprofile-additem.js";

// Add an import statement here for your page, use the above format
// Also add a route path below
// example:<Route path="/yourpage" element={<yourpage />} />
// yourpage is just a placeholder, change it to your actual page name!!!
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userprofile" element={<RequireAuth loginPath='/login'> <RoleBasedAuth allowedRoles={["user"]}><UserProfile /> </RoleBasedAuth></RequireAuth>} />
        <Route path="/business_dashboard" element={<RequireAuth loginPath='/login'> <RoleBasedAuth allowedRoles={["business"]}><BusinessDashboard /></RoleBasedAuth></RequireAuth>}/>
        <Route path="/analytics/:pid" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["business"]}><BusinessAnalytics/></RoleBasedAuth></RequireAuth>} />
        <Route path="/foryou" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["user"]}><ForYou/></RoleBasedAuth></RequireAuth>} />
        <Route path="/catalog" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["user"]}><Catalog/></RoleBasedAuth></RequireAuth>} />
        <Route path="/business_add_post" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["business"]}><BusinessAddPost/></RoleBasedAuth></RequireAuth>} />
        <Route path="/business_profile" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["business"]}><BusinessProfile/></RoleBasedAuth></RequireAuth>} />
        <Route path="/admin_feed/:pid" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["admin"]}><AdminFeed /></RoleBasedAuth></RequireAuth>} />
        <Route path="/admin_dashboard" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["admin"]}><AdminDashboard/></RoleBasedAuth></RequireAuth>} />
        <Route path="/admin_search_page" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["admin"]}><AdminSearchPage/></RoleBasedAuth></RequireAuth>} />
        <Route path="/foryou-addpost" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["user"]}><ForYouAddPost/></RoleBasedAuth></RequireAuth>} />
        <Route path="/userprofile-additem" element={<RequireAuth loginPath='/login'><RoleBasedAuth allowedRoles={["user"]}><UserProfileAddItem/></RoleBasedAuth></RequireAuth>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

