import React from 'react';



import Iframe from 'react-iframe'




const Map = () => {
    return (
        <div>

<Iframe url="https://player.twitch.tv/?channel=flitzmo&parent=localhost"
        width="1080" 
        height="720px"
        id="stream"
        className="streamClass"
        parent="localhost" />

        </div>

    )
}

export default Map