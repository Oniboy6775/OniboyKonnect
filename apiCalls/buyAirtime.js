import express from "express";
import axios from "axios";
export const BUY_AIRTIME = async (phoneNumber, amount, network) => {
  const { API_URL, MY_API_PIN, MY_API_KEY } = process.env;
  const apiResponse = await axios.post(
    `${API_URL}/buy/airtime`,
    {
      mobile_number: phoneNumber,
      amount,
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
