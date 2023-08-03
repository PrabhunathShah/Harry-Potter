

function isLaptopOrDesktopScreen() {
  // Get the window width to check the device size
  const windowWidth = window.innerWidth;

  // Define the breakpoint for laptop and desktop screens (you can adjust this value as needed)
  const breakpoint = 1024;

  // Return true if the window width is greater than or equal to the breakpoint (laptop/desktop size)
  return windowWidth >= breakpoint;
}

// JavaScript

// Function to detect small screens (phones and tablets)
function isSmallScreen() {
  // Get the window width to check the screen size
  const windowWidth = window.innerWidth;

  // Define the breakpoint for small screens (you can adjust this value as needed)
  const breakpoint = 1024; // For example, 768px is a common breakpoint for tablets

  // Return true if the window width is less than the breakpoint (small screen size)
  return windowWidth < breakpoint;
}

// Function to show the message box on small screens
function showMessageBox() {
  const messageBox = document.getElementById("message-box");
  messageBox.style.display = "block";
}

// Function to hide the message box on tap or click
function hideMessageBoxOnTap() {
  const messageBox = document.getElementById("message-box");
  messageBox.style.display = "none";
}

// Function to add event listeners to the document
function addEventListeners() {
  // Check if the device is a small screen and show the message box if necessary
  if (isSmallScreen()) {
    showMessageBox();
  }

  // Add a click event listener to the document
  document.addEventListener("click", hideMessageBoxOnTap);
}

// Call the addEventListeners function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", addEventListeners);

function hideLoadingScreen() {
  // Check if the device is laptop or desktop size before proceeding
  if (isLaptopOrDesktopScreen()) {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main");
    const body = document.body;

    // Disable scrolling
    body.classList.add("no-scroll");

    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainContent.style.display = "block";
      startGSAPAnimation(); // Call the function to start GSAP animations
    }, 3500); // 3 seconds delay
  } else {
    // Hide the loading screen and display the main content immediately for phones and tablets
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main");

    loadingScreen.style.display = "none";
    mainContent.style.display = "block";
  }
}

// Define the function to start GSAP animations
function startGSAPAnimation() {
  const page = document.querySelector("#container-1");
  const tl = gsap.timeline();

  tl.to(page, {
    y: "10vw",
    scale: 0.5,
    duration: 0,
  })
    .to(page, {
      y: "-50vw",
      duration: 2,
      ease: "Linear.easeNone",
    })
    .to(page, {
      y: "0vh",
      rotate: -360,
      scale: 1,
      duration: 1.5,
      delay: 0.5,
      transformOrigin: "50vw 60vw",
      ease: "Linear.easeNone",
    })
    .then(() => {
      // Enable scrolling after GSAP animations are complete
      const body = document.body;
      body.classList.remove("no-scroll");
      initLocomotiveScroll(); // Start Locomotive Scroll after GSAP animations are complete
    });
}

document.addEventListener("DOMContentLoaded", function () {
  hideLoadingScreen(); // Call the function to start the loading screen and GSAP animations
});

function initLocomotiveScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#pages"),
    smooth: true,
  });

  // Add your Locomotive Scroll related code here
  // (e.g., setting up your Locomotive Scroll listeners, options, etc.)
}

// JavaScript
function startVideoPlayback() {
  const videos = document.querySelectorAll(".video");
  videos.forEach((video) => {
    video.muted = true; // Mute all videos initially
    video.play(); // Start video playback
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play();
    });
  });
}

function pauseVideosExcept(currentVideo) {
  const videos = document.querySelectorAll(".video");
  videos.forEach((video) => {
    if (video !== currentVideo) {
      video.pause();
    }
  });
}

function playVideos() {
  const videos = document.querySelectorAll(".video");
  videos.forEach((video) => {
    if (isElementInViewport(video)) {
      video.play();
    } else {
      video.pause();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  startVideoPlayback();

  const videos = document.querySelectorAll(".video");
  let currentVideo = null;

  videos.forEach((video) => {
    video.addEventListener("mouseenter", () => {
      if (currentVideo !== null && currentVideo !== video) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
        currentVideo.muted = true; // Mute the previously hovered video
      }

      currentVideo = video;
      video.muted = false; // Unmute the hovered video
      video.currentTime = 0; // Start the hovered video from the beginning
      video.play(); // Play the video when hovered
    });

    video.addEventListener("mouseleave", () => {
      if (currentVideo !== video) {
        video.currentTime = 0;
      }
      video.muted = true; // Mute the video when not hovered
    });
  });
});

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

const videos = document.querySelectorAll(".video");
videos.forEach((video) => {
  observer.observe(video);
});

window.addEventListener("beforeunload", () => {
  const videos = document.querySelectorAll(".video");
  videos.forEach((video) => {
    video.pause(); // Pause videos before the page unloads
  });
});

window.addEventListener("load", () => {
  startVideoPlayback();
});
