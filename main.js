/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    // reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== CERTIFICATE MODAL =====*/
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('modalImage');
const certModalClose = document.getElementById('modalClose');

document.querySelectorAll('.certifications__item').forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.getAttribute('data-full');
    certModalImg.src = imgSrc;
    certModal.classList.add('active');
  });
});

certModalClose.addEventListener('click', () => {
  certModal.classList.remove('active');
  certModalImg.src = "";
});

certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.classList.remove('active');
    certModalImg.src = "";
  }
});

/*===== PROJECT MODAL =====*/
const projectModal = document.getElementById("projectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalDesc = document.getElementById("projectModalDesc");
const projectModalGithub = document.getElementById("projectModalGithub");
const projectModalClose = document.getElementById("projectModalClose");

document.querySelectorAll(".projects__item").forEach(item => {
  item.addEventListener("click", () => {
    const fullImg = item.getAttribute("data-full");
    const desc = item.getAttribute("data-desc");
    const github = item.getAttribute("data-github");

    projectModalImage.src = fullImg;
    projectModalDesc.textContent = desc || "Project description coming soon...";
    projectModalGithub.href = github || "#";

    projectModal.style.display = "flex";
  });
});

// Close on X
projectModalClose.addEventListener("click", () => {
  projectModal.style.display = "none";
});

// Close when clicking outside content
projectModal.addEventListener("click", (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = "none";
  }
});

/*===== CONTACT FORM SUBMISSION =====*/
const contactForm = document.getElementById('contactForm');
const thankYouMsg = document.getElementById('thankYouMsg');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('entry.378893055', name);     // Name
    formData.append('entry.1480240885', email);   // Email
    formData.append('entry.270080748', message);  // Message

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSeXJfvSZIbl-G1ad_z0cB14Nv-Xu-sFetXvzZx9MjnfH24gVw/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).then(() => {
      thankYouMsg.style.display = 'block';
      contactForm.reset();

      // Auto-hide the thank you message after 5 seconds
      setTimeout(() => {
        thankYouMsg.style.display = 'none';
      }, 5000);
    }).catch(err => console.error("Error submitting form!", err));
  });
}
