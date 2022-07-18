import { Api } from '@serverless-stack/resources'

export function MyStack({ stack }) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /': 'functions/lambda.handler',
    },
  })

  // Show the endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  })
}
