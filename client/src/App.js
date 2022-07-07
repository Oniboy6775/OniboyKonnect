import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import IsAdmin from "./pages/IsAdmin";
import {
  AllJobs,
  Profile,
  SharedLayout,
  AddJob,
  BuyData,
  BuyAirtime,
  Electricity,
  FundWallet,
  TvSub,
  Dashboard,
} from "./pages/dashboard";
import { Admin } from "./admin";
import {
  AdminDashboard,
  MyUsers,
  Transactions,
  Prices,
  FundUserWallet,
} from "./admin/pages";
// import Prices from "./admin/pages/Prices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="buy-airtime" element={<BuyAirtime />} />
          <Route path="buy-data" element={<BuyData />} />
          <Route path="electricity" element={<Electricity />} />
          <Route path="tv" element={<TvSub />} />
          <Route path="fund-wallet" element={<FundWallet />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="admin"
          element={
            <IsAdmin>
              <Admin />
            </IsAdmin>
          }
        >
          {/* <Route element={<AdminDashboard />} /> */}
          <Route index element={<MyUsers />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="prices" element={<Prices />} />
          <Route path="fund-user-wallet" element={<FundUserWallet />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
