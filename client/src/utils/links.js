import { IoBarChartSharp } from "react-icons/io5";
import { MdMonitor } from "react-icons/md";
import { FaPhone, FaGlobe, FaMoneyBill, FaMoneyBillAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "Dashboard", path: "/", icon: <IoBarChartSharp /> },
  {
    id: 2,
    text: "buy airtime",
    path: "buy-airtime",
    icon: <FaPhone />,
  },
  { id: 3, text: "buy data", path: "buy-data", icon: <FaGlobe /> },
  {
    id: 4,
    text: "Electricity bill",
    path: "electricity",
    icon: <FaMoneyBillAlt />,
  },
  { id: 5, text: "Tv subscription", path: "tv", icon: <MdMonitor /> },
  {
    id: 6,
    text: "fund wallet",
    path: "/fund-wallet",
    icon: <FaMoneyBill />,
  },
  // { id: 7, text: "transfer", path: "transfer", icon: <IoBarChartSharp /> },
  // { id: 8, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  // { id: 9, text: "add job", path: "add-job", icon: <FaWpforms /> },
  // { id: 10, text: "profile", path: "profile", icon: <ImProfile /> },
  // { id: 11, text: "logout", path: "logout", icon: <ImProfile /> },
];

export default links;
