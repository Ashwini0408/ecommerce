// import { Link } from "react-router-dom";
// import { Instagram, Facebook, Twitter } from "lucide-react";

// const footerLinks = {
//   shop: [
//     { name: "Women", href: "/shop?category=women" },
//     { name: "Men", href: "/shop?category=men" },
//     { name: "Accessories", href: "/shop?category=accessories" },
//     { name: "New Arrivals", href: "/shop?filter=new" },
//     { name: "Sale", href: "/shop?filter=sale" },
//   ],
//   company: [
//     { name: "About Us", href: "/about" },
//     { name: "Careers", href: "/careers" },
//     { name: "Press", href: "/press" },
//     { name: "Sustainability", href: "/sustainability" },
//   ],
//   support: [
//     { name: "Contact Us", href: "/contact" },
//     { name: "Shipping", href: "/shipping" },
//     { name: "Returns", href: "/returns" },
//     { name: "Size Guide", href: "/size-guide" },
//     { name: "Book Appointment", href: "/appointment" },
//   ],
// };

// export const Footer = () => {
//   return (
//     <footer className="bg-card border-t border-border">
//       <div className="container mx-auto px-6 py-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <Link to="/" className="inline-block">
//               <h2 className="font-serif text-4xl tracking-[0.2em] mb-6">STYLISTE</h2>
//             </Link>
//             <p className="text-muted-foreground max-w-sm mb-8 text-sm leading-relaxed">
//               Curated luxury fashion for the modern individual. Where timeless elegance meets contemporary design.
//             </p>
//             <div className="flex items-center gap-2">
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 border border-border hover:border-sage hover:text-sage transition-all"
//                 aria-label="Instagram"
//               >
//                 <Instagram className="w-4 h-4" strokeWidth={1.5} />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 border border-border hover:border-sage hover:text-sage transition-all"
//                 aria-label="Facebook"
//               >
//                 <Facebook className="w-4 h-4" strokeWidth={1.5} />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 border border-border hover:border-sage hover:text-sage transition-all"
//                 aria-label="Twitter"
//               >
//                 <Twitter className="w-4 h-4" strokeWidth={1.5} />
//               </a>
//             </div>
//           </div>

//           {/* Links */}
//           <div>
//             <h3 className="font-serif text-xl mb-6 tracking-wide">Shop</h3>
//             <ul className="space-y-4">
//               {footerLinks.shop.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.href}
//                     className="text-muted-foreground hover:text-sage transition-colors text-sm tracking-wide"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-serif text-xl mb-6 tracking-wide">Company</h3>
//             <ul className="space-y-4">
//               {footerLinks.company.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.href}
//                     className="text-muted-foreground hover:text-sage transition-colors text-sm tracking-wide"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-serif text-xl mb-6 tracking-wide">Support</h3>
//             <ul className="space-y-4">
//               {footerLinks.support.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     to={link.href}
//                     className="text-muted-foreground hover:text-sage transition-colors text-sm tracking-wide"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-muted-foreground text-xs tracking-wider">
//             © {new Date().getFullYear()} STYLISTE. All rights reserved.
//           </p>
//           <div className="flex items-center gap-8">
//             <Link
//               to="/privacy"
//               className="text-muted-foreground hover:text-foreground transition-colors text-xs tracking-wider"
//             >
//               Privacy Policy
//             </Link>
//             <Link
//               to="/terms"
//               className="text-muted-foreground hover:text-foreground transition-colors text-xs tracking-wider"
//             >
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };



import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "Women", href: "/shop?category=women" },
    { name: "Men", href: "/shop?category=men" },
    { name: "Accessories", href: "/shop?category=accessories" },
    { name: "New Arrivals", href: "/shop?filter=new" },
    { name: "Sale", href: "/shop?filter=sale" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Sustainability", href: "/sustainability" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Size Guide", href: "/sizeGuide" },
    { name: "Book Appointment", href: "/appointment" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-border text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <h2 className="font-serif text-4xl tracking-[0.2em] mb-6 text-sage">
                STYLISTE
              </h2>
            </Link>

            <p className="text-white/80 max-w-sm mb-8 text-sm leading-relaxed">
              Curated luxury fashion for the modern individual. Where timeless elegance meets contemporary design.
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border hover:border-sage hover:text-sage transition-all"
              >
                <Instagram className="w-4 h-4 text-white" strokeWidth={1.5} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border hover:border-sage hover:text-sage transition-all"
              >
                <Facebook className="w-4 h-4 text-white" strokeWidth={1.5} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border hover:border-sage hover:text-sage transition-all"
              >
                <Twitter className="w-4 h-4 text-white" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-xl mb-6 tracking-wide text-sage">Shop</h3>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white hover:text-sage transition-colors text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 tracking-wide text-sage">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white hover:text-sage transition-colors text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 tracking-wide text-sage">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white hover:text-sage transition-colors text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-xs tracking-wider">
            © {new Date().getFullYear()} STYLISTE. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <Link
              to="/privacy"
              className="text-white hover:text-sage transition-colors text-xs tracking-wider"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-white hover:text-sage transition-colors text-xs tracking-wider"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
