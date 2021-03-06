import { Glitch } from '../src'

const glitch = new Glitch()
const { api } = glitch
const ID = '016af9e7-d077-4854-83f3-b0863c88ba35'
const DOMAIN = 'community'

describe('Get projects', () => {
  it('should get project by id', async () => {
    const res = await api.projects.get({ id: ID })

    expect(res.id).toBe(ID)
  })

  it('should get project by domain', async () => {
    const res = await api.projects.get({ domain: DOMAIN })
    
    expect(res.domain).toBe(DOMAIN)
  })
})

describe('Search project', () => {
  it('should search project by query', async () => {
    const res = await api.projects.search({ q: DOMAIN })

    expect(res).not.toBeNull()
  }, 60 * 1000)
})
