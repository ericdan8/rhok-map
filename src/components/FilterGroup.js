import React from 'react';
import { Navbar, NavItem, Row, Col, Container, Input, Icon } from 'react-materialize'

class FilterGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.controls.forEach((item) => {
      this.state[item] = true;
    });
    this.onChange = this.onChange.bind(this);
    this.buildToggle = this.buildToggle.bind(this);
    this.getFilterState = this.getFilterState.bind(this);
  }
  onChange(event) {
    this.setState(
    {
      [event.target.name]: !this.state[event.target.name]
    }, 
    () => this.props.onChange({
      filterGroup: this.props.name,
      state: this.state}));
  }
  buildToggle(item) {
    return <Input
      name={item}
      type='checkbox'
      label={item}
      defaultChecked='checked'
      onChange={this.onChange}
    />
  }
  getFilterState() {
    return this.state;
  }
  render() {
    const controls = this.props.controls;
    return(
      <Col {...this.props}>
        {controls.map(this.buildToggle)}
      </Col>
    )
  }
}

export default FilterGroup;