import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';

class SelectWidget extends Component {
  
  validationText = {
    category: '',
    subCategory: ''
  }

  constructor() {
    super();

    // components local state
    this.state = {
      category: '',
      subCategory: '',
      categoryValidationText: '',
      subCategoryValidationText: '',
    }
    this.form = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  // on change any of the select field, updating state by the select field's id
  onChange(event) {
    const targetId = event.target.id;
    const value = event.target.value;
    this.setState({[targetId]: value});
    this.setState({[`${targetId}ValidationText`]: ''});

    if (targetId === 'category') {
      this.props.onSelectCategory(value);
    }
    
  }

  // on submit event
  handleSubmit(event) {
    event.preventDefault();
    if (this.checkValidity()) {
      this.props.onHandleSubmit(this.state);
    }
    
  }

  // check validity of the form
  checkValidity() {
    if (!this.state.category) {
      this.setState({categoryValidationText: 'This field is required'});
      return false;
    }

    if (!this.state.subCategory) {
      this.setState({subCategoryValidationText: 'This field is required'});
      return false;
    }
    this.setState({categoryValidationText: ''});
    this.setState({subCategoryValidationText: ''});
    return true;
  }

  render() {
    return (
      <Form className="SelectWidget" onSubmit={this.handleSubmit}> 
        <Row>
          <Col>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input defaultValue={'DEFAULT'} 
                type="select" 
                name="category" 
                id="category"
                onChange={this.onChange}
                required>
                  <option value="DEFAULT" disabled>Select Category</option>
                  { this.props.categories.map((category, index) => <option key={`cat-${index}`}>{ category }</option>) }
              </Input>
            </FormGroup>
            <p className="error-msg">{ this.state.categoryValidationText }</p>
          </Col>

          <Col>
            <FormGroup>
              <Label for="subCategory">Sub-Category</Label>
              <Input defaultValue={'DEFAULT'} 
                  type="select" 
                  name="subCategory" 
                  id="subCategory" 
                  onChange={this.onChange}
                  disabled={!this.props.subCategories.length}
                  required>
                    <option value="DEFAULT" disabled>Select Sub-Category</option>
                    { this.props.subCategories.map((subCategory, index) => <option key={`subcat-${index}`}>{ subCategory }</option>) }
                </Input>
            </FormGroup>  
            <p className="error-msg">{ this.state.subCategoryValidationText }</p>  
          </Col>
        </Row>
        

        <Button type="submit" color="success">Submit</Button>
      </Form>
    )
  }
}

export default SelectWidget;
