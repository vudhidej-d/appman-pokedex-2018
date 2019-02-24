import React from 'react'
import { Col, Progress } from 'antd'

const ProgressBar = ({ label, percent, color }) => (
  <Col span={24}>
    <Col span={4}>{label}</Col>
    <Col span={20}>
      <Progress
        percent={percent}
        format={p => p}
        strokeColor={color}
        strokeWidth={20}
      />
    </Col>
  </Col>
)

export default ProgressBar
