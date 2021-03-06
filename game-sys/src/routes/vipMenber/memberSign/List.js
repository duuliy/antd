import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal,Switch  } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import { request, config } from 'utils'
const { api } = config
const { uploadfile,imgSrc } = api
const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  // console.log(tableProps.dataSource)
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e,status) => {
    if (e.key === '1') {
      onEditItem(status)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除?',
        onOk () {
          onDeleteItem(record.shoptype_id)
          // console.log(record)
        },
      })
    }
  }

  const columns = [
     {
      title: '头像',
      dataIndex: 'user_img_url',
      key: 'user_img_url',
      render:(user_img_url)=>{
        {
          // console.log(user_img_url)
         return  user_img_url != null ?  <div style={{background:'url('+imgSrc+user_img_url+') no-repeat',backgroundSize:'cover',width:'90%',height:'100px'}}></div> :  
         <img style={{width:'100%',height:'100%'}} alt=" "/>

        }
        
      }
    },
     {
      title: '昵称',
      dataIndex: 'user_name',
      key: 'user_name',
    },
     {
      title: '积分',
      dataIndex: 'sign_integral',
      key: 'sign_integral',
    },
     {
      title: '签到日期',
      dataIndex: 'sign_time',
      key: 'sign_time',
    },
   

  
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        { 
          return <span style={{cursor:'pointer',color:'#1890ff'}} onClick={e => onEditItem(record)} >删除</span>
          // console.log(record.authentication_status)
          // return <DropOption onMenuClick={e => handleMenuClick(record, e,record.authentication_status)} 
          // menuOptions={{ key: '1', name: 'authentication_status.authentication_status == 0 ? "未审核 " : (authentication_status.authentication_status == 1 ? "审核通过" : "审核失败")' }} />
        }
      
      },
    },
  ]

  const AnimateBody = (props) => {
    
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      // pagination={false}
      // rowSelection={false}
      // className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.shoptype_id}
      // components={{
      //   body: { wrapper: isMotion ? AnimateBody : CommonBody },
      // }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
