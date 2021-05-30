import React from 'react';
import './Background.css';

function Background() {
    return (
        <div>
            <div className="waveWrapper waveAnimation">
                <div className="waveWrapperInner bgTop">
                    <div className="wave waveTop" style={{ backgroundImage: "url(http://front-end-noobs.com/jecko/img/wave-top.png)" }}></div>
                </div>
                <div className="waveWrapperInner bgMiddle">
                    <div className="wave waveMiddle" style={{ backgroundImage: "url(http://front-end-noobs.com/jecko/img/wave-mid.png)" }}></div>
                </div>
                <div className="waveWrapperInner bgBottom">
                    <div className="wave waveBottom" style={{ backgroundImage: "url(http://front-end-noobs.com/jecko/img/wave-bot.png)" }}></div>
                </div>
            </div>
        </div>
    );
}

export default Background;