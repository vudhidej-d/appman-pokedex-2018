import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import axios from 'axios'
import './App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/api/cards').then((res) => {
      const { data: { cards } } = res
      this.setState({ pokemons: cards })
    })
  }

  render() {
    const { pokemons } = this.state
    console.log(pokemons)
    return (
      <Row style={{ height: 712, overflowY: 'scroll' }}>
        {pokemons.map(({ name }) => (
          <Col span={24}>
            <Card>{name}</Card>
          </Col>
        ))}
      </Row>
    )
  }
}

export default App
