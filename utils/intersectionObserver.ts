export const createIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit
  ): IntersectionObserver => {
    return new IntersectionObserver(callback, options);
  };
  