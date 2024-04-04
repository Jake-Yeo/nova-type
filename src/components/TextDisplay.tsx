import Typography from '@mui/material/Typography';
import * as React from 'react'

export default function TypeArea({ textToType }: { textToType: string}) {
    
    const rows = [];

    for (let i = 0; i < 1; i++) {
        rows.push(<span style ={{color: 'red'}}>Hello</span>);
    }
    
    return (<>
    <div>{textToType}</div>
    <div>{rows}</div>
    </>);
}