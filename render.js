import fs from "fs";
import ejs from "ejs";
import path from "path";
import open from "open";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Step 1: Get template from command line arg
const templateName = process.argv[2];
if (!templateName) {
  console.error("❌ Please provide the EJS template name as an argument.");
  process.exit(1);
}

// Step 2: Sample data (you can make this dynamic per template)
const sampleData = {
  userName: "John Doe",
  senderName: "Harry Krishna",
  link: "https://example.com/verify?token=abc123xyz",
  resetLink: "https://example.com/reset?token=xyz789abc",
  supportEmail: "support@assistanttech.com",
  supportPhone: "+977-9800000000",
  companyWebsite: "https://assistanttech.com",
  unsubscribeLink: "https://example.com/unsubscribe",
  playStoreLink: "https://play.google.com/store/apps/details?id=your.app.id",
  appStoreLink: "https://apps.apple.com/us/app/your-app-name/idYOURAPPID",
  companyAddress: "123 Main Street, Anytown, State, ZIP",
  currentYear: new Date().getFullYear(),
  startDate: "May 21, 2025",
  endDate: "June 21, 2025",
};

// Step 3: Render the EJS file
// Ensure your email templates are in 'views/'
const templatePath = path.join(__dirname, "views", `${templateName}.ejs`);

ejs.renderFile(templatePath, sampleData, {}, (err, html) => {
  if (err) {
    console.error("❌ Error rendering EJS:", err);
    return;
  }

  const outputPath = path.join(__dirname, "preview.html");
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Preview for "${templateName}" generated at preview.html`);

  open(outputPath);
});
