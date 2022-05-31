import axios from "axios";

// const apiUrl = process.env.MY_API_PIN;
// console.log(apiUrl);
export const BUY_AIRTIME = async (phoneNumber, amount) => {
  const apiResponse = await axios.post(
    "https://datareloaded-backend.herokuapp.com/api/v1/buy/airtime",
    {
      mobile_number: phoneNumber,
      amount,
      network: 1,
      userPin: "6775",
    },
    {
      headers: {
        Authorization: `Bearer YOOQADCDvzbaDSdUF4WNsJnFFqmfru`,
      },
    }
  );
  console.log(apiResponse);
  if (apiResponse.statusCode == 200) return true;
  return false;
};
