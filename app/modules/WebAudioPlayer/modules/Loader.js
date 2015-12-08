import React from 'react';

export class Loader extends React.Component {

    constructor(props) {

        super(props);
    }

    handleClick(evt) {
        let url = '/sample.mp3';
        let request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
        
            this.props.audioContext.decodeAudioData(request.response, function(buffer) {

                this.props.updateAudioBuffer(buffer);

            }.bind(this), function(err) {
                console.log(err);
            });
        }.bind(this);

        request.send();
    }

    render() {

        return (
                <div>
                    <p>
                    <button onClick={this.handleClick.bind(this)}>Load</button>
                    </p>
                </div>
               );
    }
}

Loader.defaultProps = {

    audioContext: null,
    audioBuffer: null,
    updateAudioBuffer: null
};
