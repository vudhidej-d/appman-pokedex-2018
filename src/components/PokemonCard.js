import React from 'react'
import { Col, Card, Button } from 'antd'
import COLORS from './COLORS'
import ProgressBar from './ProgressBar'
import cute from '../cute.png'

const PokemonCard = ({ 
  data: { name, imageUrl, hp, strength, weakness, happiness },
  onClickAdd,
  canAdd,
}) => {
  let cutes = []
  for (let i = 0; i < happiness; i++) {
    cutes.push(<img alt="" src={cute} width="7%" height="7%" />)
  }
  return (
    <Card>
      <Col span={6}>
        <img alt="" src={imageUrl} width="70%" height="70%" />
      </Col>
      <Col span={18}>
        <Col span={24} style={{ fontSize: 30 }}>{name}</Col>
        <Col span={24}>
          <ProgressBar label="HP" percent={hp} color={COLORS.Green} />
          <ProgressBar label="Strength" percent={strength} color={COLORS.Fire} />
          <ProgressBar label="Weakness" percent={weakness} color={COLORS.Lightning} />                  
        </Col>
        <Col span={24}>
          <Col span={24}>{cutes}</Col>
        </Col>
        {canAdd && <Col span={24}>
          <Button
            style={{ float: 'right' }}
            onClick={onClickAdd}
            icon="plus"
          >
            Add
          </Button>
        </Col>}
      </Col>
    </Card>
  )
}

PokemonCard.defaultProps = {
  onClickAdd: () => {},
  canAdd: true,
}

export default PokemonCard
