import React from 'react'
import { withRouter } from 'react-router-dom'
import { gql, graphql} from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Glyphicon} from 'react-bootstrap'

import 'react-datepicker/dist/react-datepicker.css';

class CreatePage extends React.Component {
  constructor (props) {
    super(props)
       this.handleChange = this.handleChange.bind(this);
     
 
       this.state = {
            description: '',
            title: '',
            eventdate: moment(),
            capacity: 0,
            organizer: '',
            attends: [],
            eventImage: '',
            focused: false,
            organizerId:  this.props.location.pathname.split('/')[2]
          }
  }
 
  handleChange(date) {
    this.setState({
      eventdate: date
    });
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel='Create Event'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div
          className='close fixed right-0 top-0 pointer'
          onClick={this.props.history.goBack}
        >
          <img src={require('../assets/close.svg')} alt='' />
        </div>
        <div className='pa4 flex justify-center bg-white'>
          <div style={{maxWidth: 400}} className=''>
            {this.state.eventImage &&
              <img
                src={this.state.eventImage}
                role='presentation'
                className='w-100 mv3'
              />}
            <Glyphicon glyph="glass" /> Event Title <input
              className='w-100 pa3 mv2'
              value={this.state.title}
              placeholder='Event Name'
              onChange={e => this.setState({title: e.target.value})}
              autoFocus
            />
            <Glyphicon glyph="folder-open" /> Image Event
            <input
              className='w-100 pa3 mv2'
              value={this.state.eventImage}
              placeholder='copy and paste the Image Url'
              onChange={e => this.setState({eventImage: e.target.value})}
              autoFocus
            />
            <div className="item">
            <Glyphicon glyph="list-alt" /> Description 
              <input
                className='w-100 pa3 mv2'
                value={this.state.description}
                placeholder='please fill the event descption'
                onChange={e => this.setState({description: e.target.value})}
              />
            </div>
            
            <Glyphicon glyph="list" /> Event capacity
            
              <input
                className='w-100 pa3 mv2'
                value={this.state.capacity}
                placeholder='Maximum Numbers of person that can attend'
                onChange={e => this.setState({capacity: parseInt(e.target.value) })}
              />
            
            <div className="item">
            <Glyphicon glyph="calendar" /> Event Date
           <DatePicker
             selected={this.state.eventdate}
            onChange={this.handleChange}
    />
            </div>
            

            {
              <button
                className='pa3 bg-black-10 bn dim ttu pointer'
                onClick={this.handleEvent}
              >
                Add Event
              </button>}
          </div>
        </div>
      </Modal>
    )
  }

  handleEvent= async () => {
    const {title, description, eventdate, capacity, eventImage,organizerId} = this.state
    await this.props.addEvent({variables: { title, description, eventdate, capacity, eventImage, organizerId}})

    window.location.pathname = '/'
  }
}

const addMutation = gql`
  mutation addEvent($title: String!, $description: String!,  $eventdate: DateTime!, $capacity: Int!, $eventImage: String!, $organizerId: ID!) { 
  createEvent(title: $title, description: $description, eventdate: $eventdate, capacity: $capacity, eventImage: $eventImage, organizerId: $organizerId) {
    id
    title
    description
    eventdate
    capacity
    eventImage
    organizer {
      id
    }
  }
}
`

const PageWithMutation = graphql(addMutation, {name: 'addEvent'})(CreatePage)

export default withRouter(PageWithMutation)
