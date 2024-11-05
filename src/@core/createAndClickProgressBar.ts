const createAndClickProgressBar = () => {
  try {
    const progressBar = document.createElement('div');
    progressBar.className = 'progressbar_loader';
    document.body.appendChild(progressBar);
    progressBar.click();
  } catch (e) {}
}
const removeElementsByClassName = (className: string) => {
  try {
    const elements: any = document.getElementsByClassName(className);
    while (elements.length > 0) {
      try {
        elements[0].parentNode.removeChild(elements[0]);
      } catch (e) {}
    }
  } catch (e) {}

}
export {createAndClickProgressBar, removeElementsByClassName}
