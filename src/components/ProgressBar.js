/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/core'
import { Col, Progress } from 'antd'

const progressStyle = css`
  .ant-progress-text {
    color: #000;
  }
`

const ProgressBar = ({ label, percent, color }) => (
  <Col span={24}>
    <Col span={4} style={{ minWidth: 80 }}>{label}</Col>
    <Col span={20}>
      <Progress
        css={progressStyle}
        percent={percent}
        format={p => p}
        strokeColor={color}
        strokeWidth={20}
      />
    </Col>
  </Col>
)

export default ProgressBar
