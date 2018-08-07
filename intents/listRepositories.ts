import { GetCollection, Toauth2Context } from '@bearer/intents'
import Client from './client'

export default class listRepositoriesIntent {
  static intentName: string = 'listRepositories'
  static intentType: any = GetCollection

  static action(context: Toauth2Context, params: any, callback: (params: any) => void) {
    Client(context.authAccess.accessToken).get('user/repos')
      .then(({ data }) => {
        callback({ collection: data })
      })
      .catch(e => {
        console.log(e);
      	callback({ collection: []})
      })
  }
}
