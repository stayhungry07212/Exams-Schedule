import React, { Component } from "react";
import "./Item.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/action-exams';
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import { thisExpression } from "@babel/types";

class Item extends Component {
  state = {
    disabled: true,
    currentExam: {},
  }

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.id = this.props.match.params.id;
  }

  handleInputChange(event) {
    this.setState({
      currentExam: {
        ...this.state.currentExam,
        [event.target.name]: event.target.value
      }
    }, () => {
      let count = 0;
      if (Object.keys(this.state.currentExam).length == 7) {
        Object.keys(this.state.currentExam).forEach(() => {
          count++;
        });
        if (count == 7) {
          this.setState({ disabled: false });
        }
      }
    });

  }

  componentDidMount() {
    if (this.props.exms) {
      this.setState({
        currentExam: this.props.exms
      })
    }
  }

  saveNewItem = () => {
    this.setState({
      disabled: true
    });
    this.props.onAddNewExam(this.state.currentExam);
  }

  saveItem = () => {
    this.props.onUpdateExam(this.state.currentExam);
  }

  removeItem = () => {
    this.props.onRemoveExam(this.state.currentExam.id, this.removeCallback);
  }

  removeCallback = (response) => {
    console.log(response);
  }
  render() {
    let exam = this.props.exms;
    if (this.props.exms || this.id === 'new') {
      return (
        <form className="exams-form" noValidate autoComplete="off">
          <InputLabel>Select academic year</InputLabel>
          <Select
            defaultValue={exam ? exam.anUniversitar : ""}
            onChange={this.handleInputChange}
            name="anUniversitar"
            required
          >
            <MenuItem value="2017-2018">2017-2018</MenuItem>
            <MenuItem value="2018-2019">2018-2019</MenuItem>
            <MenuItem value="2019-2020">2019-2020</MenuItem>
          </Select>

          <InputLabel>Select exams period</InputLabel>
          <Select
            defaultValue={exam ? exam.sesiune : ""}
            onChange={this.handleInputChange}
            name="sesiune"
            required
          >
            <MenuItem value="summer">Summer</MenuItem>
            <MenuItem value="winter">Winter</MenuItem>
          </Select>

          <InputLabel>Year of study</InputLabel>
          <Select
            defaultValue={exam ? exam.anStudiu : ""}
            onChange={this.handleInputChange}
            name="anStudiu"
            required
          >
            <MenuItem value="I">I</MenuItem>
            <MenuItem value="II">II</MenuItem>
            <MenuItem value="III">III</MenuItem>
          </Select>

          <TextField
            label="Field of study"
            onChange={this.handleInputChange}
            name="sectie"
            defaultValue={exam ? exam.sectie : ""}
            required
          />
          <TextField
            label="Subject"
            name="materie"
            onChange={this.handleInputChange}
            defaultValue={exam ? exam.materie : ""}
            required
          />

          <TextField
            label="Number of students"
            type="number"
            name="nrLocuri"
            onChange={this.handleInputChange}
            defaultValue={exam ? exam.nrLocuri : ""}
            required
          />

          <TextField
            label="Teacher"
            name="profesor"
            onChange={this.handleInputChange}
            defaultValue={exam ? exam.profesor : ""}
            required
          />

          <TextField
            type="date"
            name="dataExamen"
            onChange={this.handleInputChange}
            defaultValue={exam ? exam.dataExamen : ""}
          />

          {this.id === "new" && (
            <Button color="primary" disabled={this.state.disabled} onClick={this.saveNewItem}>
              Save new item
          </Button>
          )}
          {this.id !== "new" && (
            <div>
              <Button color="primary" onClick={this.saveItem}>
                Save item
            </Button>
              <Button color="primary" onClick={this.removeItem} component={Link} to="/List">
                Remove item
            </Button>
            </div>
          )}
        </form>
      )
    } else {
      return (
        <Spinner></Spinner>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    exms: state.exams.find(item => item.id === ownProps.match.params.id),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateExam: (currentExam) => dispatch(actions.updateExam(currentExam)),
    onRemoveExam: (currentExamId, removeCallback) => dispatch(actions.removeExam(currentExamId, removeCallback)),
    onAddNewExam: (newExam) => dispatch(actions.addExam(newExam))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
