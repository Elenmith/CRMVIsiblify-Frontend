import DashboardSummary from "../components/DashboardSummary";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold mb-6">Podsumowanie</h1>
      <DashboardSummary />
    </div>
  );
};

export default Dashboard;
