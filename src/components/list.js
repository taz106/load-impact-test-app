import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class UrlList extends Component {
  constructor() {
    super();

    this.state = {
      urls: [],
      active: []
    }

    this.onListItemClick = this.onListItemClick.bind(this);
    this.getItemActiveState = this.getItemActiveState.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.isBottom = this.isBottom.bind(this);
  }

  componentDidMount() {
    this.setState({ active: new Array(this.props.urls.length).fill(false), urls: this.props.urls });

    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps() {
    console.log(this.props);
    const active = new Array(this.props.urls.length).fill(false);
    console.log(this.props.startElement);
    if (this.props.startElement > 0)  {
      this.setState(prevState => ({urls: [...prevState.urls, ...this.props.urls], active: [...prevState.active, ...active]}));
    } else {
      this.setState({urls: this.props.urls, active});
    }
    
  }

  onListItemClick(event, index) {
    console.log(this.state.active[index]);
    let active = this.state.active;
    active[index] = !active[index];
    this.setState({ active })
  }

  getItemActiveState(index) {
    console.log(this.state.active[index]);
    return this.state.active[index];
  }

  handleScroll() {
    const listElement = document.getElementById('urlList')
    if (this.isBottom(listElement)) {
      this.props.onHandleScrollEnd();
    }
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    return (
      <div id="urlList">
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
