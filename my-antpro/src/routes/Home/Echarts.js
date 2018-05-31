import React, { Component, Fragment } from 'react';
import {
    Diagram,
    Pie_chart,
    Pie_eat,
    Parallel,
    Globe3D
} from 'components/Echarts';

import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
  } from 'antd';


class Echarts extends Component{
      render(){
        return(
            // <Diagram></Diagram> 
            <Fragment>
                <Row gutter={24}>
                    <Col span={8}>
                    <Diagram></Diagram> 
                    </Col>

                    <Col span={16}>
                    <Pie_chart></Pie_chart> 
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={8}>
                    <Pie_eat></Pie_eat>
                    </Col>
                    <Col span={8}>
                 
                    </Col>
                </Row>

                <Row>
                    <Col offset={3}>
                    <Parallel></Parallel>
                    </Col>
                </Row>
               
                <Row>
                    <Col>
                    <Globe3D></Globe3D>
                    </Col>
                </Row>
            </Fragment>
          )
      }
  }

  export default Echarts