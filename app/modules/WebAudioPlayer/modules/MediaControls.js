import React from 'react';

export class MediaControls extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            playPauseText: 'Play'
        };
    }

    handlePlayPause(e) {

        if (this.state.isPlaying === true) {
            this.props.audioSource.stop(this.props.audioContext.currentTime);
            this.setState({
                isPlaying: false,
                playPauseText: 'Play'
            });
        } else {

            let source = this.props.audioContext.createBufferSource();
            source.buffer = this.props.audioBuffer;
            source.connect(this.props.audioContext.destination);
            source.start(this.props.audioContext.currentTime);

            this.setState({
                isPlaying: true,
                playPauseText: 'Pause'
            });

            this.props.updateAudioSource(source);
        }

    }

    render() {

        return (
                <div>

                    <button onClick={this.handlePlayPause.bind(this)}>{this.state.playPauseText}</button>
                </div>
               );
    }
}

MediaControls.defaultProps = {
    audioContext: {
        createBufferSource: null,
        destination: null,
        currentTime: null
    },
    audioSource: null,
    audioBuffer: null,
    updateAudioSource: null
}
