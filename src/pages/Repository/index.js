import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Container from '../../components/Container'

import api from '../../services/api'

import { Loading, Owner, IssueList, Button } from './styles'

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    repository: {},
    issues: [],
    loading: true,
    issuesType: 'all',
  }

  async componentDidMount() {
    const { match } = this.props

    const repoName = decodeURIComponent(match.params.repository)

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ])
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    })
  }

  handleSelectIssueType = async type => {
    const { match } = this.props

    const repoName = decodeURIComponent(match.params.repository)

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: type,
        per_page: 5,
      },
    })

    this.setState({ issuesType: type, issues: issues.data })
  }

  render() {
    const { repository, issues, issuesType, loading } = this.state

    if (loading) {
      return <Loading>Carregando</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar para a páginia inicial</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>

          <div>
            <h3>Issues</h3>
            <div>
              <Button selected={issuesType === 'open' && true} onClick={() => this.handleSelectIssueType('open')}>
                Abertas
              </Button>
              <Button selected={issuesType === 'all' && true} onClick={() => this.handleSelectIssueType('all')}>
                Todas
              </Button>
              <Button selected={issuesType === 'closed' && true} onClick={() => this.handleSelectIssueType('closed')}>
                Fechadas
              </Button>
            </div>
          </div>
        </Owner>
        <IssueList>
          {issues.length === 0 ? (
            <p>Não há issues para esse repositório</p>
          ) : (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          )}
        </IssueList>
      </Container>
    )
  }
}
