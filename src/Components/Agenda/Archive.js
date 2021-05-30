import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import "./Archive.css";

function Archive(props) {
    return (
        <div className="archive-container">
            <div className="archive-title">Examination timetable <span>{props.currentUniversityYear}</span></div>
            <div><Button color="primary" component={Link} to="/List"> See more </Button>
            from archive</div>
        </div>
    )
}

export default Archive;