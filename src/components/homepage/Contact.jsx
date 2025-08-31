// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, 
//   Send, User, MessageSquare, AlertCircle, CheckCircle 
// } from "lucide-react";

// const initialForm = { name: "", email: "", subject: "", message: "", honeypot: "" };
// const isValidEmail = (email) => typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { 
//     opacity: 1, 
//     y: 0, 
//     transition: { 
//       duration: 0.5, 
//       ease: "easeOut",
//       staggerChildren: 0.1
//     } 
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 10 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
// };

// export default function ContactPage() {
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [sending, setSending] = useState(false);
//   const [status, setStatus] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//     if (errors[name]) setErrors((s) => ({ ...s, [name]: null }));
//     if (status) setStatus(null);
//   };

//   const validate = () => {
//     const err = {};
//     if (!form.name.trim()) err.name = "Name is required";
//     if (!isValidEmail(form.email)) err.email = "Valid email is required";
//     if (!form.subject.trim()) err.subject = "Subject is required";
//     if (!form.message.trim() || form.message.trim().length < 15)
//       err.message = "Message must be at least 15 characters";
//     if (form.honeypot) err.honeypot = "Bot detected";
//     return err;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus(null);
//     const err = validate();
//     if (Object.keys(err).length) {
//       setErrors(err);
//       return;
//     }
//     setSending(true);
//     try {
//       // Simulate server call
//       await new Promise((res) => setTimeout(res, 1500));
//       setStatus({ 
//         type: "success", 
//         message: "Thanks! Your message has been sent — we'll reply soon." 
//       });
//       setForm(initialForm);
//     } catch (error) {
//       setStatus({
//         type: "error",
//         message: "Oops! Something went wrong. Please try again or contact us directly.",
//       });
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="max-w-7xl mx-auto mb-12 text-center"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
//           Get in Touch
//         </h1>
//         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
//           Have a question, feedback, or want a demo? Wed love to hear from you. 
//           Send us a message and well respond within 24 hours.
//         </p>
//       </motion.header>

//       {/* Main content grid */}
//       <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         {/* Form Section */}
//         <motion.section
//           variants={cardVariants}
//           initial="hidden"
//           animate="show"
//           className="lg:col-span-7 bg-white rounded-2xl shadow-xl p-6 sm:p-8"
//         >
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-slate-800">Send us a message</h2>
//             <p className="mt-2 text-slate-600">
//               Fill out the form below and well get back to you as soon as possible.
//             </p>
//           </div>
          
//           <form onSubmit={handleSubmit} noValidate className="space-y-6">
//             {/* Honeypot for bots */}
//             <input
//               type="text"
//               name="honeypot"
//               value={form.honeypot}
//               onChange={handleChange}
//               autoComplete="off"
//               tabIndex={-1}
//               className="hidden"
//               aria-hidden="true"
//             />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <motion.div variants={itemVariants} className="space-y-2">
//                 <label className="block text-sm font-medium text-slate-700">Name</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="Your full name"
//                     className={`pl-10 block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
//                       ${errors.name ? "border-red-500 ring-red-400" : "border-slate-300"}`}
//                     aria-invalid={!!errors.name}
//                     aria-describedby={errors.name ? "name-error" : undefined}
//                   />
//                 </div>
//                 {errors.name && (
//                   <p id="name-error" className="text-sm text-red-600 flex items-center mt-1">
//                     <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
//                   </p>
//                 )}
//               </motion.div>

//               <motion.div variants={itemVariants} className="space-y-2">
//                 <label className="block text-sm font-medium text-slate-700">Email</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="you@example.com"
//                     className={`pl-10 block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
//                       ${errors.email ? "border-red-500 ring-red-400" : "border-slate-300"}`}
//                     aria-invalid={!!errors.email}
//                     aria-describedby={errors.email ? "email-error" : undefined}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p id="email-error" className="text-sm text-red-600 flex items-center mt-1">
//                     <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
//                   </p>
//                 )}
//               </motion.div>
//             </div>

//             <motion.div variants={itemVariants} className="space-y-2">
//               <label className="block text-sm font-medium text-slate-700">Subject</label>
//               <input
//                 name="subject"
//                 value={form.subject}
//                 onChange={handleChange}
//                 placeholder="What is this regarding?"
//                 className={`block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
//                   ${errors.subject ? "border-red-500 ring-red-400" : "border-slate-300"}`}
//                 aria-invalid={!!errors.subject}
//                 aria-describedby={errors.subject ? "subject-error" : undefined}
//               />
//               {errors.subject && (
//                 <p id="subject-error" className="text-sm text-red-600 flex items-center mt-1">
//                   <AlertCircle className="h-4 w-4 mr-1" /> {errors.subject}
//                 </p>
//               )}
//             </motion.div>

//             <motion.div variants={itemVariants} className="space-y-2">
//               <label className="block text-sm font-medium text-slate-700">Message</label>
//               <div className="relative">
//                 <div className="absolute top-3 left-3 pointer-events-none">
//                   <MessageSquare className="h-5 w-5 text-slate-400" />
//                 </div>
//                 <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   rows={5}
//                   placeholder="Tell us how we can help you..."
//                   className={`pl-10 block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
//                     ${errors.message ? "border-red-500 ring-red-400" : "border-slate-300"}`}
//                   aria-invalid={!!errors.message}
//                   aria-describedby={errors.message ? "message-error" : undefined}
//                 />
//               </div>
//               {errors.message && (
//                 <p id="message-error" className="text-sm text-red-600 flex items-center mt-1">
//                   <AlertCircle className="h-4 w-4 mr-1" /> {errors.message}
//                 </p>
//               )}
//             </motion.div>

//             <motion.div variants={itemVariants} className="pt-4">
//               <button
//                 type="submit"
//                 disabled={sending}
//                 className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all
//                   ${sending 
//                     ? "bg-blue-400 cursor-not-allowed" 
//                     : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25"
//                   }`}
//                 aria-disabled={sending}
//               >
//                 {sending ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5" />
//                     Send Message
//                   </>
//                 )}
//               </button>

//               <AnimatePresence>
//                 {status && (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     role="status" 
//                     aria-live="polite" 
//                     className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-lg ${
//                       status.type === "success" 
//                         ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
//                         : "bg-rose-50 text-rose-700 border border-rose-200"
//                     }`}
//                   >
//                     {status.type === "success" ? (
//                       <CheckCircle className="h-5 w-5 flex-shrink-0" />
//                     ) : (
//                       <AlertCircle className="h-5 w-5 flex-shrink-0" />
//                     )}
//                     <span className="text-sm">{status.message}</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </form>
//         </motion.section>

//         {/* Info Card */}
//         <motion.aside
//           variants={cardVariants}
//           initial="hidden"
//           animate="show"
//           className="lg:col-span-5 space-y-8"
//         >
//           <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-xl">
//             <h3 className="text-2xl font-semibold mb-6">Contact information</h3>
//             <p className="text-slate-300 mb-8">
//               Prefer to reach out directly? Use any of these methods to get in touch with our team.
//             </p>

//             <ul className="space-y-6">
//               {[{
//                 icon: <MapPin className="w-6 h-6 text-blue-400" />,
//                 title: "Our Office",
//                 info: "Bhopal, Madhya Pradesh, India",
//                 bg: "bg-blue-500/10"
//               },{
//                 icon: <Phone className="w-6 h-6 text-emerald-400" />,
//                 title: "Phone",
//                 info: "+91 8435423244",
//                 bg: "bg-emerald-500/10"
//               },{
//                 icon: <Mail className="w-6 h-6 text-violet-400" />,
//                 title: "Email",
//                 info: "codenest17.com",
//                 bg: "bg-violet-500/10"
//               },{
//                 icon: <Clock className="w-6 h-6 text-slate-400" />,
//                 title: "Business Hours",
//                 info: "Mon–Fri • 9:00 AM – 6:00 PM IST",
//                 bg: "bg-slate-700/50"
//               }].map(({icon, title, info, bg}, index) => (
//                 <motion.li 
//                   key={title} 
//                   variants={itemVariants}
//                   className="flex items-start gap-4"
//                 >
//                   <div className={`${bg} p-3 rounded-lg flex-shrink-0 mt-1`}>
//                     {icon}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-white">{title}</h4>
//                     <p className="text-slate-300 mt-1">{info}</p>
//                   </div>
//                 </motion.li>
//               ))}
//             </ul>

//             {/* Socials */}
//             <div className="mt-10">
//               <h4 className="font-medium text-white mb-4">Follow us</h4>
//               <div className="flex space-x-3">
//                 {[{
//                   icon: <Facebook className="w-5 h-5" />,
//                   href: "#",
//                   label: "Facebook",
//                   bg: "hover:bg-blue-500"
//                 },{
//                   icon: <Twitter className="w-5 h-5" />,
//                   href: "#",
//                   label: "Twitter",
//                   bg: "hover:bg-sky-500"
//                 },{
//                   icon: <Linkedin className="w-5 h-5" />,
//                   href: "#",
//                   label: "LinkedIn",
//                   bg: "hover:bg-blue-700"
//                 }].map(({icon, href, label, bg}) => (
//                   <motion.a
//                     key={label}
//                     href={href}
//                     aria-label={label}
//                     className={`p-3 bg-slate-700/50 rounded-lg text-white transition-colors ${bg}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     {icon}
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Embedded Google Map */}
//           <motion.div 
//             variants={itemVariants}
//             className="rounded-2xl overflow-hidden shadow-xl border border-slate-200"
//           >
//             <iframe
//               title="Office Location"
//               width="100%"
//               height="280"
//               loading="lazy"
//               allowFullScreen
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117296.39401897606!2d77.30050039999999!3d23.1996663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710867157995!5m2!1sen!2sin"
//               className="w-full"
//               style={{ border: 0 }}
//             />
//           </motion.div>
//         </motion.aside>
//       </main>

//       {/* FAQ Section */}
//       <motion.section 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="max-w-7xl mx-auto mt-16"
//       >
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               {
//                 question: "How quickly do you respond to inquiries?",
//                 answer: "We typically respond to all inquiries within 24 hours during business days."
//               },
//               {
//                 question: "Do you offer custom solutions?",
//                 answer: "Yes, we specialize in creating tailored solutions to meet specific business needs."
//               },
//               {
//                 question: "What are your business hours?",
//                 answer: "Our team is available Monday through Friday from 9:00 AM to 6:00 PM IST."
//               },
//               {
//                 question: "Do you provide support after implementation?",
//                 answer: "Yes, we offer comprehensive support and maintenance packages for all our solutions."
//               }
//             ].map((faq, index) => (
//               <motion.div 
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + (index * 0.1) }}
//                 className="p-4 bg-slate-50 rounded-lg"
//               >
//                 <h3 className="font-medium text-slate-800">{faq.question}</h3>
//                 <p className="mt-2 text-slate-600 text-sm">{faq.answer}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   );
// }



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin,
  Send, User, MessageSquare, AlertCircle, CheckCircle
} from "lucide-react";

const initialForm = { name: "", email: "", subject: "", message: "", honeypot: "" };
const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((s) => ({ ...s, [name]: null }));
    if (status) setStatus(null);
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!isValidEmail(form.email)) err.email = "Valid email is required";
    if (!form.subject.trim()) err.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 15)
      err.message = "Message must be at least 15 characters";
    if (form.honeypot) err.honeypot = "Bot detected";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setSending(true);
    try {
      // Simulate server call
      await new Promise((res) => setTimeout(res, 1500));
      setStatus({
        type: "success",
        message: "Thanks! Your message has been sent — we’ll reply soon."
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Have a question, feedback, or want a demo? We’d love to hear from you.
          Send us a message and we’ll respond within 24 hours.
        </p>
      </motion.header>

      {/* Main content grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800">Send us a message</h2>
            <p className="mt-2 text-slate-600">
              Fill out the form below and we’ll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot for bots */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden="true"
            />

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`pl-10 block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
                      ${errors.name ? "border-red-500 ring-red-400" : "border-slate-300"}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-600 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
                  </p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`pl-10 block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
                      ${errors.email ? "border-red-500 ring-red-400" : "border-slate-300"}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                className={`block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
                  ${errors.subject ? "border-red-500 ring-red-400" : "border-slate-300"}`}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="text-sm text-red-600 flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" /> {errors.subject}
                </p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Message</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className={`pl-10 block w-full rounded-lg border px-4 py-3 text-slate-800 placeholder-slate-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
                    ${errors.message ? "border-red-500 ring-red-400" : "border-slate-300"}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
              </div>
              {errors.message && (
                <p id="message-error" className="text-sm text-red-600 flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" /> {errors.message}
                </p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div variants={itemVariants} className="pt-4">
              <button
                type="submit"
                disabled={sending}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all
                  ${sending
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25"
                  }`}
                aria-disabled={sending}
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status message */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-lg ${status.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </form>
        </motion.section>

        {/* Info Card */}
        <motion.aside
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 space-y-8"
        >
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">Contact information</h3>
            <p className="text-slate-300 mb-8">
              Prefer to reach out directly? Use any of these methods to get in touch with our team.
            </p>

            <ul className="space-y-6">
              {[{
                icon: <MapPin className="w-6 h-6 text-blue-400" />,
                title: "Our Office",
                info: "Bhopal, Madhya Pradesh, India",
                bg: "bg-blue-500/10"
              }, {
                icon: <Phone className="w-6 h-6 text-emerald-400" />,
                title: "Phone",
                info: "+91 8435423244",
                bg: "bg-emerald-500/10"
              }, {
                icon: <Mail className="w-6 h-6 text-violet-400" />,
                title: "Email",
                info: "contact@codenest17.com", // fixed
                bg: "bg-violet-500/10"
              }, {
                icon: <Clock className="w-6 h-6 text-slate-400" />,
                title: "Business Hours",
                info: "Mon–Fri • 9:00 AM – 6:00 PM IST",
                bg: "bg-slate-700/50"
              }].map(({ icon, title, info, bg }) => (
                <motion.li
                  key={title}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className={`${bg} p-3 rounded-lg flex-shrink-0 mt-1`}>
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{title}</h4>
                    <p className="text-slate-300 mt-1">{info}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Socials */}
            <div className="mt-10">
              <h4 className="font-medium text-white mb-4">Follow us</h4>
              <div className="flex space-x-3">
                {[{
                  icon: <Facebook className="w-5 h-5" />,
                  href: "#",
                  label: "Facebook",
                  bg: "hover:bg-blue-500"
                }, {
                  icon: <Twitter className="w-5 h-5" />,
                  href: "#",
                  label: "Twitter",
                  bg: "hover:bg-sky-500"
                }, {
                  icon: <Linkedin className="w-5 h-5" />,
                  href: "#",
                  label: "LinkedIn",
                  bg: "hover:bg-blue-700"
                }].map(({ icon, href, label, bg }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`p-3 bg-slate-700/50 rounded-lg text-white transition-colors ${bg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl overflow-hidden shadow-xl border border-slate-200"
          >
            <iframe
              title="Office Location Map"
              width="100%"
              height="280"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117296.39401897606!2d77.30050039999999!3d23.1996663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710867157995!5m2!1sen!2sin"
              className="w-full"
              style={{ border: 0 }}
            />
          </motion.div>
        </motion.aside>
      </main>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-7xl mx-auto mt-16"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
         <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             {
                question: "How quickly do you respond to inquiries?",
                answer: "We typically respond to all inquiries within 24 hours during business days."
            },
             {
                question: "Do you offer custom solutions?",
                answer: "Yes, we specialize in creating tailored solutions to meet specific business needs."
              },
              {
                question: "What are your business hours?",
                answer: "Our team is available Monday through Friday from 9:00 AM to 6:00 PM IST."
              },
              {
                question: "Do you provide support after implementation?",
                answer: "Yes, we offer comprehensive support and maintenance packages for all our solutions."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="p-4 bg-slate-50 rounded-lg"
              >
                <h3 className="font-medium text-slate-800">{faq.question}</h3>
                <p className="mt-2 text-slate-600 text-sm">{faq.answer}</p>
              </motion.div>
           ))}
          </div>
    </div>
  </motion.section>
    </div>
 );
 }