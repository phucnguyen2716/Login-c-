import { Link } from "react-router-dom";

import { socialLinks } from "../constants/contact";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-blue-300 to-white text-white py-4 font-poppins">
  <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
    <p className="text-sm">
      © 2023 <strong>Adrian Hajdin</strong>. All rights reserved.
    </p>
    <div className="flex gap-3 items-center">
      {socialLinks.map((link) => (
        <a key={link.name} href={link.link} target="_blank" rel="noopener noreferrer">
          <img
            src={link.iconUrl}
            alt={link.name}
            className="w-6 h-6 object-contain hover:opacity-80 transition"
          />
        </a>
      ))}
    </div>
  </div>
</footer>

  );
};

export default Footer;
