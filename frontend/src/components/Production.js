import React, { useEffect, useState } from "react";
import { getProducts, addProduction } from "../services/api";

function Production() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: "AAC Block",
    size: "",
    quantity: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const sizes = ['4"', '5"', '6"', '8"', '9"'];

  // ✅ FIXED FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        productName: form.productName.trim(),
        size: form.size.trim(),
        quantity: Number(form.quantity)
      };

      await addProduction(payload);

      alert("Production added successfully");

      await loadProducts();

      setForm({
        productName: "AAC Block",
        size: "",
        quantity: ""
      });

    } catch (err) {
      console.error("Error adding production:", err);
      alert(err?.response?.data?.message || "Failed to add production");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Production Management</h1>
        <p className="text-gray-600">Track and manage production entries</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Production</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">

          {/* Product */}
          <div>
            <label className="block text-sm mb-1">Product</label>
            <input
              value={form.productName}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm mb-1">Size</label>
            <select
              value={form.size}
              onChange={(e) =>
                setForm({ ...form, size: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Size</option>
              {sizes.map((size, i) => (
                <option key={i} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm mb-1">Quantity</label>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: Number(e.target.value)
                })
              }
              className="w-full p-2 border rounded"
              placeholder="Enter quantity"
              required
            />
          </div>

          {/* Button */}
          <div className="col-span-3">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded font-semibold">
              Add Production
            </button>
          </div>
        </form>
      </div>

      {/* ✅ REAL DATA TABLE */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Current Stock</h2>

        <table className="w-full text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Product</th>
              <th>Size</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.productName}</td>
                <td>{p.size}</td>
                <td>{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Production;