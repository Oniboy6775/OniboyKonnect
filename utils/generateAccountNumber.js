import User from "../models/User.js";
import axios from "axios";
const generateAccountNumber = async ({ userName, email }) => {
  const { MONNIFY_API_URL, MONNIFY_API_ENCODED, MONNIFY_API_CONTRACT_CODE } =
    process.env;
  try {
    const response = await axios.post(
      `${MONNIFY_API_URL}/api/v1/auth/login`,
      {},
      {
        headers: {
          Authorization: `Basic ${MONNIFY_API_ENCODED}`,
        },
      }
    );
    const {
      responseBody: { accessToken },
    } = response.data;
    const accountDetails = await axios.post(
      `${MONNIFY_API_URL}/api/v2/bank-transfer/reserved-accounts`,
      {
        accountReference: userName,
        accountName: userName,
        currencyCode: "NGN",
        contractCode: MONNIFY_API_CONTRACT_CODE,
        customerEmail: email,
        customerName: userName,
        getAllAvailableBanks: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log("generating");
    // console.log(accountDetails.data.responseBody.accounts);
    const { bankName, accountNumber } =
      accountDetails.data.responseBody.accounts[0];
    const { bankName: bankName2, accountNumber: accountNumber2 } =
      accountDetails.data.responseBody.accounts[1];
    let userToUpdate = await User.findOne({ userName });
    if (!userToUpdate) userToUpdate = await User.findOne({ email });
    await User.updateOne(
      { _id: userToUpdate._id },
      {
        $set: {
          reservedAccNo: accountNumber,
          reservedAccBank: bankName,
          reservedAccNo2: accountNumber2,
          reservedAccBank2: bankName2,
        },
      }
    );

    console.log("acc number generated");
  } catch (error) {
    console.log(error);
    // console.log("an error occur");
  }
};

export default generateAccountNumber;
