import { GetCollection, Toauth2Context } from '@bearer/intents'
import Client from './client'

export default class listPullRequestsIntent {
  static intentName: string = 'listPullRequests'
  static intentType: any = GetCollection

  static action(context: Toauth2Context, params: any, callback: (params: any) => void) {
    Client(context.authAccess.accessToken).get(`/repos/${params.fullName}/pulls`, {
      params: { per_page:10, ...params },
    })
      .then(({ data }) => {
        callback({ collection: data });
      })
      .catch( e => {
        callback( {collection: [] })
      })
  }

}
