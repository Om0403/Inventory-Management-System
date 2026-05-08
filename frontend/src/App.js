import React, { useState } from "react";
import Login from "./pages/Login";
import Production from "./components/Production";
import Orders from "./components/Orders";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const [page, setPage] = useState("production"); // default page

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 h-screen">
        <h2 className="text-xl font-bold mb-6">Inventory</h2>

        <ul>

          <li
            className="mb-3 cursor-pointer hover:text-gray-300"
            onClick={() => setPage("production")}
          >
            Production
          </li>

          <li
            className="mb-3 cursor-pointer hover:text-gray-300"
            onClick={() => setPage("orders")}
          >
            Orders
          </li>

          <li
            className="mt-6 cursor-pointer text-red-400"
            onClick={() => {
              localStorage.removeItem("token");
              setAuth(false);
            }}
          >
            Logout
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {page === "production" && <Production />}
        {page === "orders" && <Orders />}
      </div>

    </div>
  );
}

export default App;