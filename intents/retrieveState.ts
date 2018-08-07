import { RetrieveState, Toauth2Context } from '@bearer/intents'
import Client from './client'
// We import some types to validate the input / output
import { PullRequest, ScenarioState } from './types'

export default class retrieveStateIntent {
  static intentName: string = 'retrieveState'
  static intentType: any = RetrieveState

  static action(context: Toauth2Context, _params, state: ScenarioState, callback: (state: any) => void) {
    // Create a fetcher to retrieve all the information through GitHub API
    const pullRequestFetcher = (savedPR: PullRequest): Promise<any> =>
      Client(context.authAccess.accessToken)
        .get(`repos/${savedPR.fullName}/pulls/${savedPR.number}`)
        .then(response => response.data)
        .catch(error => ({ error: error.response }))

    // Loop over the PullRequests stored in the SaveState intent
    // Then query the GitHub API
    Promise.all(
      (state.pullRequests || [])
      .map(pullRequestFetcher)
    )
    .then(pullRequests => {
    	callback(pullRequests)
    })
  }

}
