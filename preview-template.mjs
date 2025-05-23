import fs from "fs";
import ejs from "ejs";
import path from "path";
import open from "open";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Step 1: Get template from command line arg
const templateName = process.argv[2]; // e.g., "verify-email"
if (!templateName) {
  console.error("❌ Please provide the EJS template name as an argument.");
  process.exit(1);
}

// Step 2: Sample data (you can make this dynamic per template)
const sampleData = {
  userName: "John Doe",
  verificationLink: "https://example.com/verify?token=abc123xyz",
  resetLink: "https://example.com/reset?token=xyz789abc",
};

// Step 3: Render the EJS file
const templatePath = path.join(
  __dirname,
  "views",
  "emails",
  `${templateName}.ejs`,
);

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
