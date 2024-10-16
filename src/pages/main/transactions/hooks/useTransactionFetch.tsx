import axios from "axios";

export default function useTransactionFetch() {
  const getTransactions = async () => {
    const response = await axios.get("api/transactions");
    const data = await response.data;
    return data;
  };
  return { getTransactions };
}
