import { useState, useEffect } from 'react'
import Filter from '../Filter/Filter';
import axios from 'axios';
import Moment from 'react-moment';
import TextField from '@mui/material/TextField';
import { Button, Grid, MenuItem, FormControl, Select, Typography, Box, Container } from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const containerStyle = {
    width: '100%',
    height: 775
};

const center = {
    lat: 53.488232,
    lng: -2.265152
};


export default function Map() {
    const [markers, setMarkers] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [title, setTitle] = useState(null);
    const [contact, setContact] = useState(null);
    const [desc, setDesc] = useState(null);
    const [date, setDate] = useState(null);
    const [etype, setEType] = useState(null);
    const [type, setType] = useState()
    const [filteredMarkers, setFilteredMarkers] = useState();

    const testFunction = (e) => {
        const filteredMarker = markers.filter(marker => marker.etype === e.target.value);
        setFilteredMarkers(filteredMarker);
        setType(e.target.value);
    }


    // console.log(markers);
    // console.log(type);
    // markers.filter(marker =>  marker.etype === type).map(filteredMarkers => ( 
    //     <>
    //     <Marker
    //     position={{
    //         lat: filteredMarkers.lat, 
    //         lng: filteredMarkers.lng
    //         }}>
    //         </Marker>
    //     </>
    // ))

    //     console.log(filteredMarkers);

    const currentDate = new Date();
    let formatDate = currentDate.toISOString();


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB4IjXzrj-ZRnmBgoRLd0j0M4SofIl8DRM"
    })

    useEffect(() => {
        const getMarkers = async () => {
            try {
                const res = await axios.get('/events');
                setMarkers(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMarkers()
    }, []);

    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id);
    }

    const handleAddMarker = (e) => {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        setNewPlace({
            lat: lat,
            lng: lng
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newMarker = {
            title,
            etype,
            contact,
            desc,
            date,
            lat: newPlace.lat,
            lng: newPlace.lng
        }

        try {
            const res = await axios.post('/events', newMarker)
            setMarkers([...markers, res.data])
            setNewPlace(null);
        } catch (err) {
            console.log(err)
        }
    }


    return isLoaded ? (
        <Grid container style={{ width: '100%', height: '100%' }}>
            <Grid item xs={12} md={10} >
                <>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onDblClick={(e) => handleAddMarker(e)}
                    >
                        {console.log(filteredMarkers)}

                        {markers.map((marker) => (
                            <>
                                {formatDate > marker.date ? (
                                    null
                                ) :
                                    <Marker
                                        position={{ lat: marker.lat, lng: marker.lng }}
                                        onClick={() => handleMarkerClick(marker._id)}
                                        onChange={(e) => setFilteredMarkers(e.target.value)}

                                    />}

                                {marker._id === currentPlaceId && (
                                    <InfoWindow
                                        options={{ maxWidth: '250' }}
                                        position={{ lat: marker.lat, lng: marker.lng }}
                                        onClose={() => setCurrentPlaceId(null)}>
                                        <div>
                                            <h4>Event</h4>
                                            <p>{marker.title}</p>
                                            <h4>Type</h4>
                                            <p>{marker.etype}</p>
                                            <h4>Date and Time</h4>
                                            <p><Moment format='DD/MM/YYYY HH:mm'>{marker.date}</Moment></p>
                                            <h4>More Info</h4>
                                            <p>{marker.desc}</p>
                                            <h4>Contact Info</h4>
                                            <p>{marker.contact}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </>
                        ))}
                        {newPlace && (
                            <InfoWindow
                                position={{ lat: newPlace.lat, lng: newPlace.lng }}
                                onClose={() => setCurrentPlaceId(null)}>
                                <form onSubmit={handleSubmit}
                                    style={{ display: "flex", flexDirection: "column" }}>
                                    <TextField
                                        sx={{ marginBottom: '10px' }}
                                        onChange={(e) => setTitle(e.target.value)}
                                        id="outlined-size-small"
                                        placeholder="Event"
                                        size="small"
                                    />
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        placeholder='Type of Event'
                                        value={etype}
                                        onChange={(e) => setEType(e.target.value)}
                                    >
                                        <MenuItem value='Art'>Art</MenuItem>
                                        <MenuItem value='Activities'>Activities</MenuItem>
                                        <MenuItem value='Sport'>Sport</MenuItem>
                                        <MenuItem value='Music'>Music</MenuItem>
                                        <MenuItem value='Wellbeing'>Wellbeing</MenuItem>
                                        <MenuItem value='Family Friendly'>Family Friendly</MenuItem>
                                    </TextField>
                                    <TextField
                                        onChange={(e) => setDate(e.target.value)}
                                        id="datetime-local"
                                        type="datetime-local"
                                        placeholder="2022-05-24T10:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextareaAutosize
                                        onChange={(e) => setDesc(e.target.value)}
                                        aria-label="empty textarea"
                                        placeholder="Please tell us more about this event..."
                                        style={{ height: 100, marginBottom: '5px', fontFamily: 'inherit' }}
                                    />
                                    <TextField
                                        onChange={(e) => setContact(e.target.value)}
                                        id="outlined-size-small"
                                        placeholder="Contact Info"
                                        size="small"
                                    />
                                    <Button type="submit" sx={{ margin: '10px', color: 'teal', ':hover': { bgcolor: '#80cbc4', color: 'white' } }}>Add new Event</Button>
                                </form>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </>
            </Grid>
            <Grid item xs={12} md={2} sx={{ alignItems: 'center' }}>
                <Container component="main"
                    sx={{ border: '5px solid teal', height: '100%', }} >
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{
                            textAlign: 'center', marginBottom: '10px',
                            color: 'black'
                        }}>
                            Find Events Suited to Your interests
                        </Typography>
                        <FormControl>
                            <Select
                                sx={{ marginTop: "10px" }}
                                defaultValue=''
                                value={type ?? ''}
                                onChange={(e) => testFunction(e)}>
                                <MenuItem value='Art'>Art</MenuItem>
                                <MenuItem value='Activities'>Activities</MenuItem>
                                <MenuItem value='Sport'>Sport</MenuItem>
                                <MenuItem value='Music'>Music</MenuItem>
                                <MenuItem value='Wellbeing'>Wellbeing</MenuItem>
                                <MenuItem value='Family Friendly'>Family Friendly</MenuItem>
                            </Select>
                            <Grid>
                                <Filter
                                    markers={markers}
                                    type={type}
                                    setType={setType}
                                    formatDate={formatDate}
                                    filter={filteredMarkers} />
                            </Grid>
                        </FormControl>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    ) : <>
        <h1>Failed to load</h1>
    </>
}
