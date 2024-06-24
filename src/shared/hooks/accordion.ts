import type { Ref } from 'vue';

export default function useAccordion(body: Ref, wrapper: Ref) {
  const calculateHeight = (wrapper: HTMLElement) => {
    const wrapperStyles = window.getComputedStyle(wrapper, null);
    return parseFloat(wrapperStyles.height) + parseFloat(wrapperStyles.marginTop) + 'px';
  };
  const closeAccordion = (body: HTMLElement) => {
    body.style.height = '0';
  };
  const openAccordion = (bodyElem: HTMLElement, wrapperElem: HTMLElement) => {
    bodyElem.style.height = calculateHeight(wrapperElem);
  };
  const changeAccordionState = (opened: boolean) => {
    if (opened) {
      openAccordion(body.value, wrapper.value);
    } else {
      closeAccordion(body.value);
    }
  };
  return { changeAccordionState };
}
