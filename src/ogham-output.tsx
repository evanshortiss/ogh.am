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
    this.props.state.setCallback(() => {
      this.setState({
        plaintext: this.props.state.getInputText()
      });
    })
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

  shareViaTwitter () {
    const text = `I created the ogham string ${this.getTextAsOgham()}, which means "${this.state.plaintext}". Try it yourself on`
    const url = `https://ogh.am?text=${this.state.plaintext}`
    const tags = 'ogham,gaelic,irish'

    window.open(
      `http://twitter.com/share?text=${text}&url=${url}&hashtags=${tags}`,
      '_blank'
    )
  }

  shareViaLinkedIn() {
    const url = `https://ogh.am?text=${this.state.plaintext}`
    const title = 'Ogham Transliterator'
    const summary = `I created the ogham string ${this.getTextAsOgham()} - it means "${this.state.plaintext}". Try it yourself on https://ogh.am`

    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
      '_blank'
    )
  }

  copyOghamToClipboard() {
    copy(this.getTextAsOgham());
    alert(`Copied ${this.getTextAsOgham()} to clipboard!`)
  }

  copyLinkToClipboard() {
    copy(`${window.location.origin}?text=${this.state.plaintext}`);
    alert(`Copied link to clipboard!`)
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
        <div style="display: inline-grid;">
          <h2 class="vertical" style={"font-family: 'BabelStone Ogham'"}>
            {this.getTextAsOgham()}
          </h2>
        </div>
        <p class="center">Use the download button to obtain a high-quality image of your Ogham.</p>
        <div class="row">
          <div class="four columns">
            <a
              onClick={e => this.downloadImage(e)}
              class="button button-primary"
              href="#"
            >
              Download{' '}
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
        <div class="row" style="margin-top: 0 !important;">
          <div class="four columns">
            <button
              onClick={() => this.shareViaTwitter()}
              class="button-primary"
            >
              Share  &nbsp;&nbsp;
              <i class="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </i>
            </button>
          </div>
          <div class="four columns">
            <a class="button button-primary" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ogh.am">
              Share &nbsp;&nbsp;
              <i class="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </i>
            </a>
          </div>
          <div class="four columns">
            <button class="button-primary" onClick={() => this.shareViaLinkedIn()}>
              Share  &nbsp;&nbsp;
              <i class="svg-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
