import React, { Component } from 'react';
import './App.css';
import SelectWidget from './components/selet.widget';
import UrlList  from './components/list';
import AppService from './service/AppService';

class App extends Component {
  service = new AppService();

  constructor() {
    super();
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

  componentDidMount() {
    this.setState({categories: this.service.getCategories()});
  }

  onCategorySelect(category) {
    this.setState({subCategories: this.service.getSubCategories(category)});
  }

  onFormSubmit(formData) {
    const { category, subCategory } = formData;
    const startElement = 0;

    this.setState({category, subCategory, startElement}, () => {
      const urls = this.service.getUrls(this.state.category, this.state.subCategory, this.state.startElement);

      this.setState({urls});
    });
  }

  showUrlList() {
    if (this.state.urls.length) {
      return (
        <div>
          <UrlList urls={ this.state.urls }
            startElement = { this.state.startElement }
            onHandleScrollEnd={ this.onScrollEnd } />
        </div>
      )
    }
  }

  onScrollEnd() {
    let { startElement } = this.state;
    startElement += 10;
    this.setState({startElement}, () => {
      console.log(this.state);
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
