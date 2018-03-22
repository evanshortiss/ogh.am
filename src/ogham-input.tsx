/// <reference path="../diacritics.d.ts" />

import { h, Component } from 'preact';
import { AppState } from './state';
import { isMobileDevice } from './util';
import * as diacritics from 'diacritics';

interface OghamInputProps {
  state: AppState;
}

interface OghamInputState {}

export class OghamInput extends Component<OghamInputProps, OghamInputState> {
  constructor(props: OghamInputProps) {
    super(props);

    setTimeout(() => {
      this.props.state.setInputText('ireland');
    }, 250);
  }

  onChange(e: Event) {
    const el = e.target as HTMLInputElement;

    // Bind the invalid text. Should handle this a little better
    el.oninvalid = function() {
      (this as any).setCustomValidity(
        'Input can only contain a-z characters and spaces'
      );
    };

    this.props.state.setInputText(diacritics.remove(el.value));
  }

  handleSubmit(e: Event) {
    // Our form setup in this component is designed so iOS displays a "go"
    // button and we can hide the keyboard when pressed
    if (isMobileDevice()) {
      (document.activeElement as any).blur();
    }

    e.preventDefault();
    return false;
  }

  render(props: OghamInputProps, state: OghamInputState) {
    return (
      <form action="" onSubmit={e => this.handleSubmit(e)}>
        <input
          pattern="^[a-zA-Z ]+$"
          onKeyUp={e => this.onChange(e)}
          value={this.props.state.getInputText()}
          type="text"
        />
      </form>
    );
  }
}
