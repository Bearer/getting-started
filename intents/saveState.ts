import { SaveState } from '@bearer/intents'
// We import some types to validate the input / output
import { PullRequest, ScenarioState } from './types'

export default class saveStateIntent {
  static intentName: string = 'saveState'
  static intentType: any = SaveState

  static action(
    _context,
    _params,
    body: { pullRequest: PullRequest; repository: any }, // We define the structure of the body we are going to receive
    state,
    callback: (state: ScenarioState) => void
  ): void {
    callback({
      ...state,
      // We append the pullRequest we want to attach to the existing pullRequests
      pullRequests: [
        ...(state.pullRequests || []),
        {
          number: body.pullRequest.number,
          fullName: body.repository.full_name
        }
      ]
    })
  }
}
