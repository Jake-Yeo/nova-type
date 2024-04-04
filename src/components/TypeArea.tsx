import { TextField } from '@mui/material';
import * as React from 'react'




export default function TypeArea({ textToType }: { textToType: string}) {
  const [rows, setRows] = React.useState<any[]>([]);
  var timeStart: number = 0;
var timeEnd: number = 0;

  function check(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, textToType: string) {
    var date: Date = new Date;
    if (e.target.value.length == 1) {
      console.log("ran");
      timeStart = date.getTime();
    }
    if (e.target.value == textToType) {
      console.log('Change sentence and end timer');
      // write your functionality here
      timeEnd = date.getTime();
      console.log((timeEnd - timeStart)/1000);
    }
    updateText(e, textToType);
  }
  
  function updateText(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, textToType: string) {
    const updatedRows: any[] = [];
    for (var i = 0; i < textToType.length; i++) {
  
      if (i < e.target.value.length) {
        if (textToType.charAt(i) === e.target.value.charAt(i)) {
          updatedRows.push(<span style ={{color: 'green'}}>{textToType.charAt(i)}</span>);
        } else if ((textToType.charAt(i) != e.target.value.charAt(i))) {
          updatedRows.push(<span style ={{color: 'red'}}>{textToType.charAt(i)}</span>);
        }
      } else {
        updatedRows.push(<span style ={{color: 'white'}}>{textToType.charAt(i)}</span>);
      }
    }
    setRows(updatedRows);
  }

    return (
    <>
    <TextField 
                id="download-text-field" 
                label="Outlined" 
                variant="outlined"
                onChange= {(e) => check(e, textToType)}/>
                <div>{rows}</div></>);
}