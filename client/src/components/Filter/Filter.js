import {Grid} from '@mui/material';

function Filter({markers, filter, type, setType, formatDate}) {

    return (
        <>
        {/* {filter && filter.length > 0 && (
            filter.map((bleh) => {
                console.log(bleh)
            })
        )} */}
            {markers?.map((event) => {
                if (type === event.etype && (formatDate < event.date))
                    return (
                        <Grid item xs={12}>
                            <h3>{event.title}</h3>
                        </Grid>
                    )
            }
            )}
        </>
    )
}

export default Filter;