import fs from "fs";
import mjml2html from "mjml";
import path from "path";
import open from "open";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Step 1: Get template from command line arg
const templateName = process.argv[2];
if (!templateName) {
  console.error("❌ Please provide the MJML template name as an argument.");
  process.exit(1);
}

// Step 2: Sample data
const sampleData = {
  userName: "John Doe",
  link: "https://example.com/verify?token=abc123xyz",
  supportEmail: "support@chatblix.com",
  supportPhone: "+977-9800000000",
  currentYear: new Date().getFullYear(),
};

// Step 3: Read MJML file
const templatePath = path.join(__dirname, "views", `${templateName}.mjml`);
let mjmlContent = fs.readFileSync(templatePath, "utf8");

// Step 4: Replace variables (simple EJS-style)
Object.entries(sampleData).forEach(([key, value]) => {
  const regex = new RegExp(`<%=\\s*${key}\\s*%>`, "g");
  mjmlContent = mjmlContent.replace(regex, value);
});

// Step 5: Convert MJML to HTML
const { html, errors } = mjml2html(mjmlContent, { minify: false });
if (errors.length) {
  console.error("MJML Errors:", errors);
}

// Step 6: Save and open
const outputPath = path.join(__dirname, "preview.html");
fs.writeFileSync(outputPath, html);
console.log(`✅ Preview for "${templateName}" generated at preview.html`);
open(outputPath);
