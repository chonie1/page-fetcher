const url = process.argv[2];
const filepath = process.argv[3];
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const write = () => {
  request(url, (error, response, body) => {
    if (response.statusCode != 200) {
      return console.log(error);
    }
    fs.writeFile(filepath, body, (err) => {
      if (err) throw err;
      
      const {size} = fs.statSync(filepath);
      console.log(`Downloaded and saved ${size} bytes to ${filepath}`);
    });
  });
};

if (!url || !filepath) {
  return console.log('Missing valid URL or file path');
}

if (fs.existsSync(filepath)) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Press the "y" key and then enter if you wish to overwrite the file otherwise press any other key ', (answer) => {
    if (answer !== 'y') {
      rl.close();
      return;
    } else {
      write();
    }
    rl.close();
  });
} else {
  write();
}









