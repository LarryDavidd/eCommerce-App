import type { Ref } from 'vue';

export default function useAccordion(body: Ref, wrapper: Ref) {
  const calculateHeight = (wrapper: HTMLElement) => {
    console.log('wrapper', wrapper);
    const wrapperStyles = window.getComputedStyle(wrapper, null);
    return parseFloat(wrapperStyles.height) + parseFloat(wrapperStyles.marginTop) + 'px';
  };
  const closeAccordion = (body: HTMLElement) => {
    body.style.height = '0';
  };
  const openAccordion = (bodyElem: HTMLElement, wrapperElem: HTMLElement) => {
    console.log('bodyElem', bodyElem);
    bodyElem.style.height = calculateHeight(wrapperElem);
    console.log('after', bodyElem);
  };
  const changeAccordionState = (opened: boolean) => {
    console.log('open', opened, body.value, wrapper.value);
    if (opened) {
      openAccordion(body.value, wrapper.value);
    } else {
      closeAccordion(body.value);
    }
  };
  console.log('dddd', body.value, wrapper.value);
  return { changeAccordionState };
}
