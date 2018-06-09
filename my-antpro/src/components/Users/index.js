import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Divider, Modal,Input, InputNumber, Popconfirm, Form , Select , Radio, message , DatePicker  } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;  


        //编辑
  const RenderSimpleForm=Form.create()(props=>{
          // const { getFieldDecorator } = this.props.form;
          // const { visible } = props;
          const { handleOk, form, handleCancel,visible } = props;
          return(
            <Modal
            title="编辑用户信息"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
          <Form>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="出生日期">
        {form.getFieldDecorator('number', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<DatePicker />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="性别">
        {form.getFieldDecorator('sex', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<RadioGroup name="radiogroup" initialValue={1}>
        <Radio value={1}>男</Radio>
        <Radio value={2}>女</Radio>
      </RadioGroup>)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="职位">
        {form.getFieldDecorator('position', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Select placeholder="请选择职位" style={{ width: '100%' }}> 
            <Option value="lb">老板</Option>
            <Option value="yg">员工</Option>
            </Select>)} 
      </FormItem>
      
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="权限">
        {form.getFieldDecorator('Jurisdiction', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="是否拉入黑名单">
        {form.getFieldDecorator('Blacklist', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<RadioGroup name="radgroup" initialValue={`y`}>
            <Radio value={`y`}>是</Radio>
            <Radio value={`n`}>否</Radio>
          </RadioGroup>)}
      </FormItem>
      </Form>
    </Modal>
          )
    })
    
  
  // @Form.create()

  class user_cont extends PureComponent {
    constructor(props){
        super(props);
        const { columns } = props;


        this.state = {
          selectedRowKeys: [], // Check here to configure the default column
          loading: false,
          ModalText: 'Content of the modal',
          confirmLoading: false,
          visible: false      //弹框用的状态
          };
    }


    // state = {
    //     selectedRowKeys: [], // Check here to configure the default column
    //     loading: false,
    //     ModalText: 'Content of the modal',
    //     confirmLoading: false,
    //     visible: false       //弹框用的状态
    //   };
    //删除
      start = () => {
        const {selectedRowKeys} = this.state;
        this.setState({ loading: true });
        // ajax request after empty completing
        this.props.onMyUpdata(selectedRowKeys)
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      }
      onSelectChange = (selectedRowKeys) => {

        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }
      //弹框
      showModal = () => {
        this.setState({
          visible: true,
        });
      }
      handleOk = (e) => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      }
      handleCancel = (e) => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      }
      //气泡
      confirm=(e)=> {
        console.log(e);
        message.success('Click on Yes');
      }
      
      cancel=(e)=> {
        console.log(e);
        message.error('Click on No');
      }


      // renderForm() {
      //   return this.state.visible ? this.renderAdvancedForm() : this.renderSimpleForm();
      // }
      render() {
        const { loading, selectedRowKeys, confirmLoading, ModalText } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        // console.log(this.props)
        const columns = [{
          title: '姓名',
          dataIndex: 'name',
          width: 450,
        }, {
          title: '年龄',
          // dataIndex: 'age',
          dataIndex: 'year',
          // sorter: true,
          width: 250,
          // defaultSortOrder: 'descend',
          // sorter: (a, b) =>{
          //   if (a.age > b.age) return -1;
          //   if (a.age < b.age) return 1;
          //   // a.age - b.age
          // } 
        }, {
          title: '性别',
          // dataIndex: 'address',
          dataIndex: 'sex',
          width: 250,
        },
        {
          title: '职位',
          // dataIndex: 'asome',
          dataIndex: 'position',
          width: 350,
          filterMultiple:true,
          filters: [
            {
              text: '老板',
              value: '老板 0',
            },
            {
              text: '员工',
              value: '员工',
            }
          ],
          onFilter:(value, record) => {
          if(record.asome.toString() == value){
            return record.asome.toString()
          }
          },
        },
        {
          title: '权限',
          // dataIndex: 'addre',
          dataIndex: 'Jurisdiction',
          width: 300,
        },
        {
          title: '是否拉入黑名单',
          // dataIndex: 'ang',
          dataIndex: 'Blacklist',
          align: 'right',
          width: 400,
        },
        {
          title:'操作',
          dataIndex:'edit',
          dataIndex:'dele',
          width:300,
          render: () => (
            <Fragment>
              <a href="javascript:;" onClick={this.showModal}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除?" onConfirm={this.confirm} onCancel={this.cancel} okText="删除" cancelText="退出">
              <a href="javascript:;">删除</a>
              </Popconfirm>
            </Fragment>
          ),
        }];

        console.log(this.props.data.length)

        // this.setState


      
      // if(this.props.data){
      //   const data = this.props.data;
      // }

        const data = [];
        if(this.props.data&&(this.props.data.length>0)){
          this.props.data.map(item=>{
            data.push(item)
          })
        }

        // for (let i = 0; i < 46; i++) {
        //   data.push({
        //     key: i,
        //     name: `Edward King ${i}`,
        //     age: `age ${14+i}`,
        //     address: `London. ${i}`,
        //     asome:`老板 ${i}`,
        //     addre:`有 ${i}`,
        //     ang:`否`
        //   });
        // }
        // console.log(this.props.data)
        // console.log(data)

        // if(this.props.data){

        // }
        // // console.log(data[0].name);
        // // const data = 
        // // console.log(this.props.data[0]);
        // const  datt  = this.props.data;
        // console.log(data[0]);
        // console.log(datt[0].id);
   
        const parentMethods = {
          handleOk: this.handleOk,
          handleCancel: this.handleCancel,
        };

        return (
          
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
              >
                Reload
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `选中 ${selectedRowKeys.length} 个` : ''}
              </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            {/* <Modal
              title="提示"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
            <p>是否删除</p>
            </Modal> */}

            <RenderSimpleForm {...parentMethods} visible={this.state.visible}>
            </RenderSimpleForm>
            
          </div>
        );
      }
}


export default user_cont
