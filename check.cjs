const fs = require('fs');
try {
  const stats = fs.statSync('public/videohere.mp4');
  console.log('Size in bytes:', stats.size);
  const buffer = Buffer.alloc(100);
  const fd = fs.openSync('public/videohere.mp4', 'r');
  fs.readSync(fd, buffer, 0, 100, 0);
  fs.closeSync(fd);
  console.log('First 100 bytes:', buffer.toString('utf8'));
} catch (e) {
  console.error(e.message);
}
