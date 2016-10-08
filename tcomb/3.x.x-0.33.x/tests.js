// @flow

import t from 'tcomb'
import type { Declare, TypeT } from 'tcomb'
import fromJSON from 'tcomb/lib/fromJSON'

const x: TypeT<string> = t.String

//
// irreducibles
//

;(t.String: Function)
;(t.String: (_: string) => string)
;(t.String.meta: Object)
;(t.String.meta.name: string)
// $ExpectError bad meta field
;t.String.meta.a
;t.String.fromJSON = () => 'ciao'
// $ExpectError bad fromJSON type
t.String.fromJSON = () => undefined

//
// irreducibles
//

// $ExpectError bad predicate
const I1 = t.irreducible('Promise', 1)
// $ExpectError bad name
const I2 = t.irreducible(1, p => p instanceof Promise)
t.irreducible('Promise', p => p instanceof Promise)

//
// refinements
//

const R1: typeof t.String = t.refinement(t.String, (s: string) => s === 2)
// $ExpectError
const R2 = t.refinement(t.String, s => s * 2 === 4)

//
// enums
//

const E1 = t.enums({
  a: 'aa',
  b: 'bb'
})
E1('a')
// $ExpectError bad value
E1('c')

//
// maybe
//

const M1 = t.maybe(t.String)
M1(null)
M1()
M1(undefined)
M1('s')
// $ExpectError bad value
M1(1)

//
// interfaces
//

const PersonI = t.interface({
  name: t.String,
  age: t.Number
})

;(PersonI({ name: 'Giulio', age: 1 }): {name: string, age: number})
// $ExpectError bad input
PersonI()
// $ExpectError bad fields
PersonI({})
// $ExpectError missing field
PersonI({ name: 1 })
// $ExpectError bad field type
PersonI(({ name: 1, age: 1 }: {name: number, age: number}))
PersonI({ name: 'Giulio', age: 1 })
PersonI({ name: 'Giulio', age: 1, a: 1 })

const personi = PersonI({ name: 'Giulio', age: 1 })
;(personi.name : string)
;(personi.age : number)

// strictness
const PersonStrictI = t.interface({
  name: t.String,
  age: t.Number
}, { strict: true })

// $ExpectError
PersonStrictI({ name: 'Giulio', age: 1, a: 1 })

//
// tuples
//

const T1 = t.tuple([t.String, t.Number])
T1(['a', 1])
// $ExpectError bad value
T1([])
// $ExpectError bad value
T1(['a'])
// $ExpectError bad value
T1(['a', 'a'])

//
// lists
//

const L1 = t.list(t.Number)
L1([1, 2, 3])
// $ExpectError bad value
L1(['a'])

//
// dicts
//

const D1 = t.dict(t.String, t.Number)
D1({})
D1({a: 1})
// $ExpectError bad value
D1({a: 'a'})

//
// unions
//

const U1 = t.union([t.Number, t.String])
U1(1)
U1('a')
// U1(true) // <= no error here due to Flow bug (see Union definition)

//
// intersections
//

const IN1 = t.intersection([t.Number, t.String])
// $ExpectError bad value
IN1(1)
// $ExpectError bad value
IN1('a')
// $ExpectError bad value
IN1(true)
const IN2 = t.intersection([t.Number, t.Number])
IN2(1)

//
// declarations
//
const DE1: Declare<{name: string}> = t.declare('MyString')
DE1.define(t.struct({ name: t.String }))
DE1({ name: 'Giulio' })
// $ExpectError bad value
DE1({})

//
// fromJSON
//
const v1: string = fromJSON('a', t.String)
// $ExpectError bad type
const v2: number = fromJSON('a', t.String)
