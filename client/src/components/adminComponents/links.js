import { IoBarChartSharp } from "react-icons/io5";
import { MdMonitor } from "react-icons/md";
import { FaPhone, FaGlobe, FaMoneyBill, FaMoneyBillAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "Users", path: "/", icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: "users Transactions",
    path: "buy-airtime",
    icon: <FaPhone />,
  },
  { id: 3, text: "Control prices", path: "buy-data", icon: <FaGlobe /> },
  {
    id: 4,
    text: "Fund users",
    path: "electricity",
    icon: <FaMoneyBillAlt />,
  },
  { id: 5, text: "Email", path: "tv", icon: <MdMonitor /> },
];

export default links;
