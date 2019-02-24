import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'antd'
import axios from 'axios'
import { get, sum } from 'lodash'
import './App.css'
import ProgressBar from './components/ProgressBar'
import cute from './cute.png'

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
  Fire: "#eb4d4b",
  Green: "#52c41a",
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: [],
      pokedex: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/api/cards').then((res) => {
      const { data: { cards } } = res
      const pokemons = cards.map(({ name, imageUrl, hp, attacks, weaknesses }) => {
        if (hp > 100) hp = 100
        const strength = get(attacks, 'length', 0)*50
        const weakness = get(weaknesses, 'length', 0)*50
        let damages = []
        if (attacks) damages = attacks.map(({ damage }) => parseInt(damage))
        const damage = sum(damages) || 0
        const happiness = ((hp/10)+(damage/10)+10-(weakness/50))/5
        return {
          name,
          imageUrl,
          hp,
          strength,
          weakness,
          happiness,
          added: false,
        }
      })
      this.setState({ pokemons: cards })
    })
  }

  addToPokedex = (index) => () => {
    const { pokedex, pokemons } = this.state
    const newPokedex = pokedex.concat(pokemons[index])
    this.setState({ pokedex: newPokedex })
  }

  render() {
    const { pokemons, pokedex } = this.state
    console.log(pokedex)
    return (
      <Row style={{ height: 712, overflowY: 'scroll' }}>
        {pokemons.map(({ name, imageUrl, hp, attacks, weaknesses }, index) => {
          if (hp > 100) hp = 100
          const strength = get(attacks, 'length', 0)*50
          const weakness = get(weaknesses, 'length', 0)*50
          let damages = []
          if (attacks) damages = attacks.map(({ damage }) => parseInt(damage)) 
          const damage = sum(damages) || 0
          const happiness = ((hp/10)+(damage/10)+10-(weakness/50))/5
          let cutes = []
          for (let i = 0; i < happiness; i++) {
            cutes.push(<img alt="" src={cute} width="7%" height="7%" />)
          }
          return (
            <Col span={24} key={index}>
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
                  <Col span={24}>{cutes}</Col>
                  <Col span={24}>
                    <Button
                      style={{ float: 'right' }}
                      onClick={this.addToPokedex(index)}
                      icon="plus"
                    >
                      Add
                    </Button>
                  </Col>
                </Col>
              </Card>
            </Col>
          )
        })}
      </Row>
    )
  }
}

export default App
