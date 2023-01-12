import GoogleMapReact from 'google-map-react'
import { useState } from 'react'

const AnyReactComponent = ({ text }) => <div>🛒{text}</div>;

export function AboutUs() {

    const [coordinates, setCoordinates] = useState({ lat: 31.85316500, lng: 34.84242200 })
    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (
        <section className='about-us'>
            <div style={{ height: '65vh', width: '80%', margin: 'auto' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDXaNvMCqlwqiat6a6gL7A0mN-z93Tojdk" }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}
                    onClick={handleClick}
                >
                    <AnyReactComponent
                        lat={31.85316500}
                        lng={34.84242200}
                        text="Our Shop"
                    />
                    <AnyReactComponent
                        lat={32.0853}
                        lng={34.7818}
                        text="Our Shop"
                    />
                    <AnyReactComponent
                        lat={31.55316500}
                        lng={34.96262200}
                        text="Our Shop"
                    />
                </GoogleMapReact>
            </div>
            <div className='loc-btns'>
            <button onClick={() => handleClick({ lat: 32.0853, lng: 34.7818 })}>Tel-Aviv</button>
            <button onClick={() => handleClick({ lat: 31.85316500, lng: 34.84242200 })}>Mazkeret-batyia</button>
            <button onClick={() => handleClick({ lat: 31.55316500, lng: 34.96262200 })}>soba</button></div>
        </section>
    )
}