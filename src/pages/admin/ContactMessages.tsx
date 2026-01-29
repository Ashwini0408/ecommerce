// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiEye, FiTrash2, FiX, FiSearch } from "react-icons/fi";
// import toast from "react-hot-toast";

// interface ContactMessage {
//   id: number;
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
//   createdAt: string;
// }

// const AdminContactMessages = () => {
//   // --- DATA ---
//   const [messages, setMessages] = useState<ContactMessage[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- VIEW MODAL ---
//   const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);

//   // --- COLUMN FILTERS ---
//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   // --- PAGINATION ---
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // --- FETCH ---
//   const fetchMessages = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/admin/contact", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       setMessages(Array.isArray(data) ? data : []);
//     } catch {
//       toast.error("Failed to load contact messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   // --- FILTERED DATA ---
//   const filteredMessages = useMemo(() => {
//     return messages.filter((m) => {
//       return (
//         m.name.toLowerCase().includes(filters.name.toLowerCase()) &&
//         m.email.toLowerCase().includes(filters.email.toLowerCase()) &&
//         m.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
//         m.message.toLowerCase().includes(filters.message.toLowerCase())
//       );
//     });
//   }, [messages, filters]);

//   // --- PAGINATION ---
//   const paginatedMessages = useMemo(() => {
//     return filteredMessages.slice(
//       (page - 1) * rowsPerPage,
//       page * rowsPerPage
//     );
//   }, [filteredMessages, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredMessages.length / rowsPerPage);

//   // --- DELETE ---
//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this message?")) return;

//     try {
//       await fetch(`/api/admin/contact/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       toast.success("Message deleted");
//       fetchMessages();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold">Contact Messages</h2>
//           <p className="text-gray-600 mt-1">
//             {filteredMessages.length} messages total
//           </p>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
//         <div className="overflow-x-auto flex-1">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["Name", "Email", "Subject", "Message"].map((col) => (
//                   <th
//                     key={col}
//                     className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
//                   >
//                     <div className="flex flex-col">
//                       <span className="mb-1">{col}</span>
//                       <div className="flex items-center border rounded px-2">
//                         {/* <FiSearch className="text-gray-400" size={14} /> */}
//                         <input
//                           className="px-2 py-1 text-xs outline-none w-full"
//                           placeholder={`Search ${col}`}
//                           value={(filters as any)[col.toLowerCase()]}
//                           onChange={(e) =>
//                             setFilters((prev) => ({
//                               ...prev,
//                               [col.toLowerCase()]: e.target.value,
//                             }))
//                           }
//                         />
//                       </div>
//                     </div>
//                   </th>
//                 ))}
//                 {/* <th className="px-4 py-3 text-xs font-semibold uppercase text-gray-700 w-32">
//                   Actions
//                 </th> */}
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y">
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-8">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedMessages.length > 0 ? (
//                 paginatedMessages.map((msg) => (
//                   <tr key={msg.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">{msg.name}</td>
//                     <td className="px-4 py-3">{msg.email}</td>
//                     <td className="px-4 py-3">{msg.subject}</td>
//                     <td className="px-4 py-3 max-w-xs truncate">
//                       {msg.message}
//                     </td>
//                     <td className="px-4 py-3 flex gap-2">
//                       <button
//                         onClick={() => setViewMessage(msg)}
//                         className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
//                       >
//                         <FiEye />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(msg.id)}
//                         className="p-1.5 text-red-600 hover:bg-red-50 rounded"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center py-8 text-gray-500">
//                     No messages found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-between items-center px-4 py-3 border-t">
//           <div className="text-sm text-gray-600">
//             Page {page} of {totalPages || 1}
//           </div>
//           <div className="flex gap-2">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => p - 1)}
//               className="btn-ghost"
//             >
//               Prev
//             </button>
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((p) => p + 1)}
//               className="btn-ghost"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* VIEW MODAL */}
//       <AnimatePresence>
//         {viewMessage && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/50 z-40"
//               onClick={() => setViewMessage(null)}
//             />
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center p-4"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//             >
//               <div className="bg-white rounded-xl p-6 max-w-xl w-full">
//                 <div className="flex justify-between mb-4">
//                   <h3 className="text-xl font-bold">Message</h3>
//                   <button onClick={() => setViewMessage(null)}>
//                     <FiX />
//                   </button>
//                 </div>
//                 <div className="space-y-2">
//                   <p><b>Name:</b> {viewMessage.name}</p>
//                   <p><b>Email:</b> {viewMessage.email}</p>
//                   <p><b>Subject:</b> {viewMessage.subject}</p>
//                   <p className="mt-4 whitespace-pre-wrap">
//                     {viewMessage.message}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminContactMessages;


// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiEye, FiTrash2, FiX, FiSearch } from "react-icons/fi";
// import toast from "react-hot-toast";
// import { ContactAdminApi, type ContactMessage,  } from "../../api/contactAdminApi"; // Adjust the import path as needed

// const AdminContactMessages = () => {
//   // --- DATA ---
//   const [messages, setMessages] = useState<ContactMessage[]>([]);
//   const [loading, setLoading] = useState(true);

//   // --- VIEW MODAL ---
//   const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);

//   // --- COLUMN FILTERS ---
//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   // --- PAGINATION ---
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // --- FETCH ---
//   const fetchMessages = async () => {
//     try {
//       setLoading(true);
//       const data = await ContactAdminApi.getAllContacts();
//       setMessages(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       toast.error("Failed to load contact messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   // --- FILTERED DATA ---
//   const filteredMessages = useMemo(() => {
//     return messages.filter((m) => {
//       return (
//         m.name.toLowerCase().includes(filters.name.toLowerCase()) &&
//         m.email.toLowerCase().includes(filters.email.toLowerCase()) &&
//         m.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
//         m.message.toLowerCase().includes(filters.message.toLowerCase())
//       );
//     });
//   }, [messages, filters]);

//   // --- PAGINATION ---
//   const paginatedMessages = useMemo(() => {
//     return filteredMessages.slice(
//       (page - 1) * rowsPerPage,
//       page * rowsPerPage
//     );
//   }, [filteredMessages, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredMessages.length / rowsPerPage);

//   // --- DELETE ---
//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this message?")) return;

//     try {
//       await ContactAdminApi.deleteContact(id);
//       toast.success("Message deleted");
//       fetchMessages(); // Refresh the list
//     } catch (error) {
//       console.error("Error deleting message:", error);
//       toast.error("Delete failed");
//     }
//   };

//   // Optional: Fetch single message for view modal (if needed)
//   const handleViewMessage = async (id: number) => {
//     try {
//       const message = await ContactAdminApi.getContactById(id);
//       setViewMessage(message);
//     } catch (error) {
//       console.error("Error fetching message details:", error);
//       toast.error("Failed to load message details");
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold">Contact Messages</h2>
//           <p className="text-gray-600 mt-1">
//             {filteredMessages.length} messages total
//           </p>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
//         <div className="overflow-x-auto flex-1">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["Name", "Email", "Subject", "Action"].map((col) => (
//                   <th
//                     key={col}
//                     className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
//                   >
//                     <div className="flex flex-col">
//                       <span className="mb-1">{col}</span>
//                       {col !== "Action" && (
//                         <div className="flex items-center border rounded px-2">
//                           <input
//                             className="px-2 py-1 text-xs outline-none w-full"
//                             placeholder={`Search ${col}`}
//                             value={(filters as any)[col.toLowerCase()]}
//                             onChange={(e) =>
//                               setFilters((prev) => ({
//                                 ...prev,
//                                 [col.toLowerCase()]: e.target.value,
//                               }))
//                             }
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y">
//               {loading ? (
//                 <tr>
//                   <td colSpan={4} className="text-center py-8">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedMessages.length > 0 ? (
//                 paginatedMessages.map((msg) => (
//                   <tr key={msg.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">{msg.name}</td>
//                     <td className="px-4 py-3">{msg.email}</td>
//                     <td className="px-4 py-3">{msg.subject}</td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => setViewMessage(msg)}
//                           // Alternative: If you want to fetch fresh data each time:
//                           // onClick={() => handleViewMessage(msg.id)}
//                           className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
//                           title="View full message"
//                         >
//                           <FiEye className="w-4 h-4" />
//                           {/* <span className="text-sm font-medium">View</span> */}
//                         </button>
//                         <button
//                           onClick={() => handleDelete(msg.id)}
//                           className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
//                           title="Delete message"
//                         >
//                           <FiTrash2 className="w-4 h-4" />
//                           {/* <span className="text-sm font-medium">Delete</span> */}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="text-center py-8 text-gray-500">
//                     No messages found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-between items-center px-4 py-3 border-t">
//           <div className="text-sm text-gray-600">
//             Page {page} of {totalPages || 1}
//           </div>
//           <div className="flex gap-2">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => p - 1)}
//               className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Prev
//             </button>
//             <button
//               disabled={page === totalPages || totalPages === 0}
//               onClick={() => setPage((p) => p + 1)}
//               className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* VIEW MODAL */}
//       <AnimatePresence>
//         {viewMessage && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/50 z-40"
//               onClick={() => setViewMessage(null)}
//             />
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center p-4"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//             >
//               <div className="bg-white rounded-xl p-6 max-w-xl w-full">
//                 <div className="flex justify-between mb-4">
//                   <h3 className="text-xl font-bold">Message Details</h3>
//                   <button 
//                     onClick={() => setViewMessage(null)}
//                     className="p-2 hover:bg-gray-100 rounded"
//                   >
//                     <FiX className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Name</p>
//                       <p className="font-medium">{viewMessage.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Email</p>
//                       <p className="font-medium">{viewMessage.email}</p>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Subject</p>
//                     <p className="font-medium">{viewMessage.subject}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Message</p>
//                     <div className="mt-2 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
//                       {viewMessage.message}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">Received</p>
//                     <p>{new Date(viewMessage.createdAt).toLocaleString()}</p>
//                   </div>
//                   <div className="pt-4 border-t">
//                     <p className="text-sm text-gray-500 mb-1">Message ID</p>
//                     <p className="font-mono text-sm">{viewMessage.id}</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminContactMessages;


import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiTrash2, FiX, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { ContactAdminApi, type ContactMessage } from "../../api/contactAdminApi";

const AdminContactMessages = () => {
  // --- DATA ---
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // --- VIEW MODAL ---
  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);

  // --- COLUMN FILTERS ---
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // --- PAGINATION ---
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- FETCH ---
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await ContactAdminApi.getAllContacts();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // --- SORT MESSAGES IN DESCENDING ORDER (NEWEST FIRST) ---
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [messages]);

  // --- FILTERED DATA ---
  const filteredMessages = useMemo(() => {
    return sortedMessages.filter((m) => {
      return (
        m.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        m.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        m.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
        m.message.toLowerCase().includes(filters.message.toLowerCase())
      );
    });
  }, [sortedMessages, filters]);

  // --- PAGINATION ---
  const paginatedMessages = useMemo(() => {
    return filteredMessages.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  }, [filteredMessages, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredMessages.length / rowsPerPage);

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message?")) return;

    try {
      await ContactAdminApi.deleteContact(id);
      toast.success("Message deleted");
      fetchMessages(); // Refresh the list
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-gray-600 mt-1">
            {filteredMessages.length} messages total
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Serial No Column */}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700 w-20">
                  <span>Sr No</span>
                </th>
                
                {/* Other Columns */}
                {["Name", "Email", "Subject", "Action"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                  >
                    <div className="flex flex-col">
                      <span className="mb-1">{col}</span>
                      {col !== "Action" && (
                        <div className="flex items-center border rounded px-2">
                          <input
                            className="px-2 py-1 text-xs outline-none w-full"
                            placeholder={`Search ${col}`}
                            value={(filters as any)[col.toLowerCase()]}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                [col.toLowerCase()]: e.target.value,
                              }))
                            }
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : paginatedMessages.length > 0 ? (
                paginatedMessages.map((msg, index) => {
                  // Calculate serial number based on current page and index
                  const serialNumber = (page - 1) * rowsPerPage + index + 1;
                  
                  return (
                    <tr key={msg.id} className="hover:bg-gray-50">
                      {/* Serial No Cell */}
                      <td className="px-4 py-3 text-center text-gray-600 font-medium">
                        {serialNumber}
                      </td>
                      
                      {/* Name */}
                      <td className="px-4 py-3">{msg.name}</td>
                      
                      {/* Email */}
                      <td className="px-4 py-3">
                        <a 
                          href={`mailto:${msg.email}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {msg.email}
                        </a>
                      </td>
                      
                      {/* Subject */}
                      <td className="px-4 py-3">{msg.subject}</td>
                      
                      {/* Action */}
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewMessage(msg)}
                            className="flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                            title="View full message"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                            title="Delete message"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-4 py-3 border-t">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages || 1}
          </div>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {viewMessage && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setViewMessage(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="bg-white rounded-xl p-6 max-w-xl w-full">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">Message Details</h3>
                  <button 
                    onClick={() => setViewMessage(null)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="font-medium">{viewMessage.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium">
                        <a 
                          href={`mailto:${viewMessage.email}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {viewMessage.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Subject</p>
                    <p className="font-medium">{viewMessage.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Message</p>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                      {viewMessage.message}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Received</p>
                    <p>{new Date(viewMessage.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-1">Message ID</p>
                    <p className="font-mono text-sm">{viewMessage.id}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContactMessages;