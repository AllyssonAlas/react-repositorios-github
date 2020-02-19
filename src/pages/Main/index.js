import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import Container from '../../components/Container'

import api from '../../services/api'

import { Form, SubmitButton, List } from './styles'

export default class Main extends Component {
  state = {
    loading: false,
    newRepo: '',
    repositories: [],
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repositories')

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) })
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    this.setState({ loading: true })

    const { newRepo, repositories } = this.state

    const response = await api.get(`/repos/${newRepo}`)

    const data = {
      name: response.data.full_name,
    }

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    })
  }

  render() {
    const { newRepo, loading, repositories } = this.state
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Adicionar Repositórios" value={newRepo} onChange={this.handleInputChange} />

          <SubmitButton loading={loading}>
            {loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} />}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      </Container>
    )
  }
}
