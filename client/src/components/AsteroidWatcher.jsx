import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsteroidWatcher = () => {

    const today = new Date();
    const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchAsteroidData().catch(alert);
    }, []);

    const fetchAsteroidData = async (e) => {
        const todayFormatted = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`;
        const nextweekFormatted = `${nextweek.getFullYear()}-${(nextweek.getMonth()+1)}-${nextweek.getDate()}`;
        const nasaApiKey = 'JvSSygkFDqTpXjtS7rkYzFp3XzAsjcwX22DQwc7m';
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${todayFormatted}&end_date=${nextweekFormatted}&api_key=${nasaApiKey}`;

        const response = await axios.get(url);

        setData(response.data.near_earth_objects);
        setIsLoaded(true);
    };

    const parseData = (data) => (Object.keys(data));


    return (
        <div className='asteroid-watcher__wrapper'>
            {isLoaded ? 
                    <div className='asteroid-watcher__content'>
                    <h3 style={{ textAlign: 'center' }}>Asteroids approaching Earth in the next 7 days</h3>
                    {parseData(data)?.map(prop => (
                        <div>
                            <b style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{prop}</b>
                            {data[prop].map(body => (
                                <div style={{ backgroundColor: '#9897c0', borderRadius: '16px', margin: '5%', padding: '5%'}}>
                                    <div>Name of asteroid:<b> {body.name} </b></div>
                                    <div>Potentially hazardous: {body.is_potentially_hazardous_asteroid ? 'yes' : 'no'} </div>
                                    <div>Absolute magnitude: {body.absolute_magnitude_h}</div>
                                    <div>Sentry object: {body.is_entry_object ? 'yes' : 'no'}</div>
                                </div>
                        ))}
                        <br/>
                        </div>
                    ))}
                    </div> 
                :
                <div className='asteroid-watcher__content' style={{ textAlign: 'center', fontSize: 24  }}><em>loading . . .</em></div>
            }
        </div>
    )
}

export default AsteroidWatcher;
