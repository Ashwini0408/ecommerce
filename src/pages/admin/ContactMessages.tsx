import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiTrash2, FiX, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

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
      const res = await fetch("/api/admin/contact", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // --- FILTERED DATA ---
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      return (
        m.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        m.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        m.subject.toLowerCase().includes(filters.subject.toLowerCase()) &&
        m.message.toLowerCase().includes(filters.message.toLowerCase())
      );
    });
  }, [messages, filters]);

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
      await fetch(`/api/admin/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Message deleted");
      fetchMessages();
    } catch {
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
                {["Name", "Email", "Subject", "Message"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700"
                  >
                    <div className="flex flex-col">
                      <span className="mb-1">{col}</span>
                      <div className="flex items-center border rounded px-2">
                        {/* <FiSearch className="text-gray-400" size={14} /> */}
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
                    </div>
                  </th>
                ))}
                {/* <th className="px-4 py-3 text-xs font-semibold uppercase text-gray-700 w-32">
                  Actions
                </th> */}
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
                paginatedMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{msg.name}</td>
                    <td className="px-4 py-3">{msg.email}</td>
                    <td className="px-4 py-3">{msg.subject}</td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => setViewMessage(msg)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
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
              className="btn-ghost"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn-ghost"
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
                  <h3 className="text-xl font-bold">Message</h3>
                  <button onClick={() => setViewMessage(null)}>
                    <FiX />
                  </button>
                </div>
                <div className="space-y-2">
                  <p><b>Name:</b> {viewMessage.name}</p>
                  <p><b>Email:</b> {viewMessage.email}</p>
                  <p><b>Subject:</b> {viewMessage.subject}</p>
                  <p className="mt-4 whitespace-pre-wrap">
                    {viewMessage.message}
                  </p>
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
