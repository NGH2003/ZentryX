import { Link } from "react-router-dom";
import { useBranding } from "@/contexts/BrandingContext";

const Footer = () => {
  const { branding } = useBranding();
  const firstLetter = (branding.siteName || "ToolBox").charAt(0).toUpperCase();

  // Use footer logo if available, otherwise use main logo
  const displayLogo = branding.footerLogo || branding.logo;
  const logoWidth = branding.footerLogo ? branding.footerLogoWidth : branding.logoWidth;

  return (
    <footer
      className="text-white py-12 px-4"
      style={{
        background: `linear-gradient(to right, ${branding.footerBgColor1 || '#111827'}, ${branding.footerBgColor2 || '#111827'})`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {displayLogo ? (
                <img
                  src={displayLogo}
                  alt={`${branding.siteName} logo`}
                  style={{ width: `${logoWidth}px` }}
                  className="h-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{firstLetter}</span>
                  </div>
                  <h3 className="text-xl font-bold">{branding.siteName || "ToolBox"}</h3>
                </>
              )}
            </div>
            <p className="text-gray-400">
              {branding.footerText || branding.tagline || "The ultimate collection of digital tools for developers, designers, and creators."}
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="font-semibold mb-4">{branding.footerLinks?.column1Title || "Tools"}</h4>
            <ul className="space-y-2 text-gray-400">
              {branding.footerLinks?.column1Links?.map((link, index) => (
                <li key={index}>
                  <Link to={link.url} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-4">{branding.footerLinks?.column2Title || "Company"}</h4>
            <ul className="space-y-2 text-gray-400">
              {branding.footerLinks?.column2Links?.map((link, index) => (
                <li key={index}>
                  <Link to={link.url} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-4">{branding.footerLinks?.column3Title || "Support"}</h4>
            <ul className="space-y-2 text-gray-400">
              {branding.footerLinks?.column3Links?.map((link, index) => (
                <li key={index}>
                  <Link to={link.url} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {branding.siteName || "ToolBox"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;