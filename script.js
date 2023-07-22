window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "none";
});

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var t1 = gsap.timeline();

t1.to("#page1", {
  y: "100vh",
  scale: 0.5,
  duration: 0.1,
});

t1.to("#page1", {
  y: "-60vh",
  duration: 2.5,
  delay: 0.5,
});
t1.to("#page1", {
  y: "0vh",
  rotate: -360,
  scale: 1,
  duration: 1,
  delay: 0.5,
});
// Function to show/hide the overlay message and blank page based on screen width
function toggleOverlay() {
  const pageOverlay = document.getElementById("page-overlay");
  const blankPage = document.getElementById("blank-page");
  const isSmallScreen = window.innerWidth < 768; // Adjust this value to target tablets if needed

  if (isSmallScreen) {
    pageOverlay.style.display = "flex";
    blankPage.style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scrolling
  } else {
    pageOverlay.style.display = "none";
    blankPage.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling
  }
}

// Call the toggleOverlay function when the page loads and when the window is resized
window.addEventListener("load", toggleOverlay);
window.addEventListener("resize", toggleOverlay);
// Helper function to check if an element is visible within the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".video");
  let currentVideo = null;

  videos.forEach((video) => {
    video.addEventListener("loadeddata", () => {
      if (!isSmallScreen) {
        video.play(); // Autoplay videos on larger screens
      }
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play();
      });
      video.muted = true; // Mute all videos initially
    });

    video.addEventListener("mouseenter", () => {
      currentVideo = video;
      pauseVideosExcept(currentVideo);
      video.currentTime = 0; // Start the hovered video from the beginning
      video.muted = false; // Unmute the hovered video
      video.play(); // Play the video when hovered
    });

    video.addEventListener("mouseleave", () => {
      currentVideo = null;
      playVideos();
      video.muted = true; // Mute all videos when not hovered
    });
  });

  function pauseVideosExcept(currentVideo) {
    videos.forEach((video) => {
      if (video !== currentVideo) {
        video.pause();
      }
    });
  }

  function playVideos() {
    videos.forEach((video) => {
      if (isElementInViewport(video)) {
        video.play();
      } else {
        video.pause();
      }
    });
  }

  // Use Intersection Observer to handle video visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  });

  videos.forEach((video) => {
    observer.observe(video);
  });
});