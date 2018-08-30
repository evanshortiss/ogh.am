import { h, Component } from 'preact';
import { AppState } from './state';
import { isMobileDevice } from './util';
import { remove } from 'diacritics';

interface OghamInputProps {
  state: AppState;
}

interface OghamInputState {}

export class OghamInput extends Component<OghamInputProps, OghamInputState> {
  constructor(props: OghamInputProps) {
    super(props);

    const queryParts = window.location.search.replace('?', '').split('&');
    const textQueryPart = queryParts.filter(q => {
      const key = q.split('=')[0];

      return key === 'text';
    });

    let text = textQueryPart[0] ? textQueryPart[0].split('=')[1] : '';

    if (!text || typeof text !== 'string') {
      text = 'ireland';
    }

    this.props.state.setInputText(text);
  }

  onChange(e: Event) {
    const el = e.target as HTMLInputElement;

    // Need to clear any previous invalid messages
    el.setCustomValidity('');

    // Set "invalid" callback to show a custom message if form validation fails
    el.oninvalid = function() {
      (this as any).setCustomValidity(
        'Input only supports a-z characters and á, é, í, ó, and ú.'
      );
    };

    const form = (e.target as HTMLElement).parentElement as HTMLFormElement;
    const valid = form.reportValidity();

    if (!valid) {
      // Do not show any Ogham, this avoids confusion hopfully
      this.props.state.setInputText(new Array(el.value.length).join(' '));
    } else {
      // Convert symbols to regular letters and don't allow spaces
      this.props.state.setInputText(remove(el.value.trim()));
    }
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
          pattern="^[a-zA-Záéíúó ]+$"
          onKeyUp={e => this.onChange(e)}
          value={this.props.state.getInputText()}
          type="text"
        />
      </form>
    );
  }
}
