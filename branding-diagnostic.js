// Diagnostic script to check branding in localStorage
// Run this in browser console to see what's stored

console.log("=== BRANDING DIAGNOSTIC ===");

const brandingData = localStorage.getItem("websiteBranding");

if (!brandingData) {
    console.error("❌ No branding data found in localStorage!");
} else {
    console.log("✅ Branding data found in localStorage");
    try {
        const parsed = JSON.parse(brandingData);
        console.log("📦 Parsed branding data:", parsed);
        console.log("🖼️ Logo:", parsed.logo ? `${parsed.logo.substring(0, 50)}...` : "NOT SET");
        console.log("🎨 Site Icon:", parsed.siteIcon ? `${parsed.siteIcon.substring(0, 50)}...` : "NOT SET");
        console.log("📏 Logo Width:", parsed.logoWidth);
        console.log("👁️ Show Site Name:", parsed.showSiteName);
        console.log("📝 Site Name:", parsed.siteName);
    } catch (e) {
        console.error("❌ Failed to parse branding data:", e);
    }
}

console.log("=== END DIAGNOSTIC ===");
