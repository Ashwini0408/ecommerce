// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi';
// import { useAuth } from '../../hooks/useAuth';
// import { signup } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';
// import {
//   containerVariants,
//   itemVariants,
//   cardVariants,
// } from '../../animations/authAnimations';


// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isLoading, dispatch } = useAuth();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.name || !formData.email || !formData.password) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       await dispatch(
//         signup({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone || undefined,
//         })
//       ).unwrap();
//       toast.success('Account created successfully!');
//       navigate('/');
//     } catch (err: any) {
//       toast.error(err || 'Signup failed');
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 px-4 py-12">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 90, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: 'linear',
//           }}
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             rotate: [0, -90, 0],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             ease: 'linear',
//           }}
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"
//         />
//       </div>

//       {/* Sign Up Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative z-10 w-full max-w-md"
//       >
//         <div className="glass-card rounded-2xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <Link to="/">
//               <h1 className="text-3xl font-display font-bold gradient-text mb-2">STYLISTE</h1>
//             </Link>
//             <p className="text-dark-400">Create your account and start shopping</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name */}
//             <div>
//               <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="John Doe"
//                   className="input-field pl-10"
//                   required
//                 />
//                 <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                 Email Address *
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="your@email.com"
//                   className="input-field pl-10"
//                   required
//                 />
//                 <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
//               </div>
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="+1 (555) 000-0000"
//                   className="input-field pl-10"
//                 />
//                 <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                 Password *
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="••••••••"
//                   className="input-field pl-10"
//                   required
//                   minLength={6}
//                 />
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                 Confirm Password *
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   placeholder="••••••••"
//                   className="input-field pl-10"
//                   required
//                 />
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
//               </div>
//             </div>

//             {/* Terms */}
//             <label className="flex items-start space-x-2 cursor-pointer text-sm">
//               <input
//                 type="checkbox"
//                 className="accent-primary-500 mt-1"
//                 required
//               />
//               <span className="text-dark-300">
//                 I agree to the{' '}
//                 <a href="#" className="text-primary-400 hover:text-primary-300">
//                   Terms & Conditions
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="text-primary-400 hover:text-primary-300">
//                   Privacy Policy
//                 </a>
//               </span>
//             </label>

//             {/* Submit Button */}
//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
//             >
//               <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
//               {!isLoading && <FiArrowRight />}
//             </motion.button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <div className="flex-1 border-t border-white/10"></div>
//             <span className="px-4 text-sm text-dark-500">OR</span>
//             <div className="flex-1 border-t border-white/10"></div>
//           </div>

//           {/* Login Link */}
//           <div className="text-center">
//             <p className="text-dark-400">
//               Already have an account?{' '}
//               <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
//                 Login
//               </Link>
//             </p>
//           </div>

//           {/* Back to Home */}
//           <div className="text-center mt-6">
//             <Link to="/" className="text-sm text-dark-500 hover:text-dark-300 transition-colors">
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;

// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, type Variants } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi';
// import { useAuth } from '../../hooks/useAuth';
// import { signup } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';

// /* SAME VARIANTS */
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 30, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const containerVariants: Variants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08 } },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 18, scale: 0.98 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isLoading, dispatch } = useAuth();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await dispatch(
//         signup({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone || undefined,
//         })
//       ).unwrap();
//       toast.success('Account created successfully!');
//       navigate('/');
//     } catch (err: any) {
//       toast.error(err || 'Signup failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 px-4 py-12">
//       <motion.div
//         variants={cardVariants}
//         initial="hidden"
//         animate="show"
//         className="relative z-10 w-full max-w-md"
//       >
//         <div className="glass-card rounded-2xl p-8">
//           <motion.form
//             onSubmit={handleSubmit}
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="space-y-5"
//           >
//             {/* Wrap all inputs with motion.div variants={itemVariants} */}
//             {/* Logic unchanged */}
//           </motion.form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;


// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, type Variants } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi';
// import { useAuth } from '../../hooks/useAuth';
// import { signup } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';

// /* ================== ANIMATIONS (TS SAFE) ================== */
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 30, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const containerVariants: Variants = {
//   hidden: {},
//   show: {
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 18, scale: 0.98 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };
// /* ========================================================== */

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isLoading, dispatch } = useAuth();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.password) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       await dispatch(
//         signup({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone || undefined,
//         })
//       ).unwrap();
//       toast.success('Account created successfully!');
//       navigate('/');
//     } catch (err: any) {
//       toast.error(err || 'Signup failed');
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
//       {/* Animated Card */}
//       <motion.div
//         variants={cardVariants}
//         initial="hidden"
//         animate="show"
//         className="relative z-10 w-full max-w-md"
//       >
//         <div className="glass-card rounded-2xl p-8">
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-8">
//             <Link to="/">
//               <h1 className="text-3xl font-serif gradient-text mb-2">
//                 STYLISTE
//               </h1>
//             </Link>
//             <p className="text-muted-foreground">
//               Create your account and start shopping
//             </p>
//           </motion.div>

//           {/* Form */}
//           <motion.form
//             onSubmit={handleSubmit}
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="space-y-5"
//           >
//             {/* Full Name */}
//             <motion.div variants={itemVariants}>
//               <label className="text-sm font-medium text-foreground mb-2 block">
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="John Doe"
//                   className="input-field pl-10 focus:scale-[1.01]"
//                   required
//                 />
//                 <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </motion.div>

//             {/* Email */}
//             <motion.div variants={itemVariants}>
//               <label className="text-sm font-medium text-foreground mb-2 block">
//                 Email Address *
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="your@email.com"
//                   className="input-field pl-10 focus:scale-[1.01]"
//                   required
//                 />
//                 <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </motion.div>

//             {/* Phone */}
//             <motion.div variants={itemVariants}>
//               <label className="text-sm font-medium text-foreground mb-2 block">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="+1 (555) 000-0000"
//                   className="input-field pl-10 focus:scale-[1.01]"
//                 />
//                 <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </motion.div>

//             {/* Password */}
//             <motion.div variants={itemVariants}>
//               <label className="text-sm font-medium text-foreground mb-2 block">
//                 Password *
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   placeholder="••••••••"
//                   className="input-field pl-10 focus:scale-[1.01]"
//                   required
//                   minLength={6}
//                 />
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </motion.div>

//             {/* Confirm Password */}
//             <motion.div variants={itemVariants}>
//               <label className="text-sm font-medium text-foreground mb-2 block">
//                 Confirm Password *
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   placeholder="••••••••"
//                   className="input-field pl-10 focus:scale-[1.01]"
//                   required
//                 />
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </motion.div>

//             {/* Terms */}
//             <motion.label
//               variants={itemVariants}
//               className="flex items-start space-x-2 cursor-pointer text-sm"
//             >
//               <input
//                 type="checkbox"
//                 className="accent-primary mt-1"
//                 required
//               />
//               <span className="text-muted-foreground">
//                 I agree to the{' '}
//                 <a href="#" className="text-sage hover:underline">
//                   Terms & Conditions
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="text-sage hover:underline">
//                   Privacy Policy
//                 </a>
//               </span>
//             </motion.label>

//             {/* Submit */}
//             <motion.button
//               variants={itemVariants}
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
//             >
//               <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
//               {!isLoading && <FiArrowRight />}
//             </motion.button>
//           </motion.form>

//           {/* Divider */}
//           <motion.div
//             variants={itemVariants}
//             className="flex items-center my-6"
//           >
//             <div className="flex-1 border-t border-border"></div>
//             <span className="px-4 text-sm text-muted-foreground">OR</span>
//             <div className="flex-1 border-t border-border"></div>
//           </motion.div>

//           {/* Login Link */}
//           <motion.div variants={itemVariants} className="text-center">
//             <p className="text-muted-foreground">
//               Already have an account?{' '}
//               <Link to="/login" className="text-sage font-medium hover:underline">
//                 Login
//               </Link>
//             </p>
//           </motion.div>

//           {/* Back to Home */}
//           <motion.div variants={itemVariants} className="text-center mt-6">
//             <Link
//               to="/"
//               className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//             >
//               ← Back to Home
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;


// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, type Variants } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi';
// import { useAuth } from '../../hooks/useAuth';
// import { signup } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';

// /* ================== ANIMATIONS ================== */
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 24, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const containerVariants: Variants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.06,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 14 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
//   },
// };
// /* ================================================ */

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isLoading, dispatch } = useAuth();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.password) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     try {
//       await dispatch(
//         signup({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone || undefined,
//         })
//       ).unwrap();
//       toast.success('Account created successfully!');
//       navigate('/');
//     } catch (err: any) {
//       toast.error(err || 'Signup failed');
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
//       <motion.div
//         variants={cardVariants}
//         initial="hidden"
//         animate="show"
//         className="w-full max-w-[360px]"
//       >
//         <div className="glass-card rounded-xl p-6">
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-4">
//             <Link to="/">
//               <h1 className="text-2xl font-serif gradient-text mb-1">
//                 STYLISTE
//               </h1>
//             </Link>
//             <p className="text-sm text-muted-foreground">
//               Create your account and start shopping
//             </p>
//           </motion.div>

//           {/* Form */}
//           <motion.form
//             onSubmit={handleSubmit}
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="space-y-3"
//           >
//             {/* Full Name */}
//             <motion.div variants={itemVariants}>
//               <label className="text-sm font-medium mb-1 block">
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="John Doe"
//                   className="input-field pl-9"
//                   required
//                 />
//                 <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </motion.div>

//             {/* Email + Phone */}
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-3"
//             >
//               <div>
//                 <label className="text-sm font-medium mb-1 block">
//                   Email *
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="your@email.com"
//                     className="input-field pl-9"
//                     required
//                   />
//                   <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium mb-1 block">
//                   Phone
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="+1 (555) 000-0000"
//                     className="input-field pl-9"
//                   />
//                   <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>
//             </motion.div>

//             {/* Password + Confirm */}
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-3"
//             >
//               <div>
//                 <label className="text-sm font-medium mb-1 block">
//                   Password *
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="input-field pl-9"
//                     required
//                     minLength={6}
//                   />
//                   <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium mb-1 block">
//                   Confirm *
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className="input-field pl-9"
//                     required
//                   />
//                   <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>
//             </motion.div>

//             {/* Terms */}
//             <motion.label
//               variants={itemVariants}
//               className="flex items-start gap-2 text-xs"
//             >
//               <input type="checkbox" className="accent-primary mt-1" required />
//               <span className="text-muted-foreground">
//                 I agree to the{' '}
//                 <a href="#" className="text-sage hover:underline">
//                   Terms
//                 </a>{' '}
//                 &{' '}
//                 <a href="#" className="text-sage hover:underline">
//                   Privacy Policy
//                 </a>
//               </span>
//             </motion.label>

//             {/* Submit */}
//             <motion.button
//               variants={itemVariants}
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="w-full btn-primary mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
//             >
//               <span>{isLoading ? 'Creating...' : 'Sign Up'}</span>
//               {!isLoading && <FiArrowRight />}
//             </motion.button>
//           </motion.form>

//           {/* Footer */}
//           <motion.div variants={itemVariants} className="text-center mt-4 text-sm">
//             <p className="text-muted-foreground">
//               Already have an account?{' '}
//               <Link to="/login" className="text-sage font-medium">
//                 Login
//               </Link>
//             </p>
//           </motion.div>

//           <motion.div variants={itemVariants} className="text-center mt-3">
//             <Link to="/" className="text-xs text-muted-foreground">
//               ← Back to Home
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;


// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, type Variants } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi';
// import { useAuth } from '../../hooks/useAuth';
// import { signup } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';
// import logo from '../../assets/logo.png';

// /* ================== ANIMATIONS ================== */
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 20, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const containerVariants: Variants = {
//   hidden: {},
//   show: {
//     transition: { staggerChildren: 0.06 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 12 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
//   },
// };
// /* ================================================ */
// const FullPageLoader = () => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="
//       fixed inset-0 z-50 
//       flex items-center justify-center
//       bg-sage/40 backdrop-blur-sm
//     "
//   >
//     {/* Floating Loader Card */}
//     <motion.div
//       initial={{ scale: 0.9, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.25, ease: 'easeOut' }}
//       className="
//         w-[220px] 
//         rounded-xl 
//         bg-white/90
//         shadow-xl
//         p-6 
//         flex flex-col items-center
//       "
//     >
//       {/* Spinner */}
//       <div className="h-10 w-10 rounded-full border-2 border-sage border-t-transparent animate-spin mb-4" />

//       {/* Text */}
//       <p className="text-sm font-medium text-slate">
//         Signing you in…
//       </p>
//     </motion.div>
//   </motion.div>
// );

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isLoading, dispatch } = useAuth();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   /* ================== VALIDATIONS ================== */
//   const isValidEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   // Any 10-digit phone number
//   const isValidPhone = (phone: string) =>
//     /^\d{10}$/.test(phone);

//   // Strong password:
//   // 8+ chars, uppercase, lowercase, number, symbol
//   const isValidPassword = (password: string) =>
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
//   /* ================================================ */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.password) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     if (!isValidEmail(formData.email)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     if (!isValidPassword(formData.password)) {
//       toast.error(
//         'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol'
//       );
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.phone && !isValidPhone(formData.phone)) {
//       toast.error('Phone number must be exactly 10 digits');
//       return;
//     }

//     try {
//       await dispatch(
//         signup({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone || undefined,
//         })
//       ).unwrap();
//       toast.success('Account created successfully!');
//       navigate('/');
//     } catch (err: any) {
//       toast.error(err || 'Signup failed');
//     }
//   };
// if (isLoading) {
//   return <FullPageLoader />;
// }
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
//       <motion.div
//         variants={cardVariants}
//         initial="hidden"
//         animate="show"
//         className="w-full max-w-[420px]"
//       >
//         <div className="glass-card rounded-xl p-6">
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-4">
//             <Link to="/" className="inline-flex items-center gap-4 mb-6">
//     {/* LOGO */}
//     <img
//       src={logo}
//       alt="Styliste Couturier Logo"
//       className="w-22 h-14 object-contain"
//     />
//   </Link>
//             <p className="text-sm text-muted-foreground">
//               Create your account and start shopping
//             </p>
//           </motion.div>

//           {/* Form */}
//           <motion.form
//             onSubmit={handleSubmit}
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="space-y-3"
//           >
//             {/* Full Name */}
//             <motion.div variants={itemVariants}>
//               {/* <label className="text-sm font-medium mb-1 block">Full Name *</label> */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter Full Name"
//                   className="input-field pl-8 py-2"
//                   required
//                 />
//                 <FiUser className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//               </div>
//             </motion.div>

//             {/* Email + Phone */}
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//             >
//               <div>
//                 {/* <label className="text-sm font-medium mb-1 block">Email *</label> */}
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter Email"
//                     className="input-field pl-8 py-2"
//                     required
//                   />
//                   <FiMail className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>

//               <div>
//                 {/* <label className="text-sm font-medium mb-1 block">Phone</label> */}
//                 <div className="relative">
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Enter Phone Number"
//                     className="input-field pl-8 py-2"
//                   />
//                   <FiPhone className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>
//             </motion.div>

//             {/* Password + Confirm */}
//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//             >
//               <div>
//                 {/* <label className="text-sm font-medium mb-1 block">Password *</label> */}
//                 <div className="relative">
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder='Enter password'
//                     className="input-field pl-8 py-2"
//                     required
//                   />
//                   <FiLock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>

//               <div>
//                 {/* <label className="text-sm font-medium mb-1 block">Confirm *</label> */}
//                 <div className="relative">
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     placeholder='Confirm password'
//                     className="input-field pl-8 py-2"
//                     required
//                   />
//                   <FiLock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 </div>
//               </div>
//             </motion.div>

//             {/* Terms */}
//             <motion.label
//   variants={itemVariants}
//   className="flex items-start gap-2 text-xs mb-2.5"
// >
//   <input type="checkbox" className="accent-primary mt-1" required />
//   <span className="text-muted-foreground">
//     I agree to the{' '}
//     <a href="#" className="text-sage hover:underline">Terms</a> &{' '}
//     <a href="#" className="text-sage hover:underline">Privacy Policy</a>
//   </span>
// </motion.label>

// <motion.button
//   variants={itemVariants}
//   type="submit"
//   disabled={isLoading}
//   whileHover={{ scale: 1.03 }}
//   whileTap={{ scale: 0.97 }}
//   className="w-full btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
// >
//   <span>{isLoading ? 'Creating...' : 'Sign Up'}</span>
//   {!isLoading && <FiArrowRight />}
// </motion.button>
//           </motion.form>

//           {/* Footer */}
//           <motion.div variants={itemVariants} className="text-center mt-4 text-sm">
//             <p className="text-muted-foreground">
//               Already have an account?{' '}
//               <Link to="/login" className="text-sage font-medium">Login</Link>
//             </p>
//           </motion.div>

//           <motion.div variants={itemVariants} className="text-center mt-3">
//             <Link to="/" className="text-xs text-muted-foreground">
//               ← Back to Home
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;


// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, type Variants } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
// import { useAuth } from '../../hooks/useAuth';
// import { signup } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';
// import logo from '../../assets/logo.png';

// /* ================== ANIMATIONS ================== */
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 20, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const containerVariants: Variants = {
//   hidden: {},
//   show: {
//     transition: { staggerChildren: 0.06 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 12 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
//   },
// };
// /* ================================================ */

// const FullPageLoader = () => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="
//       fixed inset-0 z-50 
//       flex items-center justify-center
//       bg-sage/40 backdrop-blur-sm
//     "
//   >
//     <motion.div
//       initial={{ scale: 0.9, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.25, ease: 'easeOut' }}
//       className="
//         w-[220px] 
//         rounded-xl 
//         bg-white/90
//         shadow-xl
//         p-6 
//         flex flex-col items-center
//       "
//     >
//       <div className="h-10 w-10 rounded-full border-2 border-sage border-t-transparent animate-spin mb-4" />
//       <p className="text-sm font-medium text-slate">Signing you up…</p>
//     </motion.div>
//   </motion.div>
// );

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isLoading, dispatch } = useAuth();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [touched, setTouched] = useState({
//     email: false,
//     phone: false,
//     password: false,
//     confirmPassword: false,
//     name: false,
//   });

//   /* ================== VALIDATION RULES ================== */
//   const validationRules = {
//     email: (value: string) => {
//       if (!value) return 'Email is required';
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
//       return '';
//     },
//     phone: (value: string) => {
//       if (value && !/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits';
//       return '';
//     },
//     password: (value: string) => {
//       if (!value) return 'Password is required';
//       if (value.length < 8) return 'At least 8 characters';
//       if (!/(?=.*[a-z])/.test(value)) return 'One lowercase letter';
//       if (!/(?=.*[A-Z])/.test(value)) return 'One uppercase letter';
//       if (!/(?=.*\d)/.test(value)) return 'One number';
//       if (!/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(value)) return 'One special character';
//       return '';
//     },
//     confirmPassword: (value: string, password: string) => {
//       if (!value) return 'Please confirm your password';
//       if (value !== password) return 'Passwords do not match';
//       return '';
//     },
//     name: (value: string) => {
//       if (!value) return 'Full name is required';
//       if (value.length < 2) return 'Name is too short';
//       return '';
//     },
//   };

//   /* ================== VALIDATION CHECKS ================== */
//   const validateField = (name: keyof typeof formData, value: string) => {
//     switch (name) {
//       case 'email':
//         return validationRules.email(value);
//       case 'phone':
//         return validationRules.phone(value);
//       case 'password':
//         return validationRules.password(value);
//       case 'confirmPassword':
//         return validationRules.confirmPassword(value, formData.password);
//       case 'name':
//         return validationRules.name(value);
//       default:
//         return '';
//     }
//   };

//   /* ================== PHONE NUMBER INPUT HANDLER ================== */
//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
    
//     // Allow only numbers
//     const numericValue = value.replace(/\D/g, '');
    
//     // Limit to 10 digits
//     const limitedValue = numericValue.slice(0, 10);
    
//     setFormData(prev => ({ ...prev, phone: limitedValue }));
    
//     // Validate on change if field has been touched
//     if (touched.phone) {
//       const error = validateField('phone', limitedValue);
//       setErrors(prev => ({ ...prev, phone: error }));
//     }
//   };

//   /* ================== OTHER INPUT HANDLERS ================== */
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
    
//     if (name === 'phone') {
//       handlePhoneChange(e);
//       return;
//     }
    
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Validate on change if field has been touched
//     if (touched[name as keyof typeof touched]) {
//       const error = validateField(name as keyof typeof formData, value);
//       setErrors(prev => ({ ...prev, [name]: error }));
//     }
//   };

//   const handleBlur = (field: keyof typeof touched) => {
//     setTouched(prev => ({ ...prev, [field]: true }));
//     const error = validateField(field, formData[field]);
//     setErrors(prev => ({ ...prev, [field]: error }));
//   };

//   /* ================== PASSWORD STRENGTH CHECKER ================== */
//   const getPasswordStrength = (password: string) => {
//     let score = 0;
//     if (password.length >= 8) score++;
//     if (/(?=.*[a-z])/.test(password)) score++;
//     if (/(?=.*[A-Z])/.test(password)) score++;
//     if (/(?=.*\d)/.test(password)) score++;
//     if (/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) score++;
    
//     return {
//       score,
//       percentage: (score / 5) * 100,
//       label: score <= 2 ? 'Weak' : score <= 4 ? 'Good' : 'Strong',
//       color: score <= 2 ? 'bg-red-500' : score <= 4 ? 'bg-yellow-500' : 'bg-green-500',
//     };
//   };

//   /* ================== FORM SUBMISSION ================== */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Mark all fields as touched
//     const allTouched = Object.keys(touched).reduce((acc, key) => ({
//       ...acc,
//       [key]: true
//     }), {} as typeof touched);
//     setTouched(allTouched);
    
//     // Validate all fields
//     const newErrors = {
//       name: validationRules.name(formData.name),
//       email: validationRules.email(formData.email),
//       password: validationRules.password(formData.password),
//       confirmPassword: validationRules.confirmPassword(formData.confirmPassword, formData.password),
//       phone: validationRules.phone(formData.phone),
//     };
    
//     setErrors(newErrors);
    
//     // Check if there are any errors
//     const hasErrors = Object.values(newErrors).some(error => error !== '');
//     if (hasErrors) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }
    
//     try {
//       await dispatch(
//         signup({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           phone: formData.phone || undefined,
//         })
//       ).unwrap();
//       toast.success('Account created successfully!');
//       navigate('/');
//     } catch (err: any) {
//       toast.error(err?.message || 'Signup failed');
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated, navigate]);

//   if (isLoading) {
//     return <FullPageLoader />;
//   }

//   const passwordStrength = getPasswordStrength(formData.password);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
//       <motion.div
//         variants={cardVariants}
//         initial="hidden"
//         animate="show"
//         className="w-full max-w-[440px]"
//       >
//         <div className="glass-card rounded-xl p-6">
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-4">
//             <Link to="/" className="inline-flex items-center gap-4 mb-6">
//               <img
//                 src={logo}
//                 alt="Styliste Couturier Logo"
//                 className="w-22 h-14 object-contain"
//               />
//             </Link>
//             <p className="text-sm text-muted-foreground">
//               Create your account and start shopping
//             </p>
//           </motion.div>

//           {/* Form */}
//           <motion.form
//             onSubmit={handleSubmit}
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="space-y-4"
//           >
//             {/* Full Name */}
//             <motion.div variants={itemVariants}>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   onBlur={() => handleBlur('name')}
//                   placeholder="Enter Full Name *"
//                   className={`input-field pl-8 py-2 pr-8 ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
//                   required
//                 />
//                 <FiUser className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 {touched.name && (
//                   <div className="absolute right-2 top-1/2 -translate-y-1/2">
//                     {errors.name ? (
//                       <FiX className="text-red-500" size={16} />
//                     ) : (
//                       <FiCheck className="text-green-500" size={16} />
//                     )}
//                   </div>
//                 )}
//               </div>
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                   <FiX size={12} /> {errors.name}
//                 </p>
//               )}
//             </motion.div>

//             {/* Email + Phone */}
//             <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Email */}
//               <div>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     onBlur={() => handleBlur('email')}
//                     placeholder="Enter Email *"
//                     className={`input-field pl-8 py-2 pr-8 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
//                     required
//                   />
//                   <FiMail className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                   {touched.email && (
//                     <div className="absolute right-2 top-1/2 -translate-y-1/2">
//                       {errors.email ? (
//                         <FiX className="text-red-500" size={16} />
//                       ) : (
//                         <FiCheck className="text-green-500" size={16} />
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                     <FiX size={12} /> {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Phone - Updated with number-only input */}
//               <div>
//                 <div className="relative">
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handlePhoneChange}
//                     onBlur={() => handleBlur('phone')}
//                     placeholder="Phone Number (10 digits)"
//                     className={`input-field pl-8 py-2 pr-8 ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                   />
//                   <FiPhone className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                   {touched.phone && formData.phone && (
//                     <div className="absolute right-2 top-1/2 -translate-y-1/2">
//                       {errors.phone ? (
//                         <FiX className="text-red-500" size={16} />
//                       ) : formData.phone.length === 10 ? (
//                         <FiCheck className="text-green-500" size={16} />
//                       ) : null}
//                     </div>
//                   )}
//                 </div>
//                 {errors.phone ? (
//                   <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                     <FiX size={12} /> {errors.phone}
//                   </p>
//                 ) : formData.phone && formData.phone.length < 10 ? (
//                   <p className="text-yellow-500 text-xs mt-1 flex items-center gap-1">
//                     <span>Enter {10 - formData.phone.length} more digit(s)</span>
//                   </p>
//                 ) : formData.phone && formData.phone.length === 10 ? (
//                   <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
//                     <FiCheck size={12} /> Valid phone number
//                   </p>
//                 ) : null}
                
//                 {/* Phone input helper text */}
//                 {/* {!formData.phone && (
//                   <p className="text-gray-400 text-xs mt-1">
//                     Enter 10-digit number only
//                   </p>
//                 )} */}
//               </div>
//             </motion.div>

//             {/* Password */}
//             <motion.div variants={itemVariants}>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   onBlur={() => handleBlur('password')}
//                   placeholder="Enter Password *"
//                   className={`input-field pl-8 py-2 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
//                   required
//                 />
//                 <FiLock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>
              
//               {/* Password Strength Indicator */}
//               {formData.password && (
//                 <div className="mt-2 space-y-1">
//                   <div className="flex justify-between text-xs">
//                     <span className="text-muted-foreground">Password strength:</span>
//                     <span className={`font-medium ${
//                       passwordStrength.score <= 2 ? 'text-red-500' : 
//                       passwordStrength.score <= 4 ? 'text-yellow-500' : 'text-green-500'
//                     }`}>
//                       {passwordStrength.label}
//                     </span>
//                   </div>
//                   <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className={`h-full ${passwordStrength.color} transition-all duration-300`}
//                       style={{ width: `${passwordStrength.percentage}%` }}
//                     />
//                   </div>
                  
//                   {/* Password Requirements */}
//                   <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mt-2">
//                     <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-500' : ''}`}>
//                       {formData.password.length >= 8 ? <FiCheck size={12} /> : <FiX size={12} />}
//                       <span>8+ characters</span>
//                     </div>
//                     <div className={`flex items-center gap-1 ${/(?=.*[a-z])/.test(formData.password) ? 'text-green-500' : ''}`}>
//                       {/(?=.*[a-z])/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
//                       <span>Lowercase letter</span>
//                     </div>
//                     <div className={`flex items-center gap-1 ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-500' : ''}`}>
//                       {/(?=.*[A-Z])/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
//                       <span>Uppercase letter</span>
//                     </div>
//                     <div className={`flex items-center gap-1 ${/(?=.*\d)/.test(formData.password) ? 'text-green-500' : ''}`}>
//                       {/(?=.*\d)/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
//                       <span>Number</span>
//                     </div>
//                     <div className={`flex items-center gap-1 ${/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password) ? 'text-green-500' : ''}`}>
//                       {/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
//                       <span>Special character</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                   <FiX size={12} /> {errors.password}
//                 </p>
//               )}
//             </motion.div>

//             {/* Confirm Password */}
//             <motion.div variants={itemVariants}>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   onBlur={() => handleBlur('confirmPassword')}
//                   placeholder="Confirm Password *"
//                   className={`input-field pl-8 py-2 pr-10 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
//                   required
//                 />
//                 <FiLock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                   <FiX size={12} /> {errors.confirmPassword}
//                 </p>
//               )}
//               {formData.confirmPassword && !errors.confirmPassword && (
//                 <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
//                   <FiCheck size={12} /> Passwords match
//                 </p>
//               )}
//             </motion.div>

//             {/* Terms */}
//             <motion.label
//               variants={itemVariants}
//               className="flex items-start gap-2 text-xs mb-2.5"
//             >
//               <input type="checkbox" className="accent-primary mt-1" required />
//               <span className="text-muted-foreground">
//                 I agree to the{' '}
//                 <a href="#" className="text-sage hover:underline">Terms</a> &{' '}
//                 <a href="#" className="text-sage hover:underline">Privacy Policy</a>
//               </span>
//             </motion.label>

//             {/* Submit Button */}
//             <motion.button
//               variants={itemVariants}
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="w-full btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
//             >
//               <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
//               {!isLoading && <FiArrowRight />}
//             </motion.button>
//           </motion.form>

//           {/* Footer */}
//           <motion.div variants={itemVariants} className="text-center mt-4 text-sm">
//             <p className="text-muted-foreground">
//               Already have an account?{' '}
//               <Link to="/login" className="text-sage font-medium hover:underline">
//                 Login
//               </Link>
//             </p>
//           </motion.div>

//           <motion.div variants={itemVariants} className="text-center mt-3">
//             <Link to="/" className="text-xs text-muted-foreground hover:underline">
//               ← Back to Home
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { signup } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';

/* ================== ANIMATIONS ================== */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};
/* ================================================ */

const FullPageLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="
      fixed inset-0 z-50 
      flex items-center justify-center
      bg-sage/40 backdrop-blur-sm
    "
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="
        w-[220px] 
        rounded-xl 
        bg-white/90
        shadow-xl
        p-6 
        flex flex-col items-center
      "
    >
      <div className="h-10 w-10 rounded-full border-2 border-sage border-t-transparent animate-spin mb-4" />
      <p className="text-sm font-medium text-slate">Signing you up…</p>
    </motion.div>
  </motion.div>
);

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useAuth(); // Removed isAuthenticated

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    name: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false); // Added local submitting state

  /* ================== VALIDATION RULES ================== */
  const validationRules = {
    email: (value: string) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
      return '';
    },
    phone: (value: string) => {
      if (value && !/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits';
      return '';
    },
    password: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'At least 8 characters';
      if (!/(?=.*[a-z])/.test(value)) return 'One lowercase letter';
      if (!/(?=.*[A-Z])/.test(value)) return 'One uppercase letter';
      if (!/(?=.*\d)/.test(value)) return 'One number';
      if (!/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(value)) return 'One special character';
      return '';
    },
    confirmPassword: (value: string, password: string) => {
      if (!value) return 'Please confirm your password';
      if (value !== password) return 'Passwords do not match';
      return '';
    },
    name: (value: string) => {
      if (!value) return 'Full name is required';
      if (value.length < 2) return 'Name is too short';
      return '';
    },
  };

  /* ================== VALIDATION CHECKS ================== */
  const validateField = (name: keyof typeof formData, value: string) => {
    switch (name) {
      case 'email':
        return validationRules.email(value);
      case 'phone':
        return validationRules.phone(value);
      case 'password':
        return validationRules.password(value);
      case 'confirmPassword':
        return validationRules.confirmPassword(value, formData.password);
      case 'name':
        return validationRules.name(value);
      default:
        return '';
    }
  };

  /* ================== PHONE NUMBER INPUT HANDLER ================== */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers
    const numericValue = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedValue = numericValue.slice(0, 10);
    
    setFormData(prev => ({ ...prev, phone: limitedValue }));
    
    // Validate on change if field has been touched
    if (touched.phone) {
      const error = validateField('phone', limitedValue);
      setErrors(prev => ({ ...prev, phone: error }));
    }
  };

  /* ================== OTHER INPUT HANDLERS ================== */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      handlePhoneChange(e);
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name as keyof typeof formData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  /* ================== PASSWORD STRENGTH CHECKER ================== */
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[a-z])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    if (/(?=.*\d)/.test(password)) score++;
    if (/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) score++;
    
    return {
      score,
      percentage: (score / 5) * 100,
      label: score <= 2 ? 'Weak' : score <= 4 ? 'Good' : 'Strong',
      color: score <= 2 ? 'bg-red-500' : score <= 4 ? 'bg-yellow-500' : 'bg-green-500',
    };
  };

  /* ================== FORM SUBMISSION ================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(touched).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {} as typeof touched);
    setTouched(allTouched);
    
    // Validate all fields
    const newErrors = {
      name: validationRules.name(formData.name),
      email: validationRules.email(formData.email),
      password: validationRules.password(formData.password),
      confirmPassword: validationRules.confirmPassword(formData.confirmPassword, formData.password),
      phone: validationRules.phone(formData.phone),
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true); // Set local submitting state
    
    try {
      await dispatch(
        signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
        })
      ).unwrap();
      toast.success('Account created successfully!');
      navigate('/'); // Navigate immediately after successful signup
    } catch (err: any) {
      toast.error(err?.message || 'Signup failed');
      setIsSubmitting(false); // Reset on error
    }
  };

  // Show loader if either global loading OR local submitting
  if (isLoading || isSubmitting) {
    return <FullPageLoader />;
  }

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[440px]"
      >
        <div className="glass-card rounded-xl p-6">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-4">
            <Link to="/" className="inline-flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt="Styliste Couturier Logo"
                className="w-22 h-14 object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Create your account and start shopping
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter Full Name *"
                  className={`input-field pl-8 py-2 pr-8 ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                />
                <FiUser className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                {touched.name && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {errors.name ? (
                      <FiX className="text-red-500" size={16} />
                    ) : (
                      <FiCheck className="text-green-500" size={16} />
                    )}
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiX size={12} /> {errors.name}
                </p>
              )}
            </motion.div>

            {/* Email + Phone */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="Enter Email *"
                    className={`input-field pl-8 py-2 pr-8 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                    required
                  />
                  <FiMail className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  {touched.email && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      {errors.email ? (
                        <FiX className="text-red-500" size={16} />
                      ) : (
                        <FiCheck className="text-green-500" size={16} />
                      )}
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FiX size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone - Updated with number-only input */}
              <div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phone')}
                    placeholder="Phone Number (10 digits)"
                    className={`input-field pl-8 py-2 pr-8 ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <FiPhone className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  {touched.phone && formData.phone && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      {errors.phone ? (
                        <FiX className="text-red-500" size={16} />
                      ) : formData.phone.length === 10 ? (
                        <FiCheck className="text-green-500" size={16} />
                      ) : null}
                    </div>
                  )}
                </div>
                {errors.phone ? (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <FiX size={12} /> {errors.phone}
                  </p>
                ) : formData.phone && formData.phone.length < 10 ? (
                  <p className="text-yellow-500 text-xs mt-1 flex items-center gap-1">
                    <span>Enter {10 - formData.phone.length} more digit(s)</span>
                  </p>
                ) : formData.phone && formData.phone.length === 10 ? (
                  <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                    <FiCheck size={12} /> Valid phone number
                  </p>
                ) : null}
                
                {/* Phone input helper text */}
                {/* {!formData.phone && (
                  <p className="text-gray-400 text-xs mt-1">
                    Enter 10-digit number only
                  </p>
                )} */}
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter Password *"
                  className={`input-field pl-8 py-2 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                />
                <FiLock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Password strength:</span>
                    <span className={`font-medium ${
                      passwordStrength.score <= 2 ? 'text-red-500' : 
                      passwordStrength.score <= 4 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.percentage}%` }}
                    />
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mt-2">
                    <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-500' : ''}`}>
                      {formData.password.length >= 8 ? <FiCheck size={12} /> : <FiX size={12} />}
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center gap-1 ${/(?=.*[a-z])/.test(formData.password) ? 'text-green-500' : ''}`}>
                      {/(?=.*[a-z])/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
                      <span>Lowercase letter</span>
                    </div>
                    <div className={`flex items-center gap-1 ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-500' : ''}`}>
                      {/(?=.*[A-Z])/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
                      <span>Uppercase letter</span>
                    </div>
                    <div className={`flex items-center gap-1 ${/(?=.*\d)/.test(formData.password) ? 'text-green-500' : ''}`}>
                      {/(?=.*\d)/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
                      <span>Number</span>
                    </div>
                    <div className={`flex items-center gap-1 ${/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password) ? 'text-green-500' : ''}`}>
                      {/(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password) ? <FiCheck size={12} /> : <FiX size={12} />}
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiX size={12} /> {errors.password}
                </p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="Confirm Password *"
                  className={`input-field pl-8 py-2 pr-10 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                />
                <FiLock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiX size={12} /> {errors.confirmPassword}
                </p>
              )}
              {formData.confirmPassword && !errors.confirmPassword && (
                <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  <FiCheck size={12} /> Passwords match
                </p>
              )}
            </motion.div>

            {/* Terms */}
            <motion.label
              variants={itemVariants}
              className="flex items-start gap-2 text-xs mb-2.5"
            >
              <input type="checkbox" className="accent-primary mt-1" required />
              <span className="text-muted-foreground">
                I agree to the{' '}
                <a href="#" className="text-sage hover:underline">Terms</a> &{' '}
                <a href="#" className="text-sage hover:underline">Privacy Policy</a>
              </span>
            </motion.label>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading || isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Sign Up'}</span>
              {!isSubmitting && <FiArrowRight />}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center mt-4 text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-sage font-medium hover:underline">
                Login
              </Link>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-3">
            <Link to="/" className="text-xs text-muted-foreground hover:underline">
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;