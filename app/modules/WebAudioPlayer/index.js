import React from 'react';

import {Loader} from './modules/Loader.js';
import {MediaControls} from './modules/MediaControls.js';
import {Waveform} from './modules/Waveform.js';

export class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            audioBuffer: [],
            audioSource: null,
            audioAnalyser: null,
            audioContext: null
        };
    }

    componentDidMount() {

        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        let ctx = new AudioContext();
        let analyser = ctx.createAnalyser();

        this.handleAudioContextUpdate(ctx);
        this.handleAudioAnalyserUpdate(analyser);
    }

    handleAudioContextUpdate(ctx) {
        this.setState({
            audioContext: ctx
        });
    }

    handleAudioAnalyserUpdate(analyser) {

        analyser.fftSize = 2048;

        this.setState({
            audioAnalyser: analyser
        });
    }

    handleAudioSourceUpdate(source) {

        if (this.state.audioAnalyser != null) {
            source.connect(this.state.audioAnalyser);
        }

        this.setState({
            audioSource: source
        });
    }

    handleAudioBufferUpdate(buffer) {

        console.log('DEBUG: update audio buffer');

        this.setState({
            audioBuffer: buffer
        });
    }

    render() {

        return (
                <div>
                    <Loader
                        updateAudioBuffer={this.handleAudioBufferUpdate.bind(this)}
                        audioBuffer={this.state.audioBuffer}
                        audioContext={this.state.audioContext}
                        />
                    <MediaControls
                        updateAudioSource={this.handleAudioSourceUpdate.bind(this)}
                        audioBuffer={this.state.audioBuffer}
                        audioContext={this.state.audioContext}                   
                        audioSource={this.state.audioSource}
                        />
                    <Waveform
                        audioAnalyser={this.state.audioAnalyser}
                        />
                </div>
               );
    }

}
