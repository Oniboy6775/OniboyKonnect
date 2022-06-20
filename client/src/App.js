import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import IsAdmin from "./pages/IsAdmin";
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  BuyData,
  BuyAirtime,
  Electricity,
  FundWallet,
  TvSub,
} from "./pages/dashboard";
import { Admin, MyUsers } from "./pages/admin";

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
          <Route index element={<Stats />} />

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
          {/* <Route index element={<Admin />} /> */}
          <Route path="users" element={<MyUsers />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
