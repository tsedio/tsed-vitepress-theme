export default {
  mounted(el: HTMLElement, binding: any) {
    if (binding.modifiers["self"]) {
      el.classList.add("opacity-0");
    }

    function display() {
      if (binding.modifiers["self"]) {
        el.classList.remove("opacity-0");
      } else {
        const imgEl = el.querySelector("img");
        const iframe = el.querySelector("iframe");

        if (imgEl) {
          imgEl.addEventListener("load", () => {
            setTimeout(() => {
              imgEl.classList.remove("opacity-0");
            }, 100);
          });
          imgEl.src = imgEl.dataset.url || "";
        } else if (iframe) {
          iframe.src = iframe.dataset.url || "";
        } else {
          el.classList.add("opacity-0");
        }
      }
    }

    function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          display();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: "0"
      };
      const observer = new IntersectionObserver(handleIntersect, options as unknown as IntersectionObserverInit);
      observer.observe(el);
    }

    if (window["IntersectionObserver"]) {
      createObserver();
    } else {
      display();
    }
  }
};
