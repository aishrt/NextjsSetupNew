export const scrollIntoView = (elId: string, topMinus: number = 110) => {
  setTimeout(() => {
    try {
      const elem = document.getElementById(elId);
      if (elem) {
        const topPosition = window.scrollY + elem.getBoundingClientRect().top - topMinus;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth"
        });
      }
    } catch (e) {
      console.error("Error scrolling into view:", e);
    }
  }, 500);
};



// Uage 

// if (!isEmpty(lookupData)) {
//   scrollIntoView(`${toolName}_resultSection`, 0);
// }