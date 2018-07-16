import { EventEmitter } from 'events';

export class AppState extends EventEmitter {
  private inputText: string;

  constructor() {
    super();

    this.inputText = 'ireland';
  }

  getInputText() {
    return this.inputText;
  }

  setInputText(text: string) {
    this.inputText = text;

    this.emit('update');
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
