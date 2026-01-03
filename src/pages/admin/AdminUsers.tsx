// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiEye, FiEdit, FiTrash, FiX, FiSearch } from "react-icons/fi";
// import { format } from "date-fns";

// const STATIC_USERS = [
//   {
//     id: 101,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     phone: "9876543210",
//     role: "CUSTOMER",
//     status: "ACTIVE",
//     createdAt: "2025-12-20T10:30:00",
//   },
//   {
//     id: 102,
//     name: "Bob Smith",
//     email: "bob@example.com",
//     phone: "9123456789",
//     role: "CUSTOMER",
//     status: "BLOCKED",
//     createdAt: "2025-12-21T14:00:00",
//   },
//   {
//     id: 103,
//     name: "Priya Sharma",
//     email: "priya@example.com",
//     phone: "9012345678",
//     role: "CUSTOMER",
//     status: "ACTIVE",
//     createdAt: "2025-12-19T09:20:00",
//   },
//   {
//     id: 104,
//     name: "Rohit Verma",
//     email: "rohit@example.com",
//     phone: "9988776655",
//     role: "CUSTOMER",
//     status: "ACTIVE",
//     createdAt: "2025-12-18T08:15:00",
//   },
//   {
//     id: 105,
//     name: "Neha Kapoor",
//     email: "neha@example.com",
//     phone: "9090909090",
//     role: "CUSTOMER",
//     status: "BLOCKED",
//     createdAt: "2025-12-17T11:45:00",
//   },
// ];

// const AdminUsers = () => {
//   const [users, setUsers] = useState(STATIC_USERS);

//   // ========= Search =========
//   const [search, setSearch] = useState("");

//   // ========= Sorting =========
//  const [sortKey, setSortKey] = useState<keyof typeof STATIC_USERS[0]>("createdAt");
// const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//   const handleSort = (key: keyof typeof STATIC_USERS[0]) => {
//    if (sortKey === key) {
//   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// } else {
//   setSortKey(key);
//   setSortOrder("desc");
// }
//   };

//   // ========= Pagination =========
//  const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(5);

//   const filteredUsers = useMemo(() => {
//     return users
//       .filter(
//         (u) =>
//           u.name.toLowerCase().includes(search.toLowerCase()) ||
//           u.email.toLowerCase().includes(search.toLowerCase())
//       )
//       .sort((a: any, b: any) => {
//         const valA = a[sortKey];
//         const valB = b[sortKey];

//         if (valA < valB) return sortOrder === "asc" ? -1 : 1;
//         if (valA > valB) return sortOrder === "asc" ? 1 : -1;
//         return 0;
//       });
//   }, [users, search, sortKey, sortOrder]);

// const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
// const paginatedUsers = filteredUsers.slice(
//   page * rowsPerPage,
//   page * rowsPerPage + rowsPerPage
// );

//   // ========= Modals =========
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editName, setEditName] = useState("");
//   const [editRole, setEditRole] = useState("");

//   const deleteUser = (id: number) => {
//     setUsers((prev) => prev.filter((u) => u.id !== id));
//   };

//   const saveEdit = () => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === selectedUser.id ? { ...u, name: editName, role: editRole } : u
//       )
//     );
//     setShowEditModal(false);
//   };

//   const statusColors: Record<string, string> = {
//     ACTIVE: "bg-green-500/20 text-green-400",
//     BLOCKED: "bg-red-500/20 text-red-400",
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-white">User Management</h2>
//           <p className="text-dark-400 mt-1">{users.length} users</p>
//         </div>

//         {/* Search */}
//         <div className="relative w-72">
//           <FiSearch className="absolute left-3 top-3 text-dark-400" />
//           <input
//             placeholder="Search users..."
//             className="input-field pl-10"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(0);
//             }}
//           />
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="glass-card rounded-2xl overflow-x-auto p-4">
//         <table className="w-full text-sm text-dark-300">
//           <thead>
//             <tr className="text-left text-dark-400 border-b border-dark-700">
//               {[
//                 { key: "id", label: "ID" },
//                 { key: "name", label: "Name" },
//                 { key: "email", label: "Email" },
//                 { key: "phone", label: "Phone" },
//                 { key: "status", label: "Status" },
//                 { key: "role", label: "Role" },
//                 { key: "createdAt", label: "Joined" },
//               ].map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key as any)}
//                   className="py-3 cursor-pointer select-none"
//                 >
//                   {col.label}{" "}
//                   {sortKey === col.key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
//                 </th>
//               ))}

//               <th className="text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr key={user.id} className="border-b border-dark-800">
//                 <td className="py-3">{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>

//                 <td>
//                   <span
//                     className={`px-3 py-1 rounded-lg text-xs font-semibold ${
//                       statusColors[user.status]
//                     }`}
//                   >
//                     {user.status}
//                   </span>
//                 </td>

//                 <td>{user.role}</td>

//                 <td>{format(new Date(user.createdAt), "MMM dd, yyyy")}</td>

//                 <td>
//                   <div className="flex justify-end gap-3">
//                     <FiEye
//                       className="text-primary-400 cursor-pointer"
//                       onClick={() => {
//                         setSelectedUser(user);
//                         setShowViewModal(true);
//                       }}
//                     />
//                     <FiEdit
//                       className="text-yellow-400 cursor-pointer"
//                       onClick={() => {
//                         setSelectedUser(user);
//                         setEditName(user.name);
//                         setEditRole(user.role);
//                         setShowEditModal(true);
//                       }}
//                     />
//                     <FiTrash
//                       className="text-red-400 cursor-pointer"
//                       onClick={() => deleteUser(user.id)}
//                     />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {paginatedUsers.length === 0 && (
//           <p className="text-center text-dark-500 py-6">No results found</p>
//         )}
//       </div>

//    <div className="flex justify-between items-center">
//   {/* Rows Per Page */}
//   <div className="flex items-center gap-2">
//     <span className="text-dark-300">Rows per page:</span>
//     <select
//       value={rowsPerPage}
//       onChange={(e) => {
//         setRowsPerPage(Number(e.target.value));
//         setPage(0);
//       }}
//       className="input-field w-24"
//     >
//       <option value={10}>10</option>
//       <option value={15}>15</option>
//       <option value={20}>20</option>
//       <option value={25}>25</option>
//       <option value={30}>30</option>
//     </select>
//   </div>

//   {/* Pagination Buttons */}
//   <div className="flex items-center gap-3">
//     <button
//       disabled={page === 0}
//       onClick={() => setPage(page - 1)}
//       className="btn-ghost px-6 disabled:opacity-40"
//     >
//       Prev
//     </button>

//     <span className="text-dark-300 pt-2">
//       Page {page + 1} of {totalPages || 1}
//     </span>

//     <button
//       disabled={page + 1 >= totalPages}
//       onClick={() => setPage(page + 1)}
//       className="btn-ghost px-6 disabled:opacity-40"
//     >
//       Next
//     </button>
//   </div>
// </div>


//       {/* VIEW MODAL */}
//       <AnimatePresence>
//         {showViewModal && selectedUser && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowViewModal(false)}
//               className="backdrop-overlay"
//             />

//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="glass-card rounded-2xl p-6 max-w-lg w-full"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold text-white">
//                     {selectedUser.name}
//                   </h2>
//                   <FiX
//                     className="text-dark-400 cursor-pointer"
//                     size={22}
//                     onClick={() => setShowViewModal(false)}
//                   />
//                 </div>

//                 <p>Email: {selectedUser.email}</p>
//                 <p>Phone: {selectedUser.phone}</p>
//                 <p>Role: {selectedUser.role}</p>
//                 <p>Status: {selectedUser.status}</p>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* EDIT MODAL */}
//       <AnimatePresence>
//         {showEditModal && selectedUser && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowEditModal(false)}
//               className="backdrop-overlay"
//             />

//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="glass-card rounded-2xl p-6 max-w-md w-full"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold text-white">Edit User</h2>
//                   <FiX
//                     className="text-dark-400 cursor-pointer"
//                     size={22}
//                     onClick={() => setShowEditModal(false)}
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <input
//                     className="input-field"
//                     value={editName}
//                     onChange={(e) => setEditName(e.target.value)}
//                   />

//                   <select
//                     value={editRole}
//                     onChange={(e) => setEditRole(e.target.value)}
//                     className="input-field"
//                   >
//                     <option value="CUSTOMER">CUSTOMER</option>
//                     <option value="ADMIN">ADMIN</option>
//                   </select>

//                   <div className="flex gap-3 pt-4">
//                     <button onClick={saveEdit} className="btn-primary flex-1">
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setShowEditModal(false)}
//                       className="btn-ghost flex-1"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminUsers;


// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiEye, FiEdit, FiTrash, FiX, FiSearch } from "react-icons/fi";
// import { format } from "date-fns";
// import { userApi, type User } from "../../api/userApi";

// const AdminUsers = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // -------- SEARCH --------
//   const [search, setSearch] = useState("");

//   // -------- SORT --------
//   const [sortKey, setSortKey] =
//     useState<keyof User>("createdAt");
//   const [sortOrder, setSortOrder] =
//     useState<"asc" | "desc">("desc");

//   const handleSort = (key: keyof User) => {
//     if (sortKey === key)
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     else {
//       setSortKey(key);
//       setSortOrder("desc");
//     }
//   };

//   // -------- FETCH USERS --------
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await userApi.getCustomers(page, rowsPerPage);

//         // ensure newest first
//         const sorted = [...res.content].sort(
//           (a, b) =>
//             new Date(b.createdAt).getTime() -
//             new Date(a.createdAt).getTime()
//         );

//         setUsers(sorted);
//         setTotalPages(res.totalPages);
//         setTotalUsers(res.totalElements);
//       } catch (err) {
//         setError("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [page, rowsPerPage]);

//   // -------- FILTER + SORT --------
//   const filteredUsers = useMemo(() => {
//     return users
//       .filter(
//         (u) =>
//           u.name.toLowerCase().includes(search.toLowerCase()) ||
//           u.email.toLowerCase().includes(search.toLowerCase())
//       )
//       .sort((a: any, b: any) => {
//         const valA = a[sortKey];
//         const valB = b[sortKey];

//         if (valA < valB) return sortOrder === "asc" ? -1 : 1;
//         if (valA > valB) return sortOrder === "asc" ? 1 : -1;
//         return 0;
//       });
//   }, [users, search, sortKey, sortOrder]);

//   // -------- MODALS --------
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [showViewModal, setShowViewModal] = useState(false);

//   const statusColors: Record<string, string> = {
//     ACTIVE: "bg-green-500/20 text-green-400",
//     BLOCKED: "bg-red-500/20 text-red-400",
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-white">
//             User Management
//           </h2>
//           <p className="text-dark-400 mt-1">
//             {totalUsers} users
//           </p>
//         </div>

//         {/* Search */}
//         <div className="relative w-72">
//           <FiSearch className="absolute left-3 top-3 text-dark-400" />
//           <input
//             placeholder="Search users..."
//             className="input-field pl-10"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="glass-card rounded-2xl overflow-x-auto p-4">
//         {loading ? (
//           <p className="text-center text-dark-400 py-6">
//             Loading…
//           </p>
//         ) : error ? (
//           <p className="text-center text-red-400 py-6">
//             {error}
//           </p>
//         ) : filteredUsers.length === 0 ? (
//           <p className="text-center text-dark-500 py-6">
//             No users found
//           </p>
//         ) : (
//           <table className="w-full text-sm text-dark-300">
//            <thead>
//   <tr className="text-left text-dark-400 border-b border-dark-700">
//     <th className="py-3">ID</th>
//     <th>Name</th>
//     <th>Email</th>
//     <th>Phone</th>
//     <th className="text-center">Orders</th>
//     <th className="text-center">Appointments</th>
//     <th>Role</th>
//     <th
//       className="cursor-pointer select-none"
//       onClick={() => handleSort("createdAt")}
//     >
//       Joined {sortKey === "createdAt" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
//     </th>
//     <th className="text-right">Actions</th>
//   </tr>
// </thead>

//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="border-b border-dark-800"
//                 >
//                   <td className="py-3">{user.id}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone}</td>
//                   <td className="text-center">{user.orderCount}</td>
//                   <td className="text-center">{user.appointmentCount}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     {format(
//                       new Date(user.createdAt),
//                       "MMM dd, yyyy"
//                     )}
//                   </td>

//                   <td>
//                     <div className="flex justify-end gap-3">
//                       <FiEye
//                         className="text-primary-400 cursor-pointer"
//                         onClick={() => {
//                           setSelectedUser(user);
//                           setShowViewModal(true);
//                         }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Pagination + Rows Per Page */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <span className="text-dark-300">
//             Rows per page:
//           </span>
//           <select
//             value={rowsPerPage}
//             onChange={(e) => {
//               setRowsPerPage(Number(e.target.value));
//               setPage(0);
//             }}
//             className="input-field w-24"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             disabled={page === 0}
//             onClick={() => setPage(page - 1)}
//             className="btn-ghost px-6 disabled:opacity-40"
//           >
//             Prev
//           </button>
//           <span className="text-dark-300 pt-2">
//             Page {page + 1} of {totalPages || 1}
//           </span>

//           <button
//             disabled={page + 1 >= totalPages}
//             onClick={() => setPage(page + 1)}
//             className="btn-ghost px-6 disabled:opacity-40"
//             >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* VIEW MODAL */}
//       <AnimatePresence>
//         {showViewModal && selectedUser && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setShowViewModal(false)}
//               className="backdrop-overlay"
//             />
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="glass-card rounded-2xl p-6 max-w-lg w-full"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold text-white">
//                     {selectedUser.name}
//                   </h2>
//                   <FiX
//                     className="text-dark-400 cursor-pointer"
//                     size={22}
//                     onClick={() => setShowViewModal(false)}
//                   />
//                 </div>
//                 <p>Email: {selectedUser.email}</p>
//                 <p>Phone: {selectedUser.phone}</p>
//                 <p>Role: {selectedUser.role}</p>
//                 <p>Status: {selectedUser.isActive ? "ACTIVE" : "BLOCKED"}</p>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
// export default AdminUsers;

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiTrash,
  FiX,
  FiSearch,
  FiPackage,
  FiCalendar,
} from "react-icons/fi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { userApi, type User } from "../../api/userApi";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [search, setSearch] = useState("");

  // Sort (Newest first)
  const [sortKey, setSortKey] = useState<keyof User>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await userApi.getCustomers(page, rowsPerPage);

        const sorted = [...res.content].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setUsers(sorted);
        setTotalPages(res.totalPages);
        setTotalUsers(res.totalElements);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  // Search + Sort
  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a: any, b: any) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [users, search, sortKey, sortOrder]);

  // Status Toggle (UI only)
  const handleStatusChange = (id: number, isActive: boolean) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, isActive } : u
      )
    );
  };

  // Delete (UI only)
  const handleDeleteUser = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // View Modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-dark-400 mt-1">{totalUsers} users</p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <FiSearch className="absolute left-3 top-3 text-dark-400" />
          <input
            className="input-field pl-10"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-x-auto p-4">
        {loading ? (
          <p className="text-center text-dark-400 py-6">Loading…</p>
        ) : error ? (
          <p className="text-center text-red-400 py-6">{error}</p>
        ) : (
          <table className="w-full text-sm text-dark-300 table-fixed">
            {/* COLUMN WIDTH CONTROL */}
            <colgroup>
              <col className="w-[70px]" />   {/* ID */}
              <col className="w-[160px]" />  {/* Name */}
              <col className="w-[280px]" />  {/* Email */}
              <col className="w-[160px]" />  {/* Phone */}
              <col className="w-[200px]" />  {/* Status */}
              <col className="w-[160px]" />  {/* Created At */}
              <col className="w-[180px]" />  {/* Actions */}
            </colgroup>

            <thead>
              <tr className="text-left text-dark-400 border-b border-dark-700">
                <th className="py-4 px-2">ID</th>
                <th className="py-4 px-3">Name</th>
                <th className="py-4 px-3">Email</th>
                <th className="py-4 px-3">Phone</th>
                <th className="py-4 px-3 text-center">Status</th>
                <th
                  className="py-4 px-3 cursor-pointer select-none"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At{" "}
                  {sortKey === "createdAt"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th className="py-4 px-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => {
                const disabled = !user.isActive;

                return (
                  <tr
                    key={user.id}
                    className="border-b border-dark-800 hover:bg-white/5 transition"
                  >
                    <td className="py-4 px-2">{user.id}</td>
                    <td className="py-4 px-3">{user.name}</td>

                    {/* EMAIL (WRAP FIX) */}
                    <td className="py-4 px-3 break-all leading-5">
                      {user.email}
                    </td>

                    {/* PHONE */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      {user.phone}
                    </td>

                    {/* STATUS TOGGLE */}
                    <td className="py-4 px-3">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() =>
                            handleStatusChange(user.id, !user.isActive)
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                            ${user.isActive ? "bg-green-500" : "bg-red-500"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                              ${user.isActive ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                        <span
                          className={`text-xs font-semibold
                            ${user.isActive ? "text-green-400" : "text-red-400"}`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      {format(new Date(user.createdAt), "MMM dd, yyyy")}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 px-3">
                      <div
                        className={`flex justify-end items-center gap-5 pr-2
                          ${disabled ? "opacity-40 pointer-events-none" : ""}`}
                      >
                        <FiEye
                          title="View"
                          className="text-primary-400 cursor-pointer hover:scale-110 transition"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowViewModal(true);
                          }}
                        />

                        <FiTrash
                          title="Delete"
                          className="text-red-400 cursor-pointer hover:scale-110 transition"
                          onClick={() => handleDeleteUser(user.id)}
                        />

                        <FiPackage
                          title="Orders"
                          className="text-yellow-400 cursor-pointer hover:scale-110 transition"
                          onClick={() =>
                            navigate(`/admin/orders?userId=${user.id}`)
                          }
                        />

                        <FiCalendar
                          title="Appointments"
                          className="text-blue-400 cursor-pointer hover:scale-110 transition"
                          onClick={() =>
                            navigate(`/admin/appointments?userId=${user.id}`)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-dark-300">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
            className="input-field w-24"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="btn-ghost px-6 disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-dark-300">
            Page {page + 1} of {totalPages || 1}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="btn-ghost px-6 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedUser && (
          <>
            <motion.div
              className="backdrop-overlay"
              onClick={() => setShowViewModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div className="glass-card rounded-2xl p-6 max-w-lg w-full">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {selectedUser.name}
                  </h2>
                  <FiX
                    className="cursor-pointer"
                    onClick={() => setShowViewModal(false)}
                  />
                </div>
                <p>Email: {selectedUser.email}</p>
                <p>Phone: {selectedUser.phone}</p>
                <p>Role: {selectedUser.role}</p>
                <p>Status: {selectedUser.isActive ? "ACTIVE" : "INACTIVE"}</p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;
