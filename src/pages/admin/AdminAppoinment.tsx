import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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

const timeSlots = [
  "10:00 AM","11:00 AM","12:00 PM",
  "2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM",
];

export default function Appointment() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", notes: "",
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error("Please complete all required fields");
      return;
    }

    toast.success("Your appointment has been scheduled!");

    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setFormData({ name: "", email: "", phone: "", notes: "" });
  };

  const handleChange = (e:any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getAvailableDates = () => {
    const dates:any = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) dates.push(date);
    }
    return dates;
  };

  const formatDate = (date:any) =>
    date.toLocaleDateString("en-US", {
      weekday:"short",
      month:"short",
      day:"numeric",
    });

  return (
    <div className="bg-background text-foreground">

      {/* HEADER */}
      <section className="py-20 md:py-32 border-b border-border text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="w-8 h-px bg-sage" />
          <p className="text-sage tracking-[0.3em] text-xs uppercase">
            Personal Service
          </p>
          <div className="w-8 h-px bg-sage" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-7xl mb-6"
        >
          Book an Appointment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Experience personalized styling services at our flagship boutique.
        </motion.p>
      </section>

      {/* FORM */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-16">

            {/* SERVICE */}
            <div>
              <h2 className="font-serif text-2xl mb-8">Select Service</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceTypes.map(service => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`p-8 border transition-all text-left
                        ${
                          selectedService === service.id
                          ? "border-sage bg-sage/5"
                          : "border-border hover:border-foreground/30"
                        }`
                      }
                    >
                      <Icon className="w-8 h-8 text-sage mb-5" />
                      <h3 className="font-medium mb-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {service.description}
                      </p>
                      <p className="text-sm font-medium text-sage">
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
                {getAvailableDates().map((date:any) => {
                  const dateStr = date.toISOString().split("T")[0];
                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={`px-5 py-4 border min-w-[110px] transition
                        ${
                          selectedDate === dateStr
                          ? "border-sage bg-sage/5"
                          : "border-border hover:border-foreground/30"
                        }`
                      }
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
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-3 border text-xs tracking-wide transition
                      ${
                        selectedTime === time
                        ? "border-sage bg-sage/5"
                        : "border-border hover:border-foreground/30"
                      }`
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* USER INFO */}
            <div>
              <h2 className="font-serif text-2xl mb-8">Your Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest block mb-2">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full h-14 px-5 bg-secondary border border-border focus:border-sage outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest block mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full h-14 px-5 bg-secondary border border-border focus:border-sage outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest block mb-2">
                    Phone *
                  </label>
                  <input
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 **********"
                    className="w-full h-14 px-5 bg-secondary border border-border focus:border-sage outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs uppercase tracking-widest block mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special requests?"
                  className="w-full px-5 py-4 bg-secondary border border-border focus:border-sage outline-none"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="px-14 py-5 bg-sage text-black uppercase tracking-wide flex items-center gap-3 hover:bg-sage/80 transition"
              >
                <Clock className="w-4 h-4" />
                Confirm Appointment
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                You'll receive a confirmation email with all details.
              </p>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
}
