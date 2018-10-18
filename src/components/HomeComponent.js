import React from 'react';

export default (props) => {
    return (
        <div className='container'>
            <div style={{ textAlign: 'center' }}>
                <h1>OpenLattice React App</h1>
                <h4>Select one of the tabs to view OpenLattice data.</h4>
                <p>Namespaces: Exploration of the EDM by namespace.<br />Click an Entity/Property Type to see more details about it.</p>
                <p>Graphs: Graphs representing the data in the EDM.</p>
            </div>
        </div>
    )
}