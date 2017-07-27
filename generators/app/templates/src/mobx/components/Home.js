import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'
import { Form, Input, Icon, Button, Alert} from 'antd'

@Form.create()
@inject('todo')
@observer
export default class Home extends Component{
  constructor(props) {
    super(props)
  }
  handleRemove(index) {
    this.props.todo.remove(index)
  }
  handleAdd = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
         this.props.todo.add(values)
         this.props.form.resetFields();
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { list } = this.props.todo
    return (
      <div>
        <Form layout="inline"
          onSubmit={this.handleAdd}
          style={{ marginBottom: 20, textAlign: 'center' }}
        >
          <Form.Item>
            {
              getFieldDecorator('value', {
                  rules: [{ required: true, message: '请输入你添加的内容' }],
              })(
                <Input placeholder="输入内容" />
              )
            }

          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
        {
          list.length === 0 ? (
            <Alert
              message="提示信息"
              description="这是一个基于Mobx的todo list demo. 仅供测试使用"
              type="info"
            />
          ) : (
            <div className="demo-list">
              {
                list.map((item, idx) => {
                  return (
                    <div key={idx} className="demo-list-item">
                      <span>{item.value}</span>
                      <span onClick={() => { this.handleRemove(idx) }}>
                        <Icon type="minus-circle" />
                      </span>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}
