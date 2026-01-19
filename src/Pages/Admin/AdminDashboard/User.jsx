import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../config/api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        "/api/admin/users"
      );
      setUsers(res.data.data);
    } catch (error) {
      console.error("Fetch users error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-xl">

        {/* HEADER */}
        <div
          className="px-6 py-4 rounded-t-xl
                     bg-linear-to-r from-green-600 to-green-500
                     text-white"
        >
          <h2 className="text-lg font-semibold tracking-wide">
            Registered Users
          </h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            {/* TABLE HEAD */}
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="text-left px-6 py-3">#</th>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-left px-6 py-3">Role</th>
                <th className="text-left px-6 py-3">Joined</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-sm text-gray-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-sm text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b text-sm
                               hover:bg-green-50
                               transition duration-200"
                  >
                    <td className="px-6 py-4">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs
                                   bg-green-100 text-green-700"
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
