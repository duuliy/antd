/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import city from '../../../utils/city'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 8,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, address } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
        {getFieldDecorator('liushui')(
          <div>
            <span>退货单流水号&emsp;</span><Input style={{width:'60%'}} placeholder=""  />
          </div>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('dingdan')(
          <div>
            <span>订单号&emsp;</span><Input style={{width:'60%'}} placeholder=""  />
          </div>
        )}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
        {getFieldDecorator('person')(
          <div>
            <span>申请人&emsp;</span><Input style={{width:'60%'}} placeholder=""  />
          </div>
        )}
      </Col>
     
      <Col {...TwoColProps} xl={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            {/* <Button type="primary" className="margin-right" onClick={handleSubmit}>Search</Button>
            <Button onClick={handleReset}>Reset</Button> */}
          </div>
          <div className="flex-vertical-center" >
            {/* <Switch className="ant-switch-large" style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren="Motion" unCheckedChildren="Motion" /> */}
            <Button type="ghost" onClick={
              ()=>{
                const val = {...getFieldsValue()}
                onAdd(val)
              }
              
              }>搜索</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
