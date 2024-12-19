declare module 'locomotive-scroll' {
  export default class LocomotiveScroll {
    constructor(options: { el: HTMLElement; smooth: boolean });
    scrollTo(target: HTMLElement | string, offset?: number, options?: { disableLerp?: boolean }): void;
    update(): void;
    destroy(): void;
  }
}