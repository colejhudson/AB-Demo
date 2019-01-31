import React from 'react';
import { confetti } from 'dom-confetti';

class GoogleAnalytics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.trackingId = props.trackingId;
  }

  componentDidMount() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)}
    gtag('js', new Date());

    gtag('config', this.state.trackingId);
  }
  
  render() {
    return <script async src={`https://www.googletagmanager.com/gtag/js?id=${this.state.trackingId}`}></script>; 
  }
}

const VerticalCenter = props => (
  <div id='vertical-center'>
    {props.children}
    <style>{`
      #vertical-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `}</style>
  </div>
)

const HorizontalCenter = props => (
  <div id='horizontal-center'>
    {props.children}
    <style>{`
      #horizontal-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    `}</style>
  </div>
)

class Button extends React.Component {
  constructor(props) {
    super(props);

    let { children, ...attributes } = props;

    this.state = {};
    this.ref = React.createRef();
    this.state.attributes = attributes;
    this.state.children = children;
  
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    confetti(this.ref.current, { startVelocity: 20, spread: 60 });
    ga('send', 'event', 'AwesomeButton', 'Click');
  }

  render() {
    return (
      <div>
        <button ref={this.ref} onClick={this.onClick} id='awesome-button' {...this.state.attributes}>{this.state.children}</button>

        <style jsx>{`
          #awesome-button {
            font-family: 'Source Sans Pro', sans-serif;
            text-align: center;
            font-weight: 700;
            color: rgb(246, 246, 246);
            outline: currentcolor none medium;
            cursor: pointer;
            transition: background-color 0.2s ease 0s, color 0.2s ease 0s, border-color 0.2s ease 0s, opacity 0.2s ease 0s;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 12px 0px;
            white-space: nowrap;
            border-radius: 4px;
            border: 1px solid transparent;
            padding: 8px 18px 8px;
            background-color: rgb(114, 86, 228); 
          }

          #awesome-button:hover {
            color: rgb(36, 31, 31);
            background-color: rgb(252, 212, 74); 
          }

          #awesome-button:active {
            background-color: rgb(252, 226, 136);
          }
        `}</style>
      </div>
    );
  }
}

export default () => 
  <div>
    <p id='call-to-action'>Dearest Sir or Madame, Please Click This Button</p>
    <HorizontalCenter>
      <Button>Click Me Dawg</Button>
    </HorizontalCenter>

    <GoogleAnalytics trackingId='UA-133576846-1' />

    <link async href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet"></link>
    <style>{`
      html, body, #__next {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      p#call-to-action {
				line-height: 1;
    		font-family: 'Playfair Display', serif;
				font-weight: bold; 
      }
    `}</style>
  </div>
