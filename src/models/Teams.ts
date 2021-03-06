import API from './API'
import Team from '../structures/Team'
import Context from 'src/structures/Context'

/** @hidden */
const getParams = ['url', 'id']

/**
 * Teams class
 *
 * @class
 */
export default class Teams {
  /**
   * @hidden
   */
  private _api: API

  /**
   * Teams constructor
   *
   * @param {API} api API instance
   */
  constructor(api: API) {
    this._api = api
  }

  /**
   * Gets project by url
   *
   * @param {Object} params
   * @param {string} params.url - Project URL
   * @param {string} params.id - Project ID
   */
  async get(params: Partial<{ url: string; id: string }>): Promise<Team> {
    const param = Object.keys(params).find(e => getParams.some(p => p === e))

    if (!param) {
      throw new Error('No parameter provided, supported: ' + getParams)
    }

    const context: Context = await this._api.enqueue(
      `teams/by/${param}`,
      params,
      {
        method: 'GET',
      }
    )

    if (Object.keys(context.response).length === 0) {
      return null
    }

    // @ts-ignore
    return new Team(context.response[params[param]])
  }

  /**
   * Search team by query
   *
   * @param {Object} params
   * @param {string} params.q Query
   */
  async search(params: { q: string }): Promise<Team[]> {
    const context: Context = await this._api.enqueue('teams/search', params, {
      method: 'GET',
      oldApi: true,
    })

    if (context.response.length === 0) {
      return null
    }

    return context.response.map((team: Team) => new Team(team))
  }
}
