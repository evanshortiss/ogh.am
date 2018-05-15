import { h, Component } from 'preact';
import * as ogham from 'ogham';
import render from './ogham-render';
import { AppState } from './state';
import { isAppleMobileDevice } from './util';
import copy = require('clipboard-copy');

interface OghamOutputProps {
  state: AppState;
}

interface OghamOutputState {
  plaintext: string;
}

export class OghamOutput extends Component<OghamOutputProps, OghamOutputState> {
  constructor(props: OghamOutputProps) {
    super(props);

    // Use whatever value is stored initially
    this.setState({ plaintext: this.props.state.getInputText() });

    // Refresh the UI on state change
    this.props.state.on('update', () => {
      this.setState({
        plaintext: this.props.state.getInputText()
      });
    });
  }

  downloadImage(e: Event) {
    const data = render(this.getTextAsOgham()).toDataURL('image/jpeg', 0.5);

    if (isAppleMobileDevice()) {
      window.open(data, '_blank');
    } else {
      const el = e.target as HTMLAnchorElement;
      const filename = this.state.plaintext.toLowerCase().replace(/ /gi, '-');
      el.href = render(this.getTextAsOgham()).toDataURL();
      el.download = `ogham-${filename}`;
    }
  }

  copyOghamToClipboard() {
    copy(this.getTextAsOgham());
  }

  copyLinkToClipboard() {
    copy(`${window.location.origin}?text=${this.state.plaintext}`);
  }

  getTextAsOgham() {
    return ogham.convert(this.state.plaintext, {
      usePhonetics: true,
      addBoundary: false
    });
  }

  render(props: OghamOutputProps, state: OghamOutputState) {
    return (
      <div class="center">
        <div>
          <h2 class="vertical" style={"font-family: 'BabelStone Ogham'"}>
            {this.getTextAsOgham()}
          </h2>
        </div>
        <div class="row">
          <div class="four columns">
            <a
              onClick={e => this.downloadImage(e)}
              class="button button-primary"
              href="#"
            >
              Download File{' '}
              <i class="svg-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-download"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </i>
            </a>
          </div>
          <div class="four columns">
            <button
              onClick={() => this.copyOghamToClipboard()}
              class="button-primary"
            >
              Copy Text{' '}
              <i class="svg-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-copy"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </i>
            </button>
          </div>
          <div class="four columns">
            <button
              onClick={() => this.copyLinkToClipboard()}
              class="button-primary"
            >
              Copy Link{' '}
              <i class="svg-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-share-2"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
