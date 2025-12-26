// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, Clock, User, Sparkles, ArrowRight } from "lucide-react";
// import { toast } from "sonner";
// import Navbar from "../../components/layout/Navbar";
// import { Footer } from "../../components/layout/Footer";
// const serviceTypes = [
//   {
//     id: "styling",
//     name: "Personal Styling",
//     description: "One-on-one styling consultation with our experts",
//     duration: "60 min",
//     icon: Sparkles,
//   },
//   {
//     id: "fitting",
//     name: "Private Fitting",
//     description: "Exclusive fitting session for special occasions",
//     duration: "90 min",
//     icon: User,
//   },
//   {
//     id: "consultation",
//     name: "Wardrobe Consultation",
//     description: "Comprehensive wardrobe review and recommendations",
//     duration: "120 min",
//     icon: Calendar,
//   },
// ];

// const timeSlots = [
//   "10:00 AM","11:00 AM","12:00 PM",
//   "2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM",
// ];

// export default function Appointment() {
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [formData, setFormData] = useState({
//     name: "", email: "", phone: "", notes: "",
//   });

//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     if (!selectedService || !selectedDate || !selectedTime) {
//       toast.error("Please complete all required fields");
//       return;
//     }
//     toast.success("Your appointment has been scheduled!");
//     setSelectedService("");
//     setSelectedDate("");
//     setSelectedTime("");
//     setFormData({ name: "", email: "", phone: "", notes: "" });
//   };

//   const handleChange = (e:any) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const getAvailableDates = () => {
//     const dates:any = [];
//     const today = new Date();
//     for (let i = 1; i <= 14; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       if (date.getDay() !== 0) dates.push(date);
//     }
//     return dates;
//   };

//   const formatDate = (date:any) =>
//     date.toLocaleDateString("en-US", {
//       weekday:"short",
//       month:"short",
//       day:"numeric",
//     });

//   return (
//     <div>

//       {/* HEADER */}
//       <section className="py-20 md:py-32 border-b">
//         <Navbar />
//         <div className="max-w-5xl mx-auto px-6 text-center">
//           <p className="text-[#6E9F7D] tracking-[0.3em] uppercase text-xs mb-4">
//             Personal Service
//           </p>

//           <h1 className="font-serif text-5xl md:text-7xl mb-6">
//             Book an Appointment
//           </h1>

//           <p className="text-gray-500 max-w-xl mx-auto">
//             Experience personalized styling services at our flagship boutique.
//           </p>
//         </div>
//       </section>

//       {/* FORM SECTION */}
//       <section className="py-20">
//         <div className="max-w-4xl mx-auto px-6">
//           <form onSubmit={handleSubmit} className="space-y-16">

//             {/* SERVICE SELECT */}
//             <div>
//               <h2 className="font-serif text-2xl mb-8">Select Service</h2>

//               <div className="grid md:grid-cols-3 gap-4">
//                 {serviceTypes.map(service => {
//                   const Icon = service.icon;
//                   return (
//                     <button
//                       key={service.id}
//                       type="button"
//                       onClick={() => setSelectedService(service.id)}
//                       className={
//                         `p-8 border text-left transition-all ${
//                           selectedService === service.id
//                             ? "border-[#6E9F7D] bg-[#6E9F7D]/10"
//                             : "hover:border-black/40"
//                         }`
//                       }
//                     >
//                       <Icon className="w-8 h-8 text-[#6E9F7D] mb-5" />

//                       <h3 className="font-medium mb-2">{service.name}</h3>

//                       <p className="text-sm text-gray-500 mb-3">
//                         {service.description}
//                       </p>

//                       <p className="text-sm font-medium text-[#6E9F7D]">
//                         {service.duration}
//                       </p>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* DATE SELECT */}
//             <div>
//               <h2 className="font-serif text-2xl mb-8">Select Date</h2>

//               <div className="flex gap-3 overflow-auto pb-2">
//                 {getAvailableDates().map((date:any) => {
//                   const dateStr = date.toISOString().split("T")[0];
//                   return (
//                     <button
//                       key={dateStr}
//                       type="button"
//                       onClick={() => setSelectedDate(dateStr)}
//                       className={
//                         `px-5 py-4 border min-w-[110px] ${
//                           selectedDate === dateStr
//                             ? "border-[#6E9F7D] bg-[#6E9F7D]/10"
//                             : "hover:border-black/40"
//                         }`
//                       }
//                     >
//                       <p className="text-sm">{formatDate(date)}</p>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* TIME SELECT */}
//             <div>
//               <h2 className="font-serif text-2xl mb-8">Select Time</h2>

//               <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
//                 {timeSlots.map(time => (
//                   <button
//                     key={time}
//                     type="button"
//                     onClick={() => setSelectedTime(time)}
//                     className={
//                       `px-3 py-3 border text-xs tracking-wide ${
//                         selectedTime === time
//                           ? "border-[#6E9F7D] bg-[#6E9F7D]/10"
//                           : "hover:border-black/40"
//                       }`
//                     }
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* USER INFO */}
//             <div>
//               <h2 className="font-serif text-2xl mb-8">Your Information</h2>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-xs tracking-widest uppercase block mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full h-14 px-5 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
//                     placeholder="Your name"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs tracking-widest uppercase block mb-2">
//                     Email *
//                   </label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full h-14 px-5 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
//                     placeholder="email@example.com"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs tracking-widest uppercase block mb-2">
//                     Phone *
//                   </label>
//                   <input
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full h-14 px-5 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
//                     placeholder="+91 **********"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <label className="text-xs tracking-widest uppercase block mb-2">
//                   Additional Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   rows={4}
//                   className="w-full h-14 px-5 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
//                   placeholder="Any special requests?"
//                 />
//               </div>
//             </div>

//             {/* SUBMIT */}
//             <div className="flex flex-col items-center">
//             <button
//   type="submit"
//   className="px-14 py-5 bg-[#6E9F7D] text-black uppercase tracking-wide flex items-center gap-3 justify-center hover:bg-[#628c71] transition shadow-[0_0_25px_#00000040]"
// >
//   <Clock className="w-4 h-4" />
//   Confirm Appointment
//   <ArrowRight className="w-4 h-4" />
// </button>


//               <p className="text-sm text-gray-500 mt-6 mb-24 text-center">
//                 You'll receive a confirmation email with all the details.
//               </p>
//             </div>

//           </form>
//         </div>
//         <Footer />
//       </section>
//     </div>
//   );
// }



import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Navbar from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

import bookingApi from "../../api/BookingApi";

// ---------------- SERVICE UI DATA ----------------
const serviceTypes = [
  {
    id: "styling",
    name: "Personal Styling",
    description: "One-on-one styling consultation with our experts",
    duration: "60 min",
    icon: Sparkles,
  },
  {
    id: "fitting",
    name: "Private Fitting",
    description: "Exclusive fitting session for special occasions",
    duration: "90 min",
    icon: User,
  },
  {
    id: "consultation",
    name: "Wardrobe Consultation",
    description: "Comprehensive wardrobe review and recommendations",
    duration: "120 min",
    icon: Calendar,
  },
];

// Backend enum mapping
const serviceTypeMap: Record<string, string> = {
  styling: "STYLING_CONSULTATION",
  fitting: "PERSONAL_SHOPPING",
  consultation: "VIRTUAL_CONSULTATION",
};

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export default function AppointmentBooking() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Convert AM/PM → backend format HH:mm:ss
  const convertTo24Hour = (timeStr: string) => {
    const time = new Date(`1970-01-01 ${timeStr}`);
    return time.toTimeString().split(" ")[0];
  };

  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) dates.push(date); // skip Sunday
    }
    return dates;
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ---------------- SUBMIT → API CALL ----------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error("Please complete all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        appointmentDate: selectedDate,
        appointmentTime: convertTo24Hour(selectedTime),
        serviceType: serviceTypeMap[selectedService],
        notes: formData.notes || "",
      };

      const res = await bookingApi.createAppointment(payload);

      toast.success("Appointment booked successfully!");
      console.log("APPOINTMENT CREATED:", res);

      // Reset form
      setSelectedService("");
      setSelectedDate("");
      setSelectedTime("");
      setFormData({ name: "", email: "", phone: "", notes: "" });
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to book appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <section className="py-20 md:py-32 border-b">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#6E9F7D] tracking-[0.3em] uppercase text-xs mb-4">
            Personal Service
          </p>

          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            Book an Appointment
          </h1>

          <p className="text-gray-500 max-w-xl mx-auto">
            Experience personalized styling services at our flagship boutique.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-16">
            {/* SERVICE SELECT */}
            <div>
              <h2 className="font-serif text-2xl mb-8">Select Service</h2>

              <div className="grid md:grid-cols-3 gap-4">
                {serviceTypes.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`p-8 border text-left transition-all ${
                        selectedService === service.id
                          ? "border-[#6E9F7D] bg-[#6E9F7D]/10"
                          : "hover:border-black/40"
                      }`}
                    >
                      <Icon className="w-8 h-8 text-[#6E9F7D] mb-5" />
                      <h3 className="font-medium mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {service.description}
                      </p>
                      <p className="text-sm font-medium text-[#6E9F7D]">
                        {service.duration}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DATE */}
            <div>
              <h2 className="font-serif text-2xl mb-8">Select Date</h2>

              <div className="flex gap-3 overflow-auto pb-2">
                {getAvailableDates().map((date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={`px-5 py-4 border min-w-[110px] ${
                        selectedDate === dateStr
                          ? "border-[#6E9F7D] bg-[#6E9F7D]/10"
                          : "hover:border-black/40"
                      }`}
                    >
                      <p className="text-sm">{formatDate(date)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TIME */}
            <div>
              <h2 className="font-serif text-2xl mb-8">Select Time</h2>

              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-3 border text-xs tracking-wide ${
                      selectedTime === time
                        ? "border-[#6E9F7D] bg-[#6E9F7D]/10"
                        : "hover:border-black/40"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* USER INFO */}
            <div>
              <h2 className="font-serif text-2xl mb-8">Your Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-5 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-5 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2">
                    Phone *
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-5 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
                    placeholder="+91 **********"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs tracking-widest uppercase block mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 bg-[#1E2225] border border-[#2C3236] text-white placeholder-gray-400 focus:border-[#6E9F7D] outline-none transition"
                  placeholder="Any special requests?"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="px-14 py-5 bg-[#6E9F7D] text-black uppercase tracking-wide flex items-center gap-3 justify-center hover:bg-[#628c71] transition shadow-[0_0_25px_#00000040]"
              >
                {loading ? "Booking..." : (
                  <>
                    <Clock className="w-4 h-4" />
                    Confirm Appointment
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 mt-6 mb-24 text-center">
                You'll receive a confirmation email with all the details.
              </p>
            </div>
          </form>
        </div>

        <Footer />
      </section>
    </div>
  );
}
