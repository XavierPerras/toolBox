export default class Cache {
  static set(key, value, force) {
    if (key === undefined) {
      console.error("Vous n'avez pas fourni de clef pour le localstorage ");
    } else if (value === undefined) {
      console.error("Vous n 'avez pas fourni de valeur pour le -localstorage ");
    } else if (Cache.isLocalStorageAvailable()) {
      key = `TT_${key}`;
      localStorage.setItem(key, value);
    }
  }

  static get(key) {
    if (key === undefined) {
      console.error("Vous n'avez pas fourni de clef pour le- localstorage ");
    } else if (Cache.isLocalStorageAvailable()) {
      key = `TT_${key}`;
      return localStorage.getItem(key);
    }
  }

  static remove(key) {
    if (key === undefined) {
      console.error("Vous n'avez pas fourni de clef pour le- localstorage ");
    } else if (Cache.isLocalStorageAvailable()) {
      key = `TT_${key}`;
      localStorage.removeItem(key);
    }
  }

  isLocalStorageAvailable() {
    const test = '__tim__';

    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      console.error('localStorage non dispo');
    }
  }
}
