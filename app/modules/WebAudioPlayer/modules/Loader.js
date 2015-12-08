import React from 'react';

export class Loader extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            url: '',
        };
    }

    handleOnChange(evt) {
        this.setState({

            url: evt.target.value,
        });
    }

    handleClick(evt) {
        let url = this.state.url;
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
                    <input 
                        type="text"
                        value={this.state.url} 
                        onChange={this.handleOnChange.bind(this)} 
                        />
                    <button onClick={this.handleClick.bind(this)}>Load</button>
                </div>
               );
    }
}

Loader.defaultProps = {

    audioContext: null,
    audioBuffer: null,
    updateAudioBuffer: null
};
