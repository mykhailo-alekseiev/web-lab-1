/**
 * Initialization of env variables module
 * @remark If the value of any variable is not found,
 * the application will immediately throw an error when initializing the module
 * @module
 */

/**
 * Getting an env variable
 * @throwable
 */
const getEnvVar = (key: string) => {
  if (!process.env[key]) {
    throw new Error(`Env variable ${key} is required`)
  }

  return process.env[key] || ''
}

export const REACT_APP_SERVER_URL = getEnvVar('REACT_APP_SERVER_URL')
