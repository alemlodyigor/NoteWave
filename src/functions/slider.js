const slider = () => {
    const slides = document.querySelectorAll(".home-content__container__notes__note");
    const btnLeft = document.querySelector(".notes__btn-left");
    const btnRight = document.querySelector(".notes__btn-right");
    const sites = document.querySelector(".home-content__container__options__sites__p");
  
    let curSlide = 0;
    const maxSlide = slides.length;
  
    const goToSlide = (slide) => {
      slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
      sites.textContent = `${curSlide + 1}/${slides.length}`;
    };
  
    const nextSlide = () => {
      if (curSlide === maxSlide - 1) curSlide = 0;
      else curSlide++;
  
      goToSlide(curSlide);
    };
  
    const prevSlide = () => {
      if (curSlide === 0) curSlide = maxSlide - 1;
      else curSlide--;
  
      goToSlide(curSlide);
    };
  
    const init = () => {
      goToSlide(0);
    };
  
    init();
  
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
  };
  
  export default slider;
  