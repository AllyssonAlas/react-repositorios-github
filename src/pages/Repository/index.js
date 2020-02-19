import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../services/api'

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
  }

  componentD

  async componentDidMount() {
    const { match } = this.props

    const repoName = decodeURIComponent(match.params.repository)

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          stats: 'open',
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

  render() {
    const { repository, issue, loading } = this.props

    return <h1>Repository: {}</h1>
  }
}
