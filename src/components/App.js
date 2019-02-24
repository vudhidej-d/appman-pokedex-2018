import React, { Component } from 'react'
import { Row, Col, Modal, Button, Input } from 'antd'
import axios from 'axios'
import { get, sum } from 'lodash'
import PokemonCard from './PokemonCard'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: [],
      pokedex: [],
      addModal: false,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/api/cards?limit=100').then((res) => {
      const { data: { cards } } = res
      const pokemons = cards.map(({ name, imageUrl, hp, attacks, weaknesses }) => {
        if (hp === 'None') hp = 0
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
      this.setState({ pokemons })
    })
  }

  onPressSearch = ({ target: { value } }) => {
    axios.get(`http://localhost:3030/api/cards?name=${value}?type=${value}`)
  }

  addToPokedex = (index) => () => {
    const { pokedex, pokemons } = this.state
    const newPokedex = pokedex.concat(pokemons[index])
    const newPokemons = pokemons.map((pokemon, pos) =>{
      if (index === pos) pokemon['added'] = true
      return pokemon
    })
    this.setState({ pokedex: newPokedex, pokemons: newPokemons })
  }

  renderAddModal = () => {}

  render() {
    const { pokemons, pokedex, addModal } = this.state
    return (
      <div>
        <Row style={{ height: 712, overflowY: 'scroll' }}>
          {pokedex.length > 0 ? pokedex.map((pokemon) => (
            <Col span={12}>
              <PokemonCard
                  data={pokemon}
                  canAdd={false}
              />
            </Col>
          )) : (
            <Col
              span={24}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 40,
              }}
            >
              Add pokemon to your Pokedex.
            </Col>
          )}
          <Modal
            footer={null}
            visible={addModal}
            style={{ height: 600 }}
            width={760}
            onCancel={() => this.setState({ addModal: false })}
          >
            <Input
              placeholder="Search by name or type."
            />
            <Row style={{ height: '-webkit-fill-available', overflowY: 'scroll' }}>
              {pokemons.map((pokemon, index) => {
                const { added } = pokemon
                if (!added) return (
                  <Col span={24} key={index}>
                    <PokemonCard
                      data={pokemon}
                      onClickAdd={this.addToPokedex(index)}
                    />
                  </Col>
                )
              })}
            </Row>
          </Modal>
        </Row>
        <Row
          style={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Button
            icon="plus"
            onClick={() => this.setState({ addModal: true })}
            style={{ width: '100%', height: 60, fontSize: 40 }}
          />
        </Row>
      </div>
    )
  }
}

export default App
