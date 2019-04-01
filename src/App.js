import React, { Component } from 'react';
import './App.css';
import SelectWidget from './components/selet.widget';
import UrlList  from './components/list';
import AppService from './service/AppService';

class App extends Component {
  listLength = 0;

  service = new AppService();

  constructor() {
    super();

    // component's local state
    this.state = {
      categories: [],
      subCategories: [],
      urls: [],
      startElement: 0,
      category: '',
      subCategory: ''
    }

    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.showUrlList = this.showUrlList.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
  }

  // initiazing category state
  componentDidMount() {
    this.setState({categories: this.service.getCategories()});
  }

  // on selecting category
  onCategorySelect(category) {
    this.setState({subCategories: this.service.getSubCategories(category)});
  }

  // onFormSubmit updating local state, getting new data and then againg updting local state
  onFormSubmit(formData) {
    const { category, subCategory } = formData;
    const startElement = 0;

    this.setState({category, subCategory, startElement}, () => {
      const urls = this.service.getUrls(this.state.category, this.state.subCategory, this.state.startElement);
      this.listLength = this.service.getUrlsLength(this.state.category, this.state.subCategory);

      this.setState({urls});
    });
  }

  // showing urlList if the state urls is not empty
  showUrlList() {
    if (this.state.urls.length) {
      return (
        <div>
          <UrlList urls={ this.state.urls }
            startElement = { this.state.startElement }
            listLength = { this.listLength }
            onHandleScrollEnd={ this.onScrollEnd } />
        </div>
      )
    }
  }

  // getting more data on scroll end
  onScrollEnd() {
    let { startElement } = this.state;
    startElement += 10;
    this.setState({startElement}, () => {
      const urls = this.service.getUrls(this.state.category, this.state.subCategory, this.state.startElement);
      this.setState({urls});
    })
    
  }

  render() {
    return (
      <div className="App">
        <h3>Load Impact Test App</h3>
        <SelectWidget
          categories={ this.state.categories } 
          subCategories={ this.state.subCategories }
          onSelectCategory={ this.onCategorySelect }
          onHandleSubmit={ this.onFormSubmit } />

        { this.showUrlList() }
        
      </div>
    );
  }
}

export default App;
