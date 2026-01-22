// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
// import { useAuth } from '../../hooks/useAuth';
// import { login } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';
// import {
//   containerVariants,
//   itemVariants,
//   cardVariants,
// } from '../../animations/authAnimations';


// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, isLoading, error, dispatch } = useAuth();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     try {
//       await dispatch(login(formData)).unwrap();
//       toast.success('Login successful!');
//       navigate('/');
//     } catch (err: any) {
//       toast.error(err || 'Login failed');
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

//       {/* Login Card */}
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
//             <p className="text-dark-400">Welcome back! Please login to your account</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email */}
//             <div>
//               <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                 Email Address
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

//             {/* Password */}
//             <div>
//               <label className="text-sm font-semibold text-dark-300 mb-2 block">
//                 Password
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
//                 />
//                 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
//               </div>
//             </div>

//             {/* Remember & Forgot */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="accent-primary-500"
//                 />
//                 <span className="text-dark-300">Remember me</span>
//               </label>
//               <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               type="submit"
//               disabled={isLoading}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
//             >
//               <span>{isLoading ? 'Logging in...' : 'Login'}</span>
//               {!isLoading && <FiArrowRight />}
//             </motion.button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <div className="flex-1 border-t border-white/10"></div>
//             <span className="px-4 text-sm text-dark-500">OR</span>
//             <div className="flex-1 border-t border-white/10"></div>
//           </div>

//           {/* Sign Up Link */}
//           <div className="text-center">
//             <p className="text-dark-400">
//               Don't have an account?{' '}
//               <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
//                 Sign Up
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

// export default LoginPage;



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { login } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

/* ================== ANIMATIONS (TS SAFE) ================== */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
/* ========================================================== */
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
    {/* Floating Loader Card */}
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
      {/* Spinner */}
      <div className="h-10 w-10 rounded-full border-2 border-sage border-t-transparent animate-spin mb-4" />

      {/* Text */}
      <p className="text-sm font-medium text-slate">
        Logging you in…
      </p>
    </motion.div>
  </motion.div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoading, dispatch } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await dispatch(login(formData)).unwrap();

      toast.success('Login successful!');

      if (res.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      toast.error(err || "Login failed");
    }

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
if (isLoading) {
  return <FullPageLoader />;
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      {/* Animated Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-sm"
      >
       <div className="glass-card rounded-xl p-6">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="text-center mb-4"
          >
            <Link to="/">
              <h1 className="text-2xl font-serif gradient-text mb-1">
                Styliste Couturier
              </h1>
            </Link>
            <p className="text-muted-foreground">
              Welcome back! Please login to your account
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {/* Email */}
            <motion.div variants={itemVariants}>
              {/* <label className="text-sm font-medium text-foreground mb-2 block">
                Email Address
              </label> */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field pl-10 focus:scale-[1.01]"
                  placeholder="Enter Email"
                  required
                />
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              {/* <label className="text-sm font-medium text-foreground mb-2 block">
                Password
              </label> */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pl-10 focus:scale-[1.01]"
                  placeholder="Enter Password"
                  required
                />
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
  variants={itemVariants}
  type="submit"
  disabled={isLoading}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
>

              <span>{isLoading ? 'Logging in...' : 'Login'}</span>
              {!isLoading && <FiArrowRight />}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="text-center mt-3"
          >
            <p className="text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="text-sage font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
          {/* Back to Home */}
<motion.div
  variants={itemVariants}
  initial="hidden"
  animate="show"
  className="text-center mt-3"
>
  <Link
    to="/"
    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    ← Back to Home
  </Link>
</motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
