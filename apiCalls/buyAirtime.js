import express from "express";
import axios from "axios";
export const BUY_AIRTIME = async (phoneNumber, amount, network) => {
  const { MY_API_URL, MY_API_PIN, MY_API_KEY } = process.env;
  const availableNetwork = {
    1: "2", //MTN
    2: "3", //GLO
    3: "1", //AIRTEL
    4: "4", //9MOBILE
  };
  const isNetworkAvailable = availableNetwork.hasOwnProperty(network);
  if (!isNetworkAvailable) return false;
  const selectedNetwork = availableNetwork[network];
  const apiResponse = await axios.post(
    `${MY_API_URL}/buy/airtime`,
    {
      mobile_number: phoneNumber,
      amount,
      network: selectedNetwork,
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
