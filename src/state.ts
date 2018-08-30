export class AppState {
  private inputText: string;
  private callback: Function;

  constructor() {
    this.inputText = 'ireland';
  }

  setCallback(fn: Function) {
    this.callback = fn;
  }

  getInputText() {
    return this.inputText;
  }

  setInputText(text: string) {
    this.inputText = text;

    if (this.callback) {
      this.callback('update');
    }
  }
}

let instance: AppState;

/**
 * Fetches an instacne of the app state.
 * Creates one if it doesn't already exist.
 */
export default function getInstance() {
  if (!instance) {
    instance = new AppState();
  }

  return instance;
}
