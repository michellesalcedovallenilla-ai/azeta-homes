const { execSync } = require('child_process');
try {
  console.log('Optimizing video...');
  // -movflags faststart moves the moov atom to the beginning
  // -crf 28 compresses it to make it smaller
  // -preset veryfast makes the encoding faster
  execSync('ffmpeg -y -i public/videohere.mp4 -vcodec libx264 -crf 28 -preset veryfast -movflags +faststart public/videohere_opt.mp4', { stdio: 'inherit' });
  console.log('Video optimized successfully.');
} catch (e) {
  console.error('Error optimizing video:', e.message);
}
