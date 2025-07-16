// import React, { useState } from "react";
// import logo from "../assets/logo.png";
// import profileImg from "../assets/profile_icon.png";

// const Navbar = () => {
//   const [menu, setMenu] = useState("Home");
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const handleSignOut = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
//       <img
//         src={logo}
//         alt="ICECD Logo"
//         className="h-16 w-auto object-contain"
//       />

//       <ul className="flex gap-8 text-[#49557e] text-lg max-md:hidden">
//         {["Home", "About-Us", "Courses", "Contact-us"].map((item) => (
//           <li
//             key={item}
//             onClick={() => setMenu(item)}
//             className={`${
//               menu === item ? "border-b-2 border-[#49557e]" : ""
//             } cursor-pointer transition`}
//           >
//             <a href={`#${item.toLowerCase()}`}>
//               {item.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
//             </a>
//           </li>
//         ))}
//       </ul>

//       <div className="relative group">
//         {isLoggedIn ? (
//           <>
//             <img
//               src={profileImg}
//               alt="Profile"
//               className="w-8 h-8 rounded-full cursor-pointer"
//             />
//             <ul className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 min-w-[150px]">
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                 <a href="/dashboard">Dashboard</a>
//               </li>
//               <li
//                 onClick={handleSignOut}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 Sign out
//               </li>
//             </ul>
//           </>
//         ) : (
//           <button className="bg-[#FF6347] text-white px-6 py-2 rounded-full hover:bg-[#ff7f50] transition">
//             Sign in
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
