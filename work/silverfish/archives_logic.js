document.addEventListener('DOMContentLoaded', () => {
  const watchButtons = document.querySelectorAll('.watch-btn');
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'video-modal-overlay';
  modalOverlay.innerHTML = `
    <div class="video-modal-container">
      <button class="modal-close-btn" aria-label="Close modal">Close</button>
      <video id="modal-video" src="" autoplay controls playsinline></video>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const modalContainer = modalOverlay.querySelector('.video-modal-container');
  const modalVideo = modalOverlay.querySelector('#modal-video');
  const closeBtn = modalOverlay.querySelector('.modal-close-btn');

  const openModal = (videoSrc) => {
    modalVideo.src = videoSrc;
    modalVideo.load();
    
    // GSAP Animation
    if (window.gsap) {
      const tl = gsap.timeline();
      tl.to(modalOverlay, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.6,
        ease: 'power3.out'
      })
      .to(modalContainer, {
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');
    } else {
      modalOverlay.style.opacity = '1';
      modalOverlay.style.pointerEvents = 'auto';
      modalContainer.style.transform = 'scale(1)';
    }

    modalVideo.play();
  };

  const closeModal = () => {
    if (window.gsap) {
      const tl = gsap.timeline({
        onComplete: () => {
          modalVideo.src = "";
          modalOverlay.style.pointerEvents = 'none';
        }
      });
      tl.to(modalContainer, {
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(modalOverlay, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, '-=0.2');
    } else {
      modalOverlay.style.opacity = '0';
      modalOverlay.style.pointerEvents = 'none';
      modalContainer.style.transform = 'scale(0.90)';
      modalVideo.src = "";
    }
  };

  watchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = btn.getAttribute('data-video-src');
      if (videoSrc) {
        openModal(videoSrc);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
