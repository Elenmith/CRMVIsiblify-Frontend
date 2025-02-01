const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-lg font-bold text-gray-700">👥 Klienci</h2>
        <p className="text-3xl font-semibold text-gray-900">128</p>
      </div>
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-lg font-bold text-gray-700">📅 Spotkania</h2>
        <p className="text-3xl font-semibold text-gray-900">24</p>
      </div>
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-lg font-bold text-gray-700">📦 Zamówienia</h2>
        <p className="text-3xl font-semibold text-gray-900">37</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
