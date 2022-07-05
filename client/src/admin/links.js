import { IoBarChartSharp, IoPersonCircle } from "react-icons/io5";
import { MdMonitor } from "react-icons/md";
import { FaPhone, FaGlobe, FaMoneyBill, FaMoneyBillAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "Dashboard", path: "/admin", icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: "Users",
    path: "/admin/users",
    icon: <IoPersonCircle />,
  },
  { id: 3, text: "fund wallet", path: "/admin/fund-wallet", icon: <FaGlobe /> },
  {
    id: 4,
    text: "Transactions",
    path: "/admin/transactions",
    icon: <FaMoneyBillAlt />,
  },
  { id: 5, text: "Prices", path: "/admin/prices", icon: <MdMonitor /> },
 
];

export default links;
