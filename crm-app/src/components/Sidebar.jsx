const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-900 text-white p-6 flex flex-col fixed">
      <h2 className="text-2xl font-bold mb-6">CRM Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <a
            href="/dashboard"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            📊 Dashboard
          </a>
        </li>
        <li>
          <a
            href="/clients"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            👥 Klienci
          </a>
        </li>
        <li>
          <a
            href="/calendar"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            📅 Kalendarz
          </a>
        </li>
        <li>
          <a
            href="/orders"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            📦 Zamówienia
          </a>
        </li>
        <li>
          <a
            href="/marketing"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            📢 Marketing
          </a>
        </li>
        <li>
          <a
            href="/strategy"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            🎯 Strategia
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
