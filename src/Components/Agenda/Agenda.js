import React, { Component } from 'react';
import Filters from './Filters';
import ExamsGrid from './ExamsGrid';
import Archive from "./Archive";
import { connect } from 'react-redux';
import Logout from '../Logout/Logout';

class Agenda extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allData: this.props.data,
      filteredData: this.props.data.filter(item => item.anUniversitar === this.currentUniversityYear())
    }
  }

  search(exam) {
    return Object.keys(this).every((key) => exam[key] === this[key]);
  }

  applyFilters = (filter) => {
    this.setState({
      filteredData: [...this.state.allData.filter(this.search, filter)]
    });
  }

  currentUniversityYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let currentUniversityYear = "";
    if (currentMonth > 9) {
      currentUniversityYear = `${currentYear}-${currentYear + 1}`;

    } else {
      currentUniversityYear = `${currentYear - 1}-${currentYear}`;
    }
    return currentUniversityYear;
  }

  render() {
    return (
      <div>
        <Logout></Logout>
        <Archive currentUniversityYear={this.currentUniversityYear()}></Archive>
        <Filters applyFilters={this.applyFilters}></Filters>
        <ExamsGrid data={this.state.filteredData}></ExamsGrid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.exams,
  };
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Agenda);