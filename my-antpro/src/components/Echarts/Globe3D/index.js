import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts';
// 引入3D
import 'echarts-gl';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Globe3D extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main5'));
        // 绘制图表
        myChart.setOption({
            backgroundColor: '#000',
            globe: {
                baseTexture: 'data-gl/asset/earth.jpg',
                heightTexture: 'data-gl/asset/bathymetry_bw_composite_4k.jpg',
        
                displacementScale: 0.1,
        
                shading: 'lambert',
        
                environment: 'data-gl/asset/starfield.jpg',
        
                light: {
                    ambient: {
                        intensity: 0.1
                    },
                    main: {
                        intensity: 1.5
                    }
                },
        
                layers: [{
                    type: 'blend',
                    blendTo: 'emission',
                    texture: 'data-gl/asset/night.jpg'
                }, {
                    type: 'overlay',
                    texture: 'data-gl/asset/clouds.png',
                    shading: 'lambert',
                    distance: 5
                }]
            },
            series: []
        
        });
    }
    render() {
        return (
            <div id="main5" style={{ width: 400, height: 400}}>123</div>
        );
    }
}

export default Globe3D;

