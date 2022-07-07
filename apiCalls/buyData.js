import axios from "axios";
import { BadRequestError } from "../errors/index.js";
export const BUY_DATA = async (phoneNumber, planId, network) => {
  const { MY_API_URL, MY_API_PIN, MY_API_KEY } = process.env;

  const availablePlan = {
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
