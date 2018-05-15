import { h, Component } from 'preact';
import { AppState } from './state';

interface PopupPros {
  state: AppState;
}

interface PopupState {
  message?: string
}

export class Popup extends Component<PopupPros, PopupState> {
  private timer: NodeJS.Timer

  constructor(props: PopupPros) {
    super(props);

    this.props.state.on('popup', (message: string) => {
      clearTimeout(this.timer)

      this.setState({ message })

      this.timer = setTimeout(() => {
        this.setState({ message: '' })
      }, 3000)
    })
  }

  render(props: PopupPros, state: PopupState) {
    let content

    if (this.state.message) {
      content = (
        // "key" foces preact to render a new element thus reseting the
        // CSS animation timer as well as the timer of this component
        <div class="content" key={this.state.message}>
          <p>{this.state.message}</p>
        </div>
      )
    }

    return (
      <div class='popup'>
        {content}
      </div>
    );
  }
}
