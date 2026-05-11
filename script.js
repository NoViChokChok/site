document.querySelectorAll('.carousel').forEach((carousel) => {
  const items = carousel.querySelectorAll('.video-item');
  let activeIndex = 0;

  const setActive = (index) => {
    items.forEach((item) => item.classList.remove('active'));
    items[index].classList.add('active');
    activeIndex = index;
  };

  // Клик по видео
  items.forEach((item, index) => {
    item.addEventListener('click', () => setActive(index));
    item.setAttribute('tabindex', '0'); // доступно с клавиатуры
  });

  // Навигация клавишами ← → при фокусе на карусели
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') setActive((activeIndex - 1 + items.length) % items.length);
    if (e.key === 'ArrowRight') setActive((activeIndex + 1) % items.length);
  });

  // Кнопки управления
  const prevBtn = carousel.parentElement.querySelector('.prev');
  const nextBtn = carousel.parentElement.querySelector('.next');

  prevBtn.addEventListener('click', () => setActive((activeIndex - 1 + items.length) % items.length));
  nextBtn.addEventListener('click', () => setActive((activeIndex + 1) % items.length));

  setActive(activeIndex); // инициализация
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".video-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {

        // задержка в зависимости от порядка секции
        const delay = Array.from(sections).indexOf(entry.target) * 150;

        setTimeout(() => {
          entry.target.classList.add("show");
        }, delay);
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
ddocument.querySelectorAll('.video-item').forEach(item => {
  const id = item.dataset.video;

  item.style.setProperty(
    "--thumb",
    `url(https://i.ytimg.com/vi/${id}/maxresdefault.jpg)`
  );

  item.addEventListener('click', () => {
    openVideo(id);
  });
});

function openVideo(id) {
  const overlay = document.createElement('div');

  overlay.style = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  overlay.innerHTML = `
    <iframe 
      width="85%" 
      height="85%" 
      src="https://www.youtube.com/embed/${id}?autoplay=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;

  overlay.addEventListener('click', () => overlay.remove());

  document.body.appendChild(overlay);
}
