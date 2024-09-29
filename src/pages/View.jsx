import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Import icons

const View = () => {
  const [registrations, setRegistrations] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const secretRoute = import.meta.env.VITE_SECRET_ROUTE;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${secretRoute}`);
        setRegistrations(response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
  }, [apiUrl, secretRoute]);

  const toggleAttended = async (id, attended) => {
    try {
      await axios.patch(`${apiUrl}/${secretRoute}/${id}/attended`);
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg._id === id ? { ...reg, attended: !attended } : reg
        )
      );
    } catch (error) {
      console.error("Error updating attended status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-slate-900 to-slate-800 min-h-screen">
      <h1 className="text-4xl text-white font-bold mb-6 text-center">Registrations</h1>
      <div className="bg-slate-850 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full bg-slate-900 text-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-slate-700">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Reg. Number</th>
              <th className="py-3 px-4">Trans. Number</th>
              <th className="py-3 px-4">Referral ID</th>
              <th className="py-3 px-4">Payment SS</th>
              <th className="py-3 px-4">Attended</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr
                key={registration._id}
                className="border-b border-slate-700 bg-slate-900 hover:bg-slate-700 transition duration-200"
              >
                <td className="py-4 px-4">{registration.name}</td>
                <td className="py-4 px-4">{registration.email}</td>
                <td className="py-4 px-4">{registration.phone}</td>
                <td className="py-4 px-4">{registration.registrationNumber}</td>
                <td className="py-4 px-4">{registration.transactionNumber}</td>
                <td className="py-4 px-4">{registration.referralId}</td>
                <td className="py-4 px-4">{registration.paymentSS}</td>
                <td className="py-4 px-4 text-center">
                  <label className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={registration.attended}
                      onChange={() =>
                        toggleAttended(registration._id, registration.attended)
                      }
                      className="hidden"
                    />
                    {registration.attended ? (
                      <FaCheckCircle className="text-green-400 h-6 w-6 cursor-pointer hover:text-green-500 transition duration-150" />
                    ) : (
                      <FaRegCircle className="text-red-400 h-6 w-6 cursor-pointer hover:text-red-500 transition duration-150" />
                    )}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View;
