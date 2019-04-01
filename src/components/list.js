import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class UrlList extends Component {
  constructor() {
    super();

    // the state urls to view in the list, the active to keep tract which list items are being clicked
    this.state = {
      urls: [],
      active: []
    }

    this.onListItemClick = this.onListItemClick.bind(this);
    this.getItemActiveState = this.getItemActiveState.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.isBottom = this.isBottom.bind(this);
  }

  // initializing 'active' state and adding dom scroll event listener
  componentDidMount() {
    this.setState({ active: new Array(this.props.urls.length).fill(false), urls: this.props.urls });

    document.addEventListener('scroll', this.handleScroll)
  }

  // removing dom scroll event 
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  // updating components local state on receiving new props
  componentWillReceiveProps() {
    const active = new Array(this.props.urls.length).fill(false);
    if (this.props.startElement > 0)  {
      this.setState(prevState => ({urls: [...prevState.urls, ...this.props.urls], active: [...prevState.active, ...active]}));
    } else {
      this.setState({urls: this.props.urls, active});
    }
    
  }

  // setting active state to true on click
  onListItemClick(event, index) {
    let active = this.state.active;
    active[index] = !active[index];
    this.setState({ active })
  }

  // getting the list item's active state; true or false
  getItemActiveState(index) {
    return this.state.active[index];
  }

  // scroll method for handling scroll event
  handleScroll() {
    const listElement = document.getElementById('urlList')
    if (this.isBottom(listElement)) {
      this.props.onHandleScrollEnd();
    }
  }

  // checking if the scroll at the bottom of the page
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div id="urlList">
        <p>Click on the List Item to select</p>
        <p>Showing { this.props.startElement + 10 } / { this.props.listLength }</p>
        <ListGroup>
          {
            this.state.urls.map((url, index) => 
              <ListGroupItem className="list-item"
                key={`url-${index}`}
                { ...index }
                active={ this.state.active[index] }
                onClick={ event => this.onListItemClick(event, index) }>
                  { url }
              </ListGroupItem>
            )
          }
        </ListGroup>
      </div>
    )
  }
}

export default UrlList;
