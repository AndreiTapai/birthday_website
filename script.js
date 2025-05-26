document.getElementById('blowButton').addEventListener('click', function () {
  const video = document.getElementById('cakeVideo');
  video.pause();
  video.src = 'cake-blowout.mp4';
  video.loop = false;
  video.load();
  video.play();
  this.disabled = true;
  this.textContent = "🎈 Make a Wish!";
});
