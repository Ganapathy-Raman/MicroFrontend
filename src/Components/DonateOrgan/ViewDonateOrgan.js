import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";

function ViewDonateOrgan() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7878/organDonation/all")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (donationId) => {
    const conf = window.confirm("Do you want to delete this record?");
    if (conf) {
      axios
        .delete("http://localhost:7878/organDonation/" + donationId)
        .then(() => {
          alert("Donate Organ record has been deleted");
          setRecords(records.filter(record => record.donationId !== donationId));
        })
        .catch((err) => console.log(err));
    }
  };

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Header />
      <br />
      <div className="container mx-auto p-6">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for available organ donators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-2/3 lg:w-1/2 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 10 4zm8 14h-2v-1h2v1zm-4 0h-2v-1h2v1z" />
          </svg>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-gray-50 divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-600">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {col.replace(/([A-Z])/g, ' $1').trim()}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{d.donationId}</td>
                  <td className="px-4 py-3 text-gray-800">{d.donorId.donorId}</td>
                  <td className="px-4 py-3 text-gray-800">{d.organType}</td>
                  <td className="px-4 py-3 text-gray-800">{d.donationDate}</td>
                  <td className="px-4 py-3 text-gray-800">{d.recipientId.recipientId}</td>
                  <td className="px-4 py-3 text-gray-800">{d.status}</td>
                  <td className="px-4 py-3 flex space-x-2">
                    <Link to={`/editDonateOrgan/${d.donationId}`}>
                      <button
                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition duration-200"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.121 3.879l-9.707 9.707a1.004 1.004 0 0 0-.237.32L3 15.707v2.293h2.293l.68-1.4 9.707-9.707a1.004 1.004 0 0 0 .237-.32L17 6.293V4h-2.293l-1.4.68zm-6.116 12.586L6 15.707v-1.414l.292.292 1.707 1.707-.292.293zM15.707 5.707L6.293 15.12 5.293 14.12 14.707 4.707l1.414 1.414zm-2.828-1.415L11 4.707l-2 2-1.414-1.414 2-2 1.414 1.414z" />
                        </svg>
                      </button>
                    </Link>
                    <button
                      className="p-2 rounded-full text-red-600 hover:bg-red-100 transition duration-200"
                      title="Delete"
                      onClick={() => handleSubmit(d.donationId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewDonateOrgan;
