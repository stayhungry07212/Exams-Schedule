import React, { Component } from "react";
import "./ExamsGrid.css";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class ExamsGrid extends Component {
    render() {
        return (
            <div className="grid-container">
                <GridList cellHeight={300}>
                    {this.props.data.map((item) => (
                        <GridListTile className="exams-grid" key={item.id}>
                            <div className="exams-grid-dataExamen">
                            {new Date(item.dataExamen).toLocaleString('default',{month: 'long', day: 'numeric', year: 'numeric'})}
                            </div>
                            <div className="exams-grid-materie">{item.materie}</div>
                            <div className="exams-grid-text">exam</div>
                            <GridListTileBar
                                title={<span>Teacher: {item.profesor}</span>}
                                subtitle={<span>Year: {item.anStudiu}, {item.sectie}</span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default ExamsGrid;