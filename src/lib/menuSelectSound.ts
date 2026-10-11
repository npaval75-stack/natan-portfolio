const MENU_SELECT_SRC = "/audio/menu-select.mp3";
const MENU_SELECT_VOLUME = 0.25;

const MENU_CONFIRM_SRC = "/audio/menu-confirm.mp3";
const MENU_CONFIRM_VOLUME = 0.35;

let menuSelectAudio: HTMLAudioElement | null = null;
let menuConfirmAudio: HTMLAudioElement | null = null;

function getMenuSelectAudio() {
  if (typeof window === "undefined") return null;

  if (!menuSelectAudio) {
    menuSelectAudio = new Audio(MENU_SELECT_SRC);
    menuSelectAudio.preload = "auto";
    menuSelectAudio.volume = MENU_SELECT_VOLUME;
  }

  return menuSelectAudio;
}

export function playMenuSelectSound() {
  const audio = getMenuSelectAudio();
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  void audio.play().catch(() => {});
}

function getMenuConfirmAudio() {
  if (typeof window === "undefined") return null;

  if (!menuConfirmAudio) {
    menuConfirmAudio = new Audio(MENU_CONFIRM_SRC);
    menuConfirmAudio.preload = "auto";
    menuConfirmAudio.volume = MENU_CONFIRM_VOLUME;
  }

  return menuConfirmAudio;
}

export function preloadMenuSelectSound() {
  getMenuSelectAudio();
  getMenuConfirmAudio();
}

export function playMenuConfirmSound() {
  const audio = getMenuConfirmAudio();
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  void audio.play().catch(() => {});
}
