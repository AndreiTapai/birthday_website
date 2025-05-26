document.getElementById('blowButton').addEventListener('click', function () {
  const video = document.getElementById('cakeVideo');
  video.pause();
  video.src = 'cake-blowout.mp4';
  video.loop = false;
  video.load();
  video.play();

  // Hide the button after it's clicked
  this.style.display = 'none';
});
