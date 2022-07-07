import axios from "axios";
import { BadRequestError } from "../errors/index.js";
export const BUY_DATA = async (phoneNumber, planId, network) => {
  const { MY_API_URL, MY_API_PIN, MY_API_KEY } = process.env;

  const availablePlan = {
    // MTN
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    // CG
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13",

    // GLO
    101: "12",
    102: "13",
    103: "180",
    104: "14",
    105: "15",
    106: "16",
    107: "18",
    108: "65",
    109: "218",
    110: "219",
    111: "220",
    // AIRTEL
    201: "264",
    202: "266",
    203: "267",
    204: "268",
    205: "269",
    206: "273",
    207: "274",
    208: "275",
    // 9MOBILE
    301: "237",
    302: "238",
    303: "182",
    304: "239",
    305: "183",
    306: "184",
    307: "185",
    308: "186",
    309: "187",
    310: "188",
    311: "189",
    312: "190",
  };
  const isPlanExist = availablePlan.hasOwnProperty(planId);
  if (!isPlanExist) throw new BadRequestError("The plan does not exist");
  const selectedPlan = availablePlan[planId];

  const apiResponse = await axios.post(
    `${MY_API_URL}/buy/data`,
    {
      mobile_number: phoneNumber,
      plan: selectedPlan,
      network: network,
      userPin: MY_API_PIN,
    },
    {
      headers: {
        Authorization: `Bearer ${MY_API_KEY}`,
      },
    }
  );

  if (apiResponse.statusCode == 200) return true;
  return false;
};
