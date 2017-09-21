import React from 'react'
import { Link } from 'react-router-dom'
import EventA from '../components/Event'
import { gql, graphql, withApollo} from 'react-apollo'
import {Alert} from 'react-bootstrap'
const md5 = require('js-md5');

const userQuery = gql`
  query userQuery($username: String!, $password: String!) {
    allUsers (filter: {
        username: $username
        password: $password
    }){
        id
    }
  }
`


class ListPage extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userId: '',
            logged: false,
            error: ''
        }
    }
    

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.data.refetch()
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>
           <img src="http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif"/>
          </div>
        </div>
      )
    }

    let blurClass = ''

    if (this.props.location.pathname !== '/') {
      blurClass = ' blur'
    }

    return (<div >
    {!this.state.logged &&
       <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({username: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />
          {this.state.error &&
          <Alert bsStyle="danger">{this.state.error}</Alert>}
          {this.state.username && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={() => this._signinUser()}>Log in</button>
          }

        </div>
      </div>
    }
     {this.state.userId &&
      
      <div className={'w-100 flex justify-center pa6' + blurClass}>
       <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={() => this._logOut()}>Log out</button>
        <div className='w-100 flex flex-wrap' style={{maxWidth: 1150}}>
          <Link
           to={`/create/${this.state.userId}`}
            className='ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline'
          >
            <img
              src={require('../assets/plus.svg')}
              alt=''
              className='plus mb3'
            />
            <div>New Event</div>
          </Link>
          {this.props.data.allEvents && this.props.data.allEvents.map(eventa => (
            <EventA
              key={eventa.id}
              eventa={eventa}
              userId={this.state.userId}
              refresh={() => this.props.data.refetch()}
            />
          ))}
        </div>
        {this.props.children}
      </div>
   }
      </div>
  
    )
  }

_logOut = async () => {
  this.setState({
       logged: false,
       username: '',
       password: '',
       userId: ''
     })
}
    _signinUser = async () => {

    const {username,password} = this.state
     const result = await this.props.client.query({
        query: userQuery,
        variables: { username, password }
     })
     if(result.data.allUsers.length > 0) {
        this.setState({userId: result.data.allUsers[0].id});
        if(this.state.userId) {
          this.setState({
            logged: true,
            username: '',
            password: ''
          })
        }
      }
      else {
        this.setState({
          error: "Wrong userName and/or password"
        })
      }
    }
}

const FeedQuery = gql`query {
  allEvents {
    id
    title
    listAttends
    description
    capacity
    eventImage
    organizer {
      username
      firstName
      lastName
    }
  }
}`



const ListPageWithData = graphql(FeedQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(ListPage)

export default withApollo(ListPageWithData)
