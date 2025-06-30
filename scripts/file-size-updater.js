// scripts/file-size-updater.js
// Utility script to update file sizes in the seed-tenders.js file
// This script reads the actual file sizes from the file system and updates the size property in the tenders array

const fs = require('fs');
const path = require('path');

// Path to the seed-tenders.js file
const seedFilePath = path.join(__dirname, 'seed-tenders.js');

// Function to get file size in bytes
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    console.error(`Error getting file size for ${filePath}:`, error.message);
    return 0;
  }
}

// Function to update file sizes in the seed file
async function updateFileSizes() {
  try {
    console.log('Reading seed file...');
    
    // Read the seed file
    let seedFileContent = fs.readFileSync(seedFilePath, 'utf8');
    
    // Parse the tenders array from the file content
    const tendersMatch = seedFileContent.match(/module\.exports\.tenders\s*=\s*\[([\s\S]*)\];/);
    
    if (!tendersMatch) {
      console.error('Could not find tenders array in seed file');
      return;
    }
    
    // Count of files updated
    let updatedCount = 0;
    let missingCount = 0;
    
    // Process each tender
    console.log('Processing tenders and updating file sizes...');
    
    // Regular expression to match document entries
    const docRegex = /{\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)",\s*size:\s*\d+,/g;
    
    // Replace each document entry with updated file size
    let updatedContent = seedFileContent.replace(docRegex, (match, name, filePath) => {
      const fullPath = path.join(process.cwd(), filePath);
      const fileSize = getFileSize(fullPath);
      
      if (fileSize > 0) {
        updatedCount++;
        return match.replace(/size:\s*\d+,/, `size: ${fileSize},`);
      } else {
        missingCount++;
        console.warn(`Warning: File not found or empty: ${filePath}`);
        return match;
      }
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(seedFilePath, updatedContent, 'utf8');
    
    console.log(`File size update completed!`);
    console.log(`Updated ${updatedCount} file sizes.`);
    
    if (missingCount > 0) {
      console.warn(`Warning: ${missingCount} files were not found or had errors.`);
    }
    
  } catch (error) {
    console.error('Error updating file sizes:', error);
  }
}

// Run the update function
updateFileSizes().then(() => {
  console.log('File size update process completed.');
});