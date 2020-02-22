import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import 'react-toastify/dist/ReactToastify.css'

import Container from '../../components/Container'

import api from '../../services/api'

import { Form, SubmitButton, List } from './styles'

export default class Main extends Component {
  state = {
    loading: false,
    newRepo: '',
    repositories: [],
    error: null,
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

    try {
      const { newRepo, repositories } = this.state

      if (newRepo === '') {
        this.setState({ error: true })
        toast.error('Você precisa colocar algum repositório.')
        return false
      }

      const hasRepo = repositories.find(r => r.name.toLowerCase() === newRepo.toLowerCase())

      if (hasRepo) {
        this.setState({ error: true })
        toast.error('Repositório já existe.')
        return false
      }

      const response = await api.get(`/repos/${newRepo}`)

      const data = {
        name: response.data.full_name,
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: null,
      })
    } catch (err) {
      this.setState({ error: true, newRepo: '' })
      toast.error('Repositório não encontrado.')
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { newRepo, loading, repositories, error } = this.state
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
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
