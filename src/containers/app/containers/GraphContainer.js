/*
* @flow
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, List, getIn } from 'immutable';
import ReactEcharts from "echarts-for-react";

const option = {
    backgroundColor: '#2c343c',
    title: {
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
                normal: {
                    formatter: "{b}: {c}",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};

class GraphContainer extends Component {

    namespacesByEntities() {
        let tempOption = JSON.parse(JSON.stringify(option)); //deep copy option
        tempOption.title.text = "Namespaces by # Entries";
        tempOption.series[0].data = this.props.namespaces.slice(0, 10).map((namespace) => {
            return {
                value: this.props.entityTypes[namespace] ? this.props.entityTypes[namespace].length : 0,
                name: namespace
            }
        })
        return <ReactEcharts option={tempOption} style={{height: '300px', width: '500px', margin: 'auto'}}/>
    }

    namespacesByProperties() {
        let tempOption = JSON.parse(JSON.stringify(option)); //deep copy option
        tempOption.title.text = "Namespaces by # Properties";
        let namespaces = this.props.namespaces.sort((ns1, ns2) => {
            let pt1 = this.props.entityTypes[ns1] ? this.props.entityTypes[ns1].length : 0;
            let pt2 = this.props.entityTypes[ns2] ? this.props.entityTypes[ns2].length : 0;
            return pt2 - pt1;
        });
        tempOption.series[0].data = namespaces.slice(0, 10).map((namespace) => {
            return {
                value: this.props.propertyTypes[namespace] ? this.props.propertyTypes[namespace].length : 0,
                name: namespace
            }
        })
        return <ReactEcharts option={tempOption} style={{height: '300px', width: '500px', margin: 'auto'}}/>
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                {this.namespacesByEntities()}
                {this.namespacesByProperties()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        propertyTypes: state.getIn(['app', 'propertyTypes'], Map()),
        rawPropertyTypes: state.getIn(['app', 'rawPropertyTypes'], List()),
        entityTypes: state.getIn(['app', 'entityTypes'], Map()),
        rawEntityTypes: state.getIn(['app', 'rawEntityTypes'], List()),
        namespaces: state.getIn(['app', 'namespaces'], Map())
    };
}

export default connect(mapStateToProps)(GraphContainer);