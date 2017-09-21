import React from 'react'
import { gql, graphql } from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import {withRouter} from 'react-router-dom'
import {Glyphicon} from 'react-bootstrap'

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    height: 661,
  },
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      userId:  this.props.location.pathname.split('/')[3]
    }
  }
  render() {
    if (this.props.data.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/09b24e31234507.564a1d23c07b4.gif"/>
           
          </div>
        </div>
      )
    }

    const {Event} = this.props.data

    return (
      <Modal
        isOpen
        contentLabel='Create Event'
        style={detailModalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div
          className='close fixed right-0 top-0 pointer'
          onClick={this.props.history.goBack}
        >

          <img src={require('../assets/close.svg')} alt='' />
        </div>
        <div
          className='delete ttu white pointer fw6 absolute left-0 top-0 br2'
          onClick={this.handleDelete}
        >
          Delete
        </div>
        <div
          className='bg-white detail flex flex-column no-underline br2 h-100'
        >
        <center><h2>{Event.title}</h2></center>
          <div
            className=''
            style={{
              backgroundImage: `url(${Event.eventImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '600px'
            }}
          />
          </div>
          <div className='eventInfo'>
          
          <ul>
            <li><Glyphicon glyph="list-alt" /> {Event.description}</li>
            <li><Glyphicon glyph="user" /> {Event.organizer.firstName} {Event.organizer.lastName}</li>
            <li><Glyphicon glyph="calendar" /> formatDate({Event.eventdate})</li>

            <li><Glyphicon glyph="list" /> {Event.capacity} persons</li>
  
            <li>{Event.listAttends}</li>
          </ul>
          <center><button onClick={() => this.attendEvent()}>Attend</button></center>
        </div>
      </Modal>
    )
  }
  formatDate(dateData) {
    return new Date(dateData);
  }
  // would be nice to trigger a "deleting... -> deleted." snackbar-style notification
  // while this runs
  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.data.Event.id}})

    // post is gone, so remove it from history stack
    this.props.history.replace('/')
  }
}

const deleteMutation = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

const EventQuery = gql`
  query event($id: ID!) {
  Event(id: $id){
    id
    title
    eventImage
    description
    capacity
    listAttends
    eventdate
    organizer {
      firstName
      lastName
    }
  }
}
`

// update w/ react-router v4 url params api
//
// see documentation on computing query variables from props in wrapper
// http://dev.apollodata.com/react/queries.html#options-from-props
const DetailPageWithData = graphql(EventQuery, {
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(DetailPage)

const DetailPageWithDelete = graphql(deleteMutation)(DetailPageWithData)

export default withRouter(DetailPageWithDelete)
