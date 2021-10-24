import isEmpty from 'is-empty'
import Validator from 'validator'

type Data = { url?: string; id?: string }

export default function validateURL(data: Data) {
  let errors: Data = {}
  // Convert empty fields to empty string to use validator functions (validator only works on strings)
  data.id = isEmpty(data.id) ? '' : data.id
  data.url = isEmpty(data.url) ? '' : data.url

  // URL check
  if (Validator.isEmpty(data.url)) errors.url = 'URL is empty'
  else if (!Validator.isURL(data.url)) errors.url = 'Invalid URL'

  return { errors, isValid: isEmpty(errors) }
}
