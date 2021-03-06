import 'date-fns';
import React from 'react';
import { connect } from "react-redux";
import { Grid, Button, TextField } from '@material-ui/core';
import swal from '@sweetalert/with-react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const EventForm = (props) => {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

  //sets start date
  function handleDateChange(date, event) {
    setSelectedStartDate(date);
    props.dispatch({ type: 'START_EVENT', payload: event });
  }
  //sets end date
  function handleEndDateChange(date, event) {
    setSelectedEndDate(date);
    props.dispatch({ type: 'END_EVENT', payload: event });
  }
  //keeps track of changes in event title text field
  function handleTitleChange(event) {
    props.dispatch({ type: 'EVENT_TITLE', payload: event.target.value })
  }
  //request to add event to database if all fields are filled out
  function handleSubmit(event) {
    event.preventDefault();
    if(props.events.title && props.events.startDate && props.events.endDate 
      && props.events.endDate >= props.events.startDate){
    props.dispatch({ type: 'ADD_EVENT', payload: props.events });
    swal('Thank you for your event!', {icon: 'success'});
    props.history.push('/');
    } else (swal('Please fill out all fields and make sure then end date is after the start date'))
  }

  return (
    <div>{props.errors.eventFormMessage && swal(props.errors.eventFormMessage)}
      <form onSubmit={(event) => handleSubmit(event)}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <TextField value={props.events.title}
              onChange={handleTitleChange} label="Title" variant="filled" margin="normal"
            />

            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={selectedStartDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="End Date"
              format="MM/dd/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <Button type="submit" variant="contained" color="secondary">Submit Event</Button>
          </Grid>
        </MuiPickersUtilsProvider>
      </form> <br /> <br />
      <div className="backBtn">
        <Button onClick={() => props.history.push('/Calendar')} variant="outlined">Back</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  events: state.events.currentEvent
})

export default connect(mapStateToProps)(EventForm);