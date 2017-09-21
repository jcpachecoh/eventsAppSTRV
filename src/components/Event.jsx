import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

class EventA extends React.Component {

  render() {
    return (
      <Link
        className='bg-white ma3 box post flex flex-column no-underline br2'
        to={`/eventa/${this.props.eventa.id}/${this.props.userId}`}
      >
        <div
          className='image'
          style={{
            backgroundImage: `url(${this.props.eventa.eventImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingBottom: '100%',
          }}
        />
        <div className='flex items-center black-80 fw3 description'>
          {this.props.eventa.title}
        </div>
      
      </Link>
    )
  }
  //<span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>

  // not currently used.
  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.eventa.id}})
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

const EventWithMutation = graphql(deleteMutation)(EventA)

export default EventWithMutation
