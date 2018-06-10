import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Radio
} from 'antd';

import UserS from 'components/Users';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Users.less';

const FormItem = Form.Item;

const status = ['关闭', '运行中', '已上线', '异常'];
const CreateForm = Form.create()(props => {
  const { modalVisible, handleAdd, form, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {  //校验并获取一组输入域的值与 Error
      if (err) return;
      form.resetFields();    //重置控件
      //这里发起请求去做增加功能
      console.log(fieldsValue)
      handleAdd(fieldsValue);
    });
  };
  const RadioGroup = Radio.Group;
  return (
    <Modal
      title="新增加用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible(false)}
    >
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入用户名' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="出生日期">
        {form.getFieldDecorator('number', {
          rules: [{ required: true, message: '请输入出生日期' }],
        })(<DatePicker />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="性别">
        {form.getFieldDecorator('sex', {
          rules: [{ required: true, message: '请选择性别' }],
        })(<RadioGroup name="radiogroup" initialValue={1}>
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </RadioGroup>)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="职位">
        {form.getFieldDecorator('position', {
          rules: [{ required: true, message: '请输入职位' }],
        })(<Select placeholder="请选择职位" style={{ width: '100%' }}>
          <Option value="lb">老板</Option>
          <Option value="yg">员工</Option>
        </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="权限">
        {form.getFieldDecorator('Jurisdiction', {
          rules: [{ required: true, message: '请输入权限' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="是否拉入黑名单">
        {form.getFieldDecorator('Blacklist', {
          rules: [{ required: true, message: '是否拉入黑名单' }],
        })(<RadioGroup name="radgroup" initialValue={`y`}>
          <Radio value={`y`}>是</Radio>
          <Radio value={`n`}>否</Radio>
        </RadioGroup>)}
      </FormItem>
    </Modal>
  );
});
// Users.propTypes = {
//   userr: PropTypes.object
// }

@connect(({ userr, loading }) => ({
  userr,
  loading: loading.models.userr
}))

@Form.create()

export default class Users extends PureComponent {
  state = {
    expandForm: false,
    modalVisible: false
  };
  // shouldComponentUpdate(){
  //   console.log(this.props)
  // }
//   componentWillMount(){
//     //  on监听事件
//     console.log(this.props)
// }


  //发起新增

  handleAdd = fields => {
    // console.log(this.props)  
    this.props.dispatch({
      type: 'userr/add',
      payload: {
        description: fields,
      },
    })

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };


  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
  // 查询
  searchUsers = (props) => {
    // const { form, dispatch } = this.props;
    const { modalVisible, handleAdd, form, handleModalVisible } = props;
    
    form.validateFields((err, fieldsValue) => {  //校验并获取一组输入域的值与 Error
      if (err) return;
      form.resetFields();    //重置控件
      //这里发起请求去做增加功能
      // console.log("开始查询了")
      console.log(fieldsValue)
      // handleAdd(fieldsValue);
    });
    // dispatch({
    //   type: 'userr/fetch',
    //   payload: {},
    // });
    // console.log(connect)
  };
  //查询表单提交
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      console.log(fieldsValue)
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      // this.setState({
      //   formValues: values,
      // });

      dispatch({
        type: 'userr/fetch',
        payload: {},
      });

    });
  };
  // 重置
  handleFormReset = () => {
    // const { form, dispatch } = this.props;
    form.resetFields(); //表单控件自带，清空input
    // this.setState({
    //   formValues: {},
    // });
    // dispatch({
    //   type: 'rule/fetch',
    //   payload: {},
    // });
    console.log("把输入框重置为空了")
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  // 搜索关闭状态
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              {/* <Button type="primary" onClick={this.searchUsers} htmlType="submit"> */}
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 展开查询
  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="duuliy">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
              </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
              </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }
  handleMenuClick = e => {
    // const { dispatch } = this.props;
    // const { selectedRows } = this.state;

    // if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        //在这里做删除功能
        // dispatch({
        //   type: 'rule/remove',
        //   payload: {
        //     no: selectedRows.map(row => row.no).join(','),
        //   },
        //   callback: () => {
        //     this.setState({
        //       selectedRows: [],
        //     });
        //   },
        // });
        break;
      default:
        break;
    }
  };
  //删除
  onMydelte = (key) => {
    
    console.log(key)
    const { dispatch } = this.props;
    dispatch({
      type: 'userr/remove',
      payload: {'id':key},
    });
  }
  render() {
    const { selectedRows, modalVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    //从model拿数据
    const { userr: { data }, loading } = this.props;

    //更多操作 下拉菜单
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderLayout title="用户中心">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>

          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新增
              </Button>
            <span>
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                  更多操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          </div>

          <UserS data={data} onMydelte={this.onMydelte}>

          </UserS>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    )
  }

}


  // export default connect(({ user2, loading }) => ({ user2, loading: loading.models.userr }))(Users)
