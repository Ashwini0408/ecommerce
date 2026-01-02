// // import { useState, useMemo } from "react";
// // import { 
// //   format, 
// //   startOfWeek, 
// //   addDays, 
// //   isSameDay, 
// //   addWeeks, 
// //   subWeeks,
// //   addMonths,
// //   subMonths,
// //   startOfMonth,
// //   endOfMonth,
// //   eachDayOfInterval,
// //   getDay
// // } from "date-fns";
// // import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { cn } from "@/lib/utils";

// // export type AppointmentStatus = "scheduled" | "completed" | "cancelled";
// // export type ViewMode = "month" | "week" | "day";

// // export interface Appointment {
// //   id: string;
// //   customerName: string;
// //   customerAvatar?: string;
// //   service: string;
// //   date: Date;
// //   time: string;
// //   status: AppointmentStatus;
// // }

// // // Mock data for demonstration
// // const mockAppointments: Appointment[] = [
// //   {
// //     id: "1",
// //     customerName: "Sophia Lim",
// //     service: "Seasonal Allergy Checkup",
// //     date: new Date(2025, 0, 20),
// //     time: "09:00 AM",
// //     status: "completed",
// //   },
// //   {
// //     id: "2",
// //     customerName: "Amelia Wong",
// //     service: "Diabetes Consultation",
// //     date: new Date(2025, 0, 20),
// //     time: "10:00 AM",
// //     status: "completed",
// //   },
// //   {
// //     id: "3",
// //     customerName: "Michael Tan",
// //     service: "Heart Failure Monitoring",
// //     date: new Date(2025, 0, 21),
// //     time: "10:00 AM",
// //     status: "cancelled",
// //   },
// //   {
// //     id: "4",
// //     customerName: "John Doe",
// //     service: "Routine Heart Checkup",
// //     date: new Date(2025, 0, 22),
// //     time: "09:00 AM",
// //     status: "scheduled",
// //   },
// //   {
// //     id: "5",
// //     customerName: "David Park",
// //     service: "Kidney Stones Observation",
// //     date: new Date(2025, 0, 23),
// //     time: "10:00 AM",
// //     status: "scheduled",
// //   },
// //   {
// //     id: "6",
// //     customerName: "Bambang Saputra",
// //     service: "Migrain Consultation",
// //     date: new Date(2025, 0, 22),
// //     time: "11:00 AM",
// //     status: "scheduled",
// //   },
// //   {
// //     id: "7",
// //     customerName: "Richard Evans",
// //     service: "Stroke Emergency Review",
// //     date: new Date(2025, 0, 23),
// //     time: "11:00 AM",
// //     status: "scheduled",
// //   },
// // ];

// // const timeSlots = [
// //   "9 AM",
// //   "10 AM",
// //   "11 AM",
// //   "12 PM",
// //   "1 PM",
// //   "2 PM",
// //   "3 PM",
// //   "4 PM",
// //   "5 PM",
// // ];

// // const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
// //   const statusConfig = {
// //     scheduled: {
// //       label: "Scheduled",
// //       className: "text-status-scheduled bg-status-scheduled-bg",
// //     },
// //     completed: {
// //       label: "Completed",
// //       className: "text-status-completed bg-status-completed-bg",
// //     },
// //     cancelled: {
// //       label: "Cancelled",
// //       className: "text-status-cancelled bg-status-cancelled-bg",
// //     },
// //   };

// //   const config = statusConfig[status];

// //   return (
// //     <span className={cn("text-xs px-2 py-0.5 rounded-sm font-medium", config.className)}>
// //       {config.label}
// //     </span>
// //   );
// // };

// // const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
// //   const borderColors = {
// //     scheduled: "border-l-status-scheduled",
// //     completed: "border-l-status-completed",
// //     cancelled: "border-l-status-cancelled",
// //   };

// //   const initials = appointment.customerName
// //     .split(" ")
// //     .map((n) => n[0])
// //     .join("")
// //     .toUpperCase();

// //   return (
// //     <div
// //       className={cn(
// //         "bg-card p-3 rounded-sm border-l-4 mb-2 hover:shadow-md transition-shadow",
// //         borderColors[appointment.status]
// //       )}
// //     >
// //       <p className="text-xs text-muted-foreground mb-2">{appointment.time}</p>
// //       <div className="flex items-center gap-2 mb-2">
// //         <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-medium">
// //           {initials}
// //         </div>
// //         <span className="text-sm font-medium truncate">{appointment.customerName}</span>
// //       </div>
// //       <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
// //         {appointment.service}
// //       </p>
// //       <StatusBadge status={appointment.status} />
// //     </div>
// //   );
// // };

// // interface AppointmentCalendarProps {
// //   appointments?: Appointment[];
// // }

// // export const AppointmentCalendar = ({
// //   appointments = mockAppointments,
// // }: AppointmentCalendarProps) => {
// //   const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 20));
// //   const [statusFilter, setStatusFilter] = useState<string>("all");
// //   const [viewMode, setViewMode] = useState<ViewMode>("week");

// //   const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
// //   const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

// //   // Get days for month view
// //   const monthStart = startOfMonth(currentDate);
// //   const monthEnd = endOfMonth(currentDate);
// //   const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
// //   const startPadding = getDay(monthStart);
// //   const paddedMonthDays = [
// //     ...Array(startPadding).fill(null),
// //     ...monthDays
// //   ];

// //   const filteredAppointments = useMemo(() => {
// //     if (statusFilter === "all") return appointments;
// //     return appointments.filter((apt) => apt.status === statusFilter);
// //   }, [appointments, statusFilter]);

// //   const getAppointmentsForSlot = (day: Date, timeSlot: string) => {
// //     return filteredAppointments.filter((apt) => {
// //       const aptHour = parseInt(apt.time.split(":")[0]);
// //       const aptPeriod = apt.time.includes("PM") ? "PM" : "AM";
// //       const slotHour = parseInt(timeSlot.split(" ")[0]);
// //       const slotPeriod = timeSlot.includes("PM") ? "PM" : "AM";

// //       return isSameDay(apt.date, day) && aptHour === slotHour && aptPeriod === slotPeriod;
// //     });
// //   };

// //   const getAppointmentsForDay = (day: Date) => {
// //     return filteredAppointments.filter((apt) => isSameDay(apt.date, day));
// //   };

// //   const navigate = (direction: "prev" | "next") => {
// //     setCurrentDate((prev) => {
// //       switch (viewMode) {
// //         case "month":
// //           return direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1);
// //         case "week":
// //           return direction === "next" ? addWeeks(prev, 1) : subWeeks(prev, 1);
// //         case "day":
// //           return direction === "next" ? addDays(prev, 1) : addDays(prev, -1);
// //         default:
// //           return prev;
// //       }
// //     });
// //   };

// //   const goToToday = () => {
// //     setCurrentDate(new Date());
// //   };

// //   const getHeaderTitle = () => {
// //     switch (viewMode) {
// //       case "month":
// //         return format(currentDate, "MMMM yyyy");
// //       case "week":
// //         const weekEnd = addDays(weekStart, 6);
// //         return `${format(weekStart, "MMM d")} – ${format(weekEnd, "d, yyyy")}`;
// //       case "day":
// //         return format(currentDate, "EEEE, MMMM d, yyyy");
// //       default:
// //         return "";
// //     }
// //   };

// //   return (
// //     <div className="bg-card rounded-sm border border-border overflow-hidden">
// //       {/* Header */}
// //       <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
// //         <div className="flex items-center gap-3">
// //           {/* Navigation Arrows */}
// //           <div className="flex items-center gap-1">
// //             <button
// //               variant="outline"
// //               size="icon"
// //               className="h-8 w-8"
// //               onClick={() => navigate("prev")}
// //             >
// //               <ChevronLeft className="h-4 w-4" />
// //             </button>
// //             <button
// //               variant="outline"
// //               size="icon"
// //               className="h-8 w-8"
// //               onClick={() => navigate("next")}
// //             >
// //               <ChevronRight className="h-4 w-4" />
// //             </button>
// //           </div>

// //           {/* Today Button */}
// //           <button
// //             variant="outline"
// //             size="sm"
// //             className="h-8 px-3"
// //             onClick={goToToday}
// //           >
// //             today
// //           </button>

// //           {/* Date Title */}
// //           <h2 className="text-lg font-semibold min-w-[200px]">
// //             {getHeaderTitle()}
// //           </h2>
// //         </div>

// //         <div className="flex items-center gap-3">
// //           {/* Status Filter */}
// //           <Select value={statusFilter} onValueChange={setStatusFilter}>
// //             <SelectTrigger className="w-[140px] h-9 bg-background">
// //               <SelectValue placeholder="Status" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="all">All Status</SelectItem>
// //               <SelectItem value="scheduled">Scheduled</SelectItem>
// //               <SelectItem value="completed">Completed</SelectItem>
// //               <SelectItem value="cancelled">Cancelled</SelectItem>
// //             </SelectContent>
// //           </Select>

// //           {/* View Mode Toggle */}
// //           <div className="flex items-center bg-primary rounded-sm overflow-hidden">
// //             {(["month", "week", "day"] as ViewMode[]).map((mode) => (
// //               <button
// //                 key={mode}
// //                 onClick={() => setViewMode(mode)}
// //                 className={cn(
// //                   "px-3 py-1.5 text-sm font-medium transition-colors",
// //                   viewMode === mode
// //                     ? "bg-primary-foreground text-primary"
// //                     : "text-primary-foreground hover:bg-primary-foreground/10"
// //                 )}
// //               >
// //                 {mode}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Month View */}
// //       {viewMode === "month" && (
// //         <div className="p-4">
// //           <div className="grid grid-cols-7 gap-1">
// //             {/* Day Headers */}
// //             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
// //               <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground bg-secondary/50">
// //                 {day}
// //               </div>
// //             ))}
// //             {/* Calendar Days */}
// //             {paddedMonthDays.map((day, index) => {
// //               if (!day) {
// //                 return <div key={`empty-${index}`} className="p-2 min-h-[100px] bg-muted/20" />;
// //               }
// //               const dayAppointments = getAppointmentsForDay(day);
// //               const isToday = isSameDay(day, new Date());
// //               return (
// //                 <div
// //                   key={index}
// //                   className={cn(
// //                     "p-2 min-h-[100px] border border-border/50",
// //                     isToday && "bg-accent/10"
// //                   )}
// //                 >
// //                   <span className={cn(
// //                     "text-sm font-medium",
// //                     isToday && "bg-accent text-accent-foreground px-2 py-0.5 rounded-full"
// //                   )}>
// //                     {format(day, "d")}
// //                   </span>
// //                   <div className="mt-1 space-y-1">
// //                     {dayAppointments.slice(0, 2).map((apt) => (
// //                       <div
// //                         key={apt.id}
// //                         className={cn(
// //                           "text-xs p-1 rounded truncate",
// //                           apt.status === "scheduled" && "bg-status-scheduled-bg text-status-scheduled",
// //                           apt.status === "completed" && "bg-status-completed-bg text-status-completed",
// //                           apt.status === "cancelled" && "bg-status-cancelled-bg text-status-cancelled"
// //                         )}
// //                       >
// //                         {apt.time} {apt.customerName}
// //                       </div>
// //                     ))}
// //                     {dayAppointments.length > 2 && (
// //                       <div className="text-xs text-muted-foreground">
// //                         +{dayAppointments.length - 2} more
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       )}

// //       {/* Week View */}
// //       {viewMode === "week" && (
// //         <div className="overflow-x-auto">
// //           <div className="min-w-[900px]">
// //             {/* Day Headers */}
// //             <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border bg-secondary/50">
// //               <div className="p-3 border-r border-border text-xs text-muted-foreground">all-day</div>
// //               {weekDays.map((day, index) => {
// //                 const isToday = isSameDay(day, new Date());
// //                 const isWeekend = getDay(day) === 0 || getDay(day) === 6;
// //                 return (
// //                   <div
// //                     key={index}
// //                     className={cn(
// //                       "p-3 text-center border-r border-border last:border-r-0",
// //                       isToday && "bg-accent/20",
// //                       isWeekend && "text-destructive"
// //                     )}
// //                   >
// //                     <p className="text-xs font-medium">
// //                       {format(day, "EEE")} {format(day, "M/d")}
// //                     </p>
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             {/* Time Slots */}
// //             {timeSlots.map((timeSlot) => (
// //               <div
// //                 key={timeSlot}
// //                 className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border last:border-b-0 min-h-[100px]"
// //               >
// //                 <div className="p-3 text-xs text-muted-foreground border-r border-border flex items-start">
// //                   {timeSlot}
// //                 </div>
// //                 {weekDays.map((day, dayIndex) => {
// //                   const slotAppointments = getAppointmentsForSlot(day, timeSlot);
// //                   const isToday = isSameDay(day, new Date());
// //                   return (
// //                     <div
// //                       key={dayIndex}
// //                       className={cn(
// //                         "p-2 border-r border-border last:border-r-0",
// //                         isToday && "bg-accent/5"
// //                       )}
// //                     >
// //                       {slotAppointments.map((apt) => (
// //                         <AppointmentCard key={apt.id} appointment={apt} />
// //                       ))}
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Day View */}
// //       {viewMode === "day" && (
// //         <div className="overflow-x-auto">
// //           <div className="min-w-[400px]">
// //             {/* Day Header */}
// //             <div className="grid grid-cols-[80px_1fr] border-b border-border bg-secondary/50">
// //               <div className="p-3 border-r border-border text-xs text-muted-foreground">all-day</div>
// //               <div className="p-3 text-center">
// //                 <p className="text-sm font-medium">
// //                   {format(currentDate, "EEEE, MMM d")}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Time Slots */}
// //             {timeSlots.map((timeSlot) => {
// //               const slotAppointments = getAppointmentsForSlot(currentDate, timeSlot);
// //               return (
// //                 <div
// //                   key={timeSlot}
// //                   className="grid grid-cols-[80px_1fr] border-b border-border last:border-b-0 min-h-[100px]"
// //                 >
// //                   <div className="p-3 text-xs text-muted-foreground border-r border-border flex items-start">
// //                     {timeSlot}
// //                   </div>
// //                   <div className="p-2">
// //                     {slotAppointments.map((apt) => (
// //                       <AppointmentCard key={apt.id} appointment={apt} />
// //                     ))}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // 


// import { useState, useMemo } from "react";
// import {
//   format,
//   startOfWeek,
//   addDays,
//   isSameDay,
//   addWeeks,
//   subWeeks,
//   addMonths,
//   subMonths,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   getDay
// } from "date-fns";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// // small class helper
// const cn = (...c: any[]) => c.filter(Boolean).join(" ");

// // ================= TYPES =================
// export type AppointmentStatus = "scheduled" | "completed" | "cancelled";
// export type ViewMode = "month" | "week" | "day";

// interface Appointment {
//   id: string;
//   customerName: string;
//   service: string;
//   date: Date;
//   time: string;
//   status: AppointmentStatus;
// }

// // ================= DEMO DATA =================
// const mockAppointments: Appointment[] = [
//   { id: "1", customerName: "Sophia Lim", service: "Seasonal Allergy Checkup", date: new Date(2025, 0, 20), time: "09:00 AM", status: "completed" },
//   { id: "2", customerName: "Amelia Wong", service: "Diabetes Consultation", date: new Date(2025, 0, 20), time: "10:00 AM", status: "completed" },
//   { id: "3", customerName: "Michael Tan", service: "Heart Failure Monitoring", date: new Date(2025, 0, 21), time: "10:00 AM", status: "cancelled" },
//   { id: "4", customerName: "John Doe", service: "Routine Heart Checkup", date: new Date(2025, 0, 22), time: "09:00 AM", status: "scheduled" },
//   { id: "5", customerName: "David Park", service: "Kidney Stones Observation", date: new Date(2025, 0, 23), time: "10:00 AM", status: "scheduled" },
//   { id: "6", customerName: "Bambang Saputra", service: "Migraine Consultation", date: new Date(2025, 0, 22), time: "11:00 AM", status: "scheduled" },
//   { id: "7", customerName: "Richard Evans", service: "Stroke Emergency Review", date: new Date(2025, 0, 23), time: "11:00 AM", status: "scheduled" },
// ];

// const timeSlots = ["9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"];

// // ================= BADGE =================
// const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
//   const m: any = {
//     scheduled: "text-yellow-400 bg-yellow-400/20",
//     completed: "text-green-400 bg-green-400/20",
//     cancelled: "text-red-400 bg-red-400/20",
//   };

//   return <span className={cn("text-xs px-2 py-0.5 rounded", m[status])}>{status}</span>;
// };

// // ================= CARD =================
// const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
//   const border: any = {
//     scheduled: "border-yellow-400",
//     completed: "border-green-400",
//     cancelled: "border-red-400",
//   };

//   const initials = appointment.customerName
//     .split(" ")
//     .map(n => n[0])
//     .join("")
//     .toUpperCase();

//   return (
//     <div className={cn("bg-dark-800 p-3 mb-2 rounded border-l-4", border[appointment.status])}>
//       <p className="text-xs text-gray-400">{appointment.time}</p>

//       <div className="flex gap-2 items-center my-1">
//         <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs">
//           {initials}
//         </div>
//         <p className="text-white text-sm">{appointment.customerName}</p>
//       </div>

//       <p className="text-xs text-gray-400 mb-2">{appointment.service}</p>

//       <StatusBadge status={appointment.status} />
//     </div>
//   );
// };

// // ================= MAIN =================
// export default function AdminAppointment() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [viewMode, setViewMode] = useState<ViewMode>("week");

//   const weekStart = startOfWeek(currentDate);
//   const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

//   const monthStart = startOfMonth(currentDate);
//   const monthEnd = endOfMonth(currentDate);
//   const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
//   const startPadding = getDay(monthStart);
//   const paddedMonth = [...Array(startPadding).fill(null), ...monthDays];

//   const filtered = useMemo(() => {
//     if (statusFilter === "all") return mockAppointments;
//     return mockAppointments.filter(a => a.status === statusFilter);
//   }, [statusFilter]);

//   const navigate = (dir: "prev" | "next") => {
//     setCurrentDate(p =>
//       viewMode === "month"
//         ? dir === "next" ? addMonths(p,1) : subMonths(p,1)
//         : viewMode === "week"
//         ? dir === "next" ? addWeeks(p,1) : subWeeks(p,1)
//         : addDays(p, dir === "next" ? 1 : -1)
//     );
//   };

//   return (
//     <div className="bg-dark-900 border border-gray-700 rounded-lg overflow-hidden">

//       {/* HEADER */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-700">

//         <div className="flex items-center gap-2">
//           <button className="h-8 w-8 border border-gray-600 rounded text-white" onClick={() => navigate("prev")}>
//             <ChevronLeft size={16}/>
//           </button>

//           <button className="h-8 w-8 border border-gray-600 rounded text-white" onClick={() => navigate("next")}>
//             <ChevronRight size={16}/>
//           </button>

//           <button onClick={() => setCurrentDate(new Date())} className="h-8 px-3 border border-gray-600 rounded text-white">
//             TODAY
//           </button>

//           <h2 className="text-white ml-3 text-lg font-semibold">
//             {viewMode === "week"
//               ? `${format(weekStart,"MMM d")} - ${format(addDays(weekStart,6),"d, yyyy")}`
//               : viewMode === "month"
//               ? format(currentDate,"MMMM yyyy")
//               : format(currentDate,"MMMM d, yyyy")}
//           </h2>
//         </div>

//         <select
//           value={statusFilter}
//           onChange={e => setStatusFilter(e.target.value)}
//           className="h-9 bg-dark-800 border border-gray-600 text-white px-2 rounded"
//         >
//           <option value="all">All Status</option>
//           <option value="scheduled">Scheduled</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         <div className="flex border border-gray-600 rounded overflow-hidden">
//           {["month","week","day"].map(mode => (
//             <button
//               key={mode}
//               onClick={() => setViewMode(mode as ViewMode)}
//               className={`px-3 py-1 text-sm text-white ${viewMode === mode ? "bg-white text-black" : ""}`}
//             >
//               {mode}
//             </button>
//           ))}
//         </div>
//       </div>


//       {/* WEEK VIEW */}
//       {viewMode === "week" && (
//         <div className="overflow-x-auto">
//           <div className="min-w-[900px]">

//             <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-700 bg-dark-800">
//               <div className="p-3 text-xs text-gray-400 border-r border-gray-700">all-day</div>

//               {weekDays.map((d,i)=>(
//                 <div key={i} className="p-3 border-r border-gray-700 text-center">
//                   <p className="text-xs text-white">{format(d,"EEE M/d")}</p>
//                 </div>
//               ))}
//             </div>

//             {timeSlots.map(slot=>(
//               <div key={slot} className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-700 min-h-[110px]">
//                 <div className="p-3 text-xs text-gray-400 border-r border-gray-700">{slot}</div>

//                 {weekDays.map((d,i)=>{
//                   const list = filtered.filter(a=>{
//                     const h = parseInt(a.time.split(":")[0]);
//                     const sh = parseInt(slot.split(" ")[0]);
//                     return isSameDay(a.date,d) && h===sh;
//                   });

//                   return (
//                     <div key={i} className="p-2 border-r border-gray-700">
//                       {list.map(a=> <AppointmentCard key={a.id} appointment={a} />)}
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}


//       {/* MONTH VIEW */}
//       {viewMode === "month" && (
//         <div className="grid grid-cols-7 border-t border-gray-700">

//           {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
//             <div key={d} className="p-2 text-center text-gray-400 bg-dark-800 border-r border-gray-700 text-xs">
//               {d}
//             </div>
//           ))}

//           {paddedMonth.map((day,i)=>{
//             if(!day) return <div key={i} className="border border-gray-700 min-h-[120px]" />;

//             const dayList = filtered.filter(a=>isSameDay(a.date,day));

//             return (
//               <div key={i} className="border border-gray-700 p-2 min-h-[120px]">
//                 <p className="text-xs text-white mb-1">{format(day,"d")}</p>

//                 {dayList.map(a=>(
//                   <div key={a.id} className="text-xs text-white bg-gray-700 p-1 mb-1 rounded">
//                     {a.time} - {a.customerName}
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//         </div>
//       )}


//       {/* DAY VIEW */}
//       {viewMode === "day" && (
//         <div className="p-4">
//           <h3 className="text-white text-lg mb-3">
//             {format(currentDate,"EEEE, MMM d")}
//           </h3>

//           {filtered.filter(a=>isSameDay(a.date,currentDate)).length===0 && (
//             <p className="text-gray-400">No Appointments Today</p>
//           )}

//           {filtered
//             .filter(a=>isSameDay(a.date,currentDate))
//             .map(a=> <AppointmentCard key={a.id} appointment={a} />)}
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useMemo, useEffect } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay
} from "date-fns";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import appointmentApi from "../../api/appointmentApi";
import toast from "react-hot-toast";

const cn = (...c: any[]) => c.filter(Boolean).join(" ");

type ViewMode = "month" | "week" | "day";

interface Appointment {
  id: number;
  name: string;
  service: string;
  date: Date;
  time: string;
  status: string;
}

// STATUS COLORS – DARK THEME
const statusUI: any = {
  pending: { color: "text-yellow-400", bg: "bg-yellow-400/20", border: "border-yellow-500" },
  scheduled: { color: "text-blue-400", bg: "bg-blue-400/20", border: "border-blue-500" },
  completed: { color: "text-green-400", bg: "bg-green-400/20", border: "border-green-500" },
  cancelled: { color: "text-red-400", bg: "bg-red-400/20", border: "border-red-500" },
};

const AppointmentCard = ({ appt }: { appt: Appointment }) => {
  const ui = statusUI[appt.status] || statusUI.pending;

  return (
    <div className={cn("rounded-md border-l-4 p-2 bg-dark-800 shadow-sm", ui.border)}>
      <p className="text-[11px] text-gray-400 font-bold">{appt.time}</p>

      <p className="font-semibold text-white text-sm truncate">{appt.name}</p>

      <p className="text-[11px] text-gray-400 truncate">
        {appt.service}
      </p>

      <span className={cn("text-[10px] px-2 py-0.5 rounded font-semibold mt-1 inline-block", ui.bg, ui.color)}>
        {appt.status.toUpperCase()}
      </span>
    </div>
  );
};

export default function AdminAppointment() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Search
  const [search, setSearch] = useState("");

  // Calendar
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await appointmentApi.getAllAppointments(page, 50);

      const mapped = res.content.map((a: any) => ({
        id: a.id,
        name: a.name,
        service: a.serviceType?.replace(/_/g, " ") || "SERVICE",
        date: new Date(a.appointmentDate),
        time: format(new Date(`2000-01-01T${a.appointmentTime}`), "hh:mm a"),
        status: a.status?.toLowerCase() || "pending"
      }));

      setAppointments(mapped);
      setTotalPages(res.totalPages);
    } catch {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAppointments(); }, [page]);

  // -------- Calendar Logic ----------
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);
  const paddedMonth = [...Array(startPadding).fill(null), ...monthDays];

  const timeSlots = [
    "09:00 AM","10:00 AM","11:00 AM",
    "12:00 PM","01:00 PM","02:00 PM",
    "03:00 PM","04:00 PM","05:00 PM"
  ];

  const filtered = useMemo(() => {
    let data = appointments;

    if (search.trim() !== "") {
      data = data.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [appointments, search]);

  const navigate = (dir: "prev" | "next") => {
    setCurrentDate(prev =>
      viewMode === "month"
        ? dir === "next" ? addMonths(prev, 1) : subMonths(prev, 1)
        : dir === "next" ? addWeeks(prev, 1) : subWeeks(prev, 1)
    );
  };

  if (loading)
    return <div className="p-10 text-white text-center">Loading calendar…</div>;


  return (
    <div className="bg-dark-900 border border-gray-700 rounded-lg shadow overflow-hidden">

      {/* HEADER */}
<div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#0d1628] rounded-t-lg">

  {/* LEFT SIDE CONTROLS */}
  <div className="flex items-center gap-2">

{/* PREVIOUS */}
{/* PREVIOUS */}
<button
  onClick={() => navigate("prev")}
  className="h-9 w-6 flex items-center justify-center border border-gray-600 
             hover:bg-gray-700 rounded text-white text-3xl leading-none"
>
  ‹
</button>

{/* NEXT */}
<button
  onClick={() => navigate("next")}
  className="h-9 w-6 flex items-center justify-center border border-gray-600 
             hover:bg-gray-700 rounded text-white text-3xl leading-none"
>
  ›
</button>

    {/* TODAY */}
    <button
  onClick={() => setCurrentDate(new Date())}
  className="h-9 px-4 flex items-center justify-center border border-gray-600 text-white hover:bg-gray-700 rounded"
>
  TODAY
</button>

    {/* DATE TITLE */}
    <h2 className="text-white ml-4 text-lg font-semibold">
      {viewMode === "week"
        ? `${format(weekStart,"MMM d")} - ${format(addDays(weekStart,6),"d, yyyy")}`
        : viewMode === "month"
        ? format(currentDate,"MMMM yyyy")
        : format(currentDate,"MMMM d, yyyy")}
    </h2>
  </div>

  {/* MIDDLE SEARCH */}
  <div className="flex items-center bg-[#0b1423] border border-gray-600 rounded px-3 w-[300px]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9 text-gray-400 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15.001.001A7.5 7.5 0 0117.75 11.25z"/>
    </svg>

    <input
      placeholder="Search customer..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      className="bg-transparent outline-none text-white w-full placeholder-gray-400"
    />
  </div>

  {/* VIEW TOGGLE */}
  <div className="flex border border-gray-600 rounded overflow-hidden">
    {["month","week","day"].map(mode => (
      <button
        key={mode}
        onClick={() => setViewMode(mode as ViewMode)}
        className={`
          px-4 py-1 text-sm font-medium
          ${viewMode === mode
            ? "bg-blue-400 text-black"
            : "text-gray-300 hover:bg-gray-700"}
        `}
      >
        {mode}
      </button>
    ))}
  </div>
</div>

      {/* ---------------- MONTH ---------------- */}
      {viewMode === "month" && (
        <div className="grid grid-cols-7">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
            <div key={d} className="p-2 text-center text-gray-400 border-b bg-dark-800 text-xs">
              {d}
            </div>
          ))}

          {paddedMonth.map((day,i)=>{
            if(!day) return <div key={i} className="border border-gray-700 h-[140px]" />;

            const list = filtered.filter(a=>isSameDay(a.date, day));

            return (
              <div key={i} className="border border-gray-700 p-2 h-[140px] overflow-auto">
                <p className="text-xs text-white mb-1 font-bold">{format(day,"d")}</p>

                {list.map(a=>(
                  <AppointmentCard key={a.id} appt={a}/>
                ))}
              </div>
            );
          })}
        </div>
      )}


      {/* ---------------- WEEK ---------------- */}
      {viewMode === "week" && (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-700 bg-dark-800">
            <div className="p-2 text-xs text-gray-400 border-r">Time</div>

            {weekDays.map(d=>(
              <div key={String(d)} className="p-2 text-center text-xs font-semibold border-r text-white">
                {format(d,"EEE d")}
              </div>
            ))}
          </div>

          {timeSlots.map(slot=>(
  <div
    key={slot}
    className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-700 h-[140px]"
  >
    <div className="p-2 text-xs text-gray-400 border-r flex items-start">
      {slot}
    </div>

    {weekDays.map(day => {
      const list = filtered.filter(a =>
        isSameDay(a.date, day) && a.time === slot
      );

      return (
        <div
          key={String(day)}
          className="p-2 border-r border-gray-700 h-[140px] overflow-y-auto space-y-2"
        >
          {list.map(a => (
            <AppointmentCard key={a.id} appt={a}/>
          ))}
        </div>
      );
    })}
  </div>
))}
        </div>
      )}


      {/* ---------------- DAY ---------------- */}
      {viewMode === "day" && (
        <div className="p-4">
          <h3 className="text-white text-lg mb-2">
            {format(currentDate,"EEEE, MMM dd")}
          </h3>

          {timeSlots.map(slot=>{
            const list = filtered.filter(a =>
              isSameDay(a.date,currentDate) && a.time === slot
            );

            return (
              <div key={slot} className="border border-gray-700 rounded p-3 mb-2">
                <p className="text-xs text-gray-400 mb-2">{slot}</p>

                {list.length === 0 && (
                  <p className="text-gray-500 text-xs">No appointment</p>
                )}

                {list.map(a=>(
                  <AppointmentCard key={a.id} appt={a}/>
                ))}
              </div>
            );
          })}
        </div>
      )}


      {/* ---------------- PAGINATION ---------------- */}
      <div className="flex justify-between p-4 border-t border-gray-700 text-white">

        {/* <button
          disabled={page===0}
          onClick={()=>setPage(p=>p-1)}
          className="px-4 py-2 border border-gray-600 rounded disabled:opacity-40"
        >
          Prev
        </button> */}

        {/* <span>Page {page+1} / {totalPages}</span> */}

        {/* <button
          disabled={page+1>=totalPages}
          onClick={()=>setPage(p=>p+1)}
          className="px-4 py-2 border border-gray-600 rounded disabled:opacity-40"
        >
          Next
        </button> */}

      </div>
    </div>
  );
}
