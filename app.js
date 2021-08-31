// NAV SECTION

const burger = document.querySelector(".burger");
const navLinksList = document.querySelector(".nav__links");
const burgerLines = document.querySelectorAll(".burger__line");
const navLinks = document.querySelectorAll('.nav__link');

let screenWidth = document.body.scrollWidth;
const mobileScreen = 699;

let menuIsActive = false;

// Function that repairs onload burger animation
setTimeout(() => {
  burgerLines.forEach(el => el.classList.add('burger__transition'));
}, 1000)

burger.addEventListener("click", () => {
  if (menuIsActive) {
    // Menu is activated

    navLinksList.style.transform = "translateX(-100%)";
    burgerLines[0].style.transform = "rotate(0deg) translateY(0px)";
    burgerLines[1].style.opacity = "1";
    burgerLines[2].style.transform = "rotate(0deg) translateY(0px)";

    menuIsActive = false;
  } else {
    // Menu is not activated

    navLinksList.style.transform = "translateX(0%)";
    burgerLines[0].style.transform = "rotate(-45deg) translateY(7px) translateX(-8px)";
    burgerLines[1].style.opacity = "0";
    burgerLines[2].style.transform = "rotate(45deg) translateY(-7px) translateX(-8px)";

    menuIsActive = true;
  }
});

if(screenWidth < mobileScreen){
  navLinks.forEach(el => {
    el.addEventListener('click', () => {
      setTimeout(() => {
        //Hide navbar and set burger unactive after 300 ms
        navLinksList.style.transform = "translateX(-100%)";
        burgerLines[0].style.transform = "rotate(0deg) translateY(0px)";
        burgerLines[1].style.opacity = "1";
        burgerLines[2].style.transform = "rotate(0deg) translateY(0px)";
  
        menuIsActive = false;
      }, 300);
    });
  });
}

//NAVBAR SECTION

let yOffset = window.pageYOffset;

const underlines = document.querySelectorAll('.underline');

//Function to mark nav link which is on viewport
function setSection() {

  //Offset of sections
  const servicesOffsetTop = document.querySelector('.services__section').offsetTop;
  const teamOffsetTop = document.querySelector('.team__section').offsetTop;
  const portfolioOffsetTop = document.querySelector('.portfolio__section').offsetTop;
  const pricingOffsetTop = document.querySelector('.pricing__section').offsetTop;
  const newsOffsetTop = document.querySelector('.news__section').offsetTop;


  //Function to show active navlink
  function setLinkActive(index) {
    underlines.forEach(el => el.style.width = '0%');
    underlines[index].style.width = '100%';
    
    navLinks.forEach(el => el.style.color = '#323232');
    navLinks[index].style.color = '#f85c5b';
  }

  //Executing function for each section
  switch (true) {

    case yOffset <= servicesOffsetTop - 200:
      setLinkActive(0);

      break;
    
    case yOffset > servicesOffsetTop - 200 && yOffset < portfolioOffsetTop - 200:
      setLinkActive(1);

      break;

    case yOffset > teamOffsetTop - 200 && yOffset < pricingOffsetTop - 200:
      setLinkActive(2);
      
      break;

    case yOffset > portfolioOffsetTop - 200 && yOffset < teamOffsetTop - 200:
      setLinkActive(3);
      
      break; 

    case yOffset > pricingOffsetTop - 200 && yOffset < newsOffsetTop - 200:
      setLinkActive(4);
      
      break;

    case yOffset > newsOffsetTop - 200 && window.innerHeight + yOffset < document.body.offsetHeight:
      setLinkActive(5);
      
      break; 

    case window.innerHeight + window.pageYOffset >= document.body.offsetHeight:
      setLinkActive(6);
      
      break;
  }
}

//Executing function that set navlink active while scrolling
document.addEventListener('scroll', () => {
  yOffset = window.pageYOffset;

  setSection();
});

//VIDEO BACKGROUND

const btnBackground = document.querySelector('.button__background');
const startBtn = document.querySelector('.start__btn');
const pauseBtn = document.querySelector('.pause__btn');
const portfolioVideo = document.querySelector('.portfolio__video');

let videoIsActive = false;
let clickDisabled = true;

portfolioVideo.addEventListener('click', () => {
  if(clickDisabled){
    if(videoIsActive){
      //If video is active
      startBtn.style.display = 'block';
      pauseBtn.style.display = 'none';
  
      //Disapearing animation
      gsap.from(btnBackground, {
        opacity: 0,
        duration: 0.3,
        transform: 'scale(0.8)'
      });
  
      portfolioVideo.style.backgroundImage = 'url(./img/video__background.png)';
  
      videoIsActive = false;
  
    } else {
      //If video is not active
      startBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
  
      //Disapearing animation
      gsap.from(btnBackground, {
        opacity: 0,
        duration: 0.3,
        transform: 'scale(0.8)'
      });
  
      portfolioVideo.style.backgroundImage = 'url(./img/video__background.gif)';
  
      videoIsActive = true;
    }


    clickDisabled = false;
    //Disable spam clicking
    setTimeout(() => clickDisabled = true, 500);
  }
});


// PROJECTS SECTION

const categories = document.querySelectorAll(".categorie");
const projects = document.querySelectorAll(".project");

categories.forEach((el) => {
  el.addEventListener("click", (e) => {
    // Remove active class for all categories
    categories.forEach(el => el.classList.remove("categorie__active"));

    // Set active class for active category
    e.target.classList.add("categorie__active");

    if (e.target.dataset.category !== "all") {
      // Hide all projects
      projects.forEach((el) => {
        el.style.display = "none";

        // Show projects with chosen category
        if (el.dataset.category === e.target.dataset.category) {
          el.style.display = "flex";
        }
      });
    } else {
      // Show all projects when category "all" is chosen
      projects.forEach(el => el.style.display = "flex");
    }
  });
});

// CLIENTS SECTION

const clients = document.querySelectorAll(".client__image__border");

let clientOneHeight = clients[0].offsetHeight;
let clientTwoHeight = clients[1].offsetHeight;
let clientThreeHeight = clients[2].offsetHeight;


//Function to set screen width and clients heights
function setWidth() {
    screenWidth = document.body.scrollWidth;  
  
    clientOneHeight = clients[0].offsetHeight;
    clientTwoHeight = clients[1].offsetHeight;
    clientThreeHeight = clients[2].offsetHeight;
}

//Debounce function
function debounced(delay, fn) {
  let timerId;
  return function(...args) {
      if (timerId) {
          clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
          fn(...args);
          timerId = null;
      }, delay);
  };
}

//Apply debounce to function that sets screen width and clients heights
const handler = debounced(200, setWidth);
window.addEventListener('resize', handler);

// Current client index
let index = 1;

const clientName = document.querySelector(".client__name");
const clientPosition = document.querySelector(".client__position");

function setClient() {
  switch (index) {
    case 0:
      //Set client name and position
      clientName.innerHTML = "hilary chaplin";
      clientPosition.innerHTML = "web developer";

      //Reset active class
      clients.forEach(el => el.classList.remove("client__image__border--active"));

      //Set active class
      clients[0].classList.add("client__image__border--active");

      //Set clients positions on screen
      if (screenWidth > mobileScreen) {
        clients[0].style.left = `${screenWidth / 2 - clientOneHeight / 2}px`;
        clients[1].style.left = `calc(70% - 3.75rem)`;
        clients[2].style.left = `82%`;
      } else {
        clients[0].style.left = `${screenWidth / 2 - clientOneHeight / 2}px`;
        clients[1].style.left = `calc(70% - 3.75rem)`;
        clients[2].style.left = `70%`;
      }

      break;

    case 1:
      //Set client name and position
      clientName.innerHTML = "alan morrison";
      clientPosition.innerHTML = "company ceo";

      //Reset active class
      clients.forEach(el => el.classList.remove("client__image__border--active"));

      //Set active class
      clients[1].classList.add("client__image__border--active");

      //Set clients positions on screen
      if (screenWidth > mobileScreen) {
        clients[0].style.left = `calc(30% - 3.75rem)`;
        clients[1].style.left = `${screenWidth / 2 - clientTwoHeight / 2}px`;
        clients[2].style.left = `calc(70% - 3.75rem)`;
      } else {
        clients[0].style.left = `calc(30% - 3.75rem)`;
        clients[1].style.left = `${screenWidth / 2 - clientTwoHeight / 2}px`;
        clients[2].style.left = `calc(70% - 3.75rem)`;
      }

      break;

    case 2:
      //Set client name and position
      clientName.innerHTML = "emma watson";
      clientPosition.innerHTML = "ui/ux designer";

      //Reset active class
      clients.forEach(el => el.classList.remove("client__image__border--active"));

      //Set active class
      clients[2].classList.add("client__image__border--active");

      //Set clients positions on screen
      if (screenWidth > mobileScreen) {
        clients[0].style.left = `5%`;
        clients[1].style.left = `calc(30% - 3.75rem)`;
        clients[2].style.left = `${screenWidth / 2 - clientThreeHeight / 2}px`;
      } else {
        clients[0].style.left = `calc(18% - 3.75rem)`;
        clients[1].style.left = `calc(30% - 3.75rem)`;
        clients[2].style.left = `${screenWidth / 2 - clientThreeHeight / 2}px`;
      }

      break;
  }
}

const clientsDescription = document.querySelectorAll(".clients__description__wrapper");

// TranslateX values for each client
let clientsOne = -100;
let clientsTwo = 0;
let clientsThree = 100;

//Function for chaning clients descriptions
function setClientDesc(direction) {
  // Change translateX for each client
  if (direction === "left") {
    clientsOne += 100;
    clientsTwo += 100;
    clientsThree += 100;
  } else if (direction === "right") {
    clientsOne -= 100;
    clientsTwo -= 100;
    clientsThree -= 100;
  }

  clientsDescription[0].style.transform = `translateX(${clientsOne}%)`;
  clientsDescription[1].style.transform = `translateX(${clientsTwo}%)`;
  clientsDescription[2].style.transform = `translateX(${clientsThree}%)`;
}

const arrowLeft = document.querySelector(".arrow__left");
const arrowRight = document.querySelector(".arrow__right");

arrowLeft.addEventListener("click", () => {
  if (index > 0) {
    // Update current client
    index--;

    // Change description for current
    setClientDesc("left");

    // Change name and position of current client
    setClient();
  }
});

arrowRight.addEventListener("click", () => {
  if (index < 2) {
    // Update current client
    index++;

    // Change description for current
    setClientDesc("right");

    // Change name and position of current client
    setClient();
  }
});

// WORK DONE SECTION
const workDoneContainer = document.querySelector(".work__done__container");
const workDonePos = workDoneContainer.offsetTop;
let countIsActive = true;

document.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop + 600 >= workDonePos) {
    // Run function only once
    if (countIsActive) {
      // Set isActive to false to run function only once
      countIsActive = false;

      // How long you want the animation to take, in ms
      const animationDuration = 4000;

      // Calculate how long each ‘frame’ should last if we want to
      //update the animation 60 times per second
      const frameDuration = 1000 / 60;

      // Use that to calculate how many frames we need to complete the
      // animation
      const totalFrames = Math.round(animationDuration / frameDuration);

      // An ease-out function that slows the count as it progress
      const easeOut = (t) => t * (2 - t);

      // The animation function
      const workNumbers = document.querySelectorAll(".work__number");

      workNumbers.forEach((el) => {
        let frame = 0;
        const countTo = parseInt(el.dataset.countto, 10);

        // Start the animation running 60 times per second
        const counter = setInterval(() => {
          frame++;
          // Calculate our progress as a value between 0 and 1
          // Pass that value to our easing function to get our
          //progress on a curve
          const progress = easeOut(frame / totalFrames);

          // Use the progress value to calculate the current count
          const currentCount = Math.round(countTo * progress);

          // If the current count has changed, update the element
          if (parseInt(el.dataset.countto, 10) !== currentCount) {
            el.innerHTML = currentCount;
          }

          // If we’ve reached our last frame, stop the animation
          if (frame === totalFrames) {
            clearInterval(counter);
          }
        }, frameDuration);
      });
    }
  }
});

//ANIMATIONS

//MAIN ANIMATIONS
const mainTl = gsap.timeline({
  delay: 1.5,
});

gsap.set(
  `.header__title,
   .header__subtitle,
   .header__button,
   .navbar, 
   .info__bar,
   .line__one,
   .line__two,
   .line__three
   `,
  {
    visibility: "visible",
  }
);

const headerButtonChilds = document.querySelector(".header__button").children;

mainTl
  .from(".header__title", {
    duration: 0.7,
    y: 50,
    opacity: 0,
    ease: "power4. out",
  })
  .from('.logo', {
    duration: 1,
    opacity: 0,
    ease: "power4. out",
  });

  if(screenWidth > mobileScreen){

    //Animations for big screens
    navLinks.forEach((el) => {
      mainTl.from(el, {
        duration: 0.45,
        y: 50,
        opacity: 0,
        ease: "power4. out",
      });
    });

    mainTl
      .fromTo(underlines[0], {
        duration: 0.5,
        width: 0,
        ease: "power4. out"
      }, {
        width: '100%'
      })
      .to(navLinks[0], {
        color: '#f85c5b'
      })
      .from(".header__subtitle", {
        duration: 0.7,
        y: 50,
        opacity: 0,
        ease: "power4. out",
      }, '-=5')
      .from(".header__button", {
        duration: 0.7,
        width: 0,
        opacity: 0,
        ease: "power4. out",
      }, '-=4.3')
      .from([headerButtonChilds[0], headerButtonChilds[1]], {
        duration: 1,
        x: -20,
        opacity: 0,
        ease: "power4. out",
      }, '-=3.5');

  } else {

    ////Animations for mobile screens
    mainTl
      .from(".header__subtitle", {
        duration: 0.7,
        y: 50,
        opacity: 0,
        ease: "power4. out",
      }, '-=0.8')
      .from(burgerLines[0], {
        duration: 0.1,
        opacity: 0,
        x: -30,
        ease: "power4. out",
      }, '-=.5')
      .from(burgerLines[1], {
        duration: 0.1,
        opacity: 0,
        ease: "power4. out",
      }, '-=.5')
      .from(burgerLines[2], {
        duration: 0.1,
        opacity: 0,
        x: 30,
        ease: "power4. out",
      }, '-=.5')
      .from(".header__button", {
        duration: 0.7,
        width: 0,
        opacity: 0,
        ease: "power4. out",
      }, '-=0.3')
      .from([headerButtonChilds[0], headerButtonChilds[1]], {
        duration: 1,
        x: -20,
        opacity: 0,
        ease: "power4. out",
      }, '-=0');
  }

  mainTl
    .from('body', {
      overflowY: 'hidden'
    });


//Animations for titles and subtitles

const titles = document.querySelectorAll('.title');

titles.forEach(el => {
  const allTL = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 70%',
    }
  });

  allTL.from(el, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4. out",
  });
});

const subtitles = document.querySelectorAll('.subtitle');

subtitles.forEach(el => {
  const allTL2 = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 70%',
    }
  });

  allTL2.from(el, {
    duration: 1,
    y: 20,
    opacity: 0,
    delay: 0.5,
    ease: "power4. out",
  });
});
  


//SERVICES ANIMATIONS

const services = document.querySelectorAll('.service');

if(screenWidth > mobileScreen){

  //Animations for big screens

  const servicesTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.service',
      start: 'top 70%',
    },
  });

  services.forEach((el) => {

    servicesTL.from(el, {
      duration: 0.6,
      y: 40,
      opacity: 0,
      stagger: 0.02
    }, '-=0.2');
  });

} else {
  //Animations for mobile screens

  services.forEach((el) => {

    const servicesTL = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'bottom 80%',
      },
    });

      servicesTL.from(el, {
        duration: 0.6,
        y: 40,
        opacity: 0,
        stagger: 0.02
      }, '-=0.2');
    });
}


//PORTFOILO ANIMATIONS

const portfolioTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.portfolio__container',
    start: 'top 10%',
  }
});

if(screenWidth > mobileScreen){
  //Big screen animations

  projects.forEach(el => {
    portfolioTL.from(el, {
      duration: 0.35,
      y: 40,
      x: -40,
      opacity: 0,
      stagger: 0.02,
      ease: "power4. out",
    });
  });

} else {
  //Animations for mobile screens

  projects.forEach(el => {

    const portfolioTL = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 55%',
      }
    });

    portfolioTL.from(el, {
      duration: 0.5,
      y: 40,
      x: -40,
      opacity: 0,
      stagger: 0.02,
      ease: "power4. out",
    });
  });
}

const portfolioButtonChilds = document.querySelector('.portfolio__button').children;

portfolioTL
  .from(".portfolio__button", {
    duration: 0.7,
    width: 0,
    opacity: 0,
    ease: "power4. out",
  })
  .from([portfolioButtonChilds[0], portfolioButtonChilds[1]], {
    duration: 1,
    x: -20,
    opacity: 0,
    ease: "power4. out",
  });


//TEAM ANIMATIONS

const teamTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.team__container',
    start: 'top 20%',
  }
});

const members = document.querySelectorAll('.member');

if(screenWidth > mobileScreen) {
  //Animations for big screens

  teamTL
    .from(members[0], {
      duration: 1,
      x: 250,
      opacity: 0,
      ease: "power4. out",
    })
    .from(members[2], {
      duration: 1,
      x: -250,
      opacity: 0,
      ease: "power4. out",
    }, '-=1');

} else {
  //Animations for mobile screens

  members.forEach(el => {
    const teamTL = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 50%',
      }
    });

    teamTL
      .from(el, {
        duration: 1,
        x: -200,
        opacity: 0,
        ease: "power4. out",
      });

  });
}


//Pricing animations

const pricingCards = document.querySelectorAll('.pricing__card');

const pricingTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.pricing__container',
    start: 'top 20%',
  }
});

if(screenWidth > mobileScreen){
  //Animations for big screens

  pricingTL.from(pricingCards[0], {
      duration: 1,
      x: 250,
      opacity: 0,
      ease: "power4. out",
    })
    .from(pricingCards[2], {
      duration: 1,
      x: -250,
      opacity: 0,
      ease: "power4. out",
    }, '-=1');

} else {
  //Animations for mobile screens

  pricingCards.forEach(el => {
    const teamTL = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 50%',
      }
    });

    teamTL
      .from(el, {
        duration: 1,
        x: -200,
        opacity: 0,
        ease: "power4. out",
      });

  });
}

pricingTL
  .from('.pricing__card__price', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power4. out",
  });


const offers = document.querySelectorAll('.pricing__card__offer');


offers.forEach(el => {
  const offerItems = [...el.children];

  const offerTL = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 50%',
        stagger: 0.02
      }
    });

  offerItems.forEach(el => {

    offerTL
      .from(el, {
        duration: 0.4,
        y: 50,
        opacity: 0,
        ease: "power4. out",
      });
  });
});

//News Animations

const news = document.querySelectorAll('.news__text');

news.forEach((el, index) => {

  const newsTL = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 40%',
    }
  });


  newsTL
    .from(el, {
      duration: 0.75 * (index + 1),
      opacity: 0,
      y: -300,
      ease: "power4. out",
    });
});







