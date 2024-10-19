import axios from "axios";

export default function useDashboardFetch() {
  const getDashboardSummary = async () => {
    const response = await axios.get("/api/dashboard-summary");
    const data = await response.data;

    return data;
  };

  const getRecentActivities = async () => {
    const response = await axios.get("/api/recent-activities");
    const data = await response.data;
    return data
  }

  return { getDashboardSummary, getRecentActivities };
}
