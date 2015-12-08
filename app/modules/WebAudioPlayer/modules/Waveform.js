import React from 'react';
import ReactDOM from 'react-dom';

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


export class Waveform extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            context: null,
            height: 200,
            width: 800
        };
    }

    componentDidMount() {
        let context = ReactDOM.findDOMNode(this).getContext('2d');

        this.setState({
            context: context
        });

        this.drawValue = requestAnimationFrame(this.draw.bind(this));
    }

    componentDidUpdate() {

        this.drawValue = requestAnimationFrame(this.draw.bind(this));
    }

    draw() {

        if (this.state.context == null) {
            return;
        }

        this.state.context.save();

        this.state.context.clearRect(0, 0, this.state.width, this.state.height);

        this.state.context.fillStyle = 'rgb(200,200,200)';
        this.state.context.fillRect(0, 0, this.state.width, this.state.height);

        if (this.props.audioAnalyser == null) {
            console.log('draw:exit early');
            this.state.context.restore();
            return;
        }

        this.state.context.lineWidth = 2;
        this.state.context.strokeStyle = 'rgb(0, 0, 0)';
        this.state.context.beginPath();
        this.state.context.stroke();

        let bufferLength = this.props.audioAnalyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        this.props.audioAnalyser.getByteTimeDomainData(dataArray);

        let sliceWidth = this.state.width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {

            let v = dataArray[i] / 128.0;
            let y = v * this.state.height / 2;

            if (i == 0) {
                this.state.context.moveTo(x,y);
            } else {
                this.state.context.lineTo(x,y);
            }

            x += sliceWidth;
        }

        this.state.context.lineTo(this.state.width, this.state.height/2);
        this.state.context.stroke();

        this.state.context.restore();

        this.drawValue = window.requestAnimationFrame(this.draw.bind(this));

    }

    render() {

        let canvasId = 'audio-canvas-waveform';

        return <canvas
                    id={canvasId}
                    width={this.state.width}
                    height={this.state.height}
                    ></canvas>
    }
}

Waveform.defaultProps = {
    audioAnalyser: null
}
