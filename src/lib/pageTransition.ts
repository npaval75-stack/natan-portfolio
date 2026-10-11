type NavigateOptions = {
  confirm?: boolean;
};

type NavigatorFn = (href: string, options?: NavigateOptions) => void;

let navigatorFn: NavigatorFn | null = null;

export function setPageNavigator(fn: NavigatorFn | null) {
  navigatorFn = fn;
}

export function goToPage(href: string, options?: NavigateOptions) {
  if (navigatorFn) {
    navigatorFn(href, options);
    return;
  }

  if (typeof window !== "undefined") {
    window.location.assign(href);
  }
}
