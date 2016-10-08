// @flow

import t from 'tcomb'
import { validate } from 'tcomb-validation'

;(validate(1, t.Number).value : number)
// $ExpectError
;(validate(1, t.Number).value : string)
