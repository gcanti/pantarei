// @flow

const {run} = require('@cycle/xstream-run')
const xs = require('xstream').default

// $ExpectError bad return value of main
run(() => {}, {})
// $ExpectError bad return value of main
run(() => {
  return 1
}, {})

run(sources => {
  // $ExpectError bad sources key
  sources.unknown
  return {}
}, ({}: {})) // <= TODO is this cast required?

run(() => {
  // $ExpectError
  return {
    // $ExpectError
    a: 1 // bad key and bad value
  }
}, {})

const drivers = {
  input: () => xs.fromArray([1,2,3]),
  output: (sink) => {
    sink.addListener({
      next: console.log,
      error: console.error,
      complete: console.log
    })
  }
}

function main(sources) {
  return {
    output: sources.input.map(x => x * 2)
  }
}

run(() => {
  return {
    // $ExpectError good key but bad value
    output: 1
  }
}, drivers)

run((sources) => {
  // $ExpectError
  return {
    // $ExpectError
    output: sources.input.map(x => x * 2)
  }
}, {
  input: () => 1 // <= bad value (no .map)
})

run(main, {
  input: () => xs.fromArray([1,2,3]),
  output: sink => {
    // $ExpectError
    sink.unknown()
  }
})

run(main, {
  input: () => xs.fromArray([1,2,3]),
  output: sink => {
    // $ExpectError
    sink.addListener({
      unknown: console.log,
      error: console.error,
      complete: console.log
    })
  }
})

run(sources => {
  return {
    // $ExpectError missing input source
    output: sources.input.map(x => x * 2)
  }
}, {
  output: sink => {
    sink.addListener({
      next: console.log,
      error: console.error,
      complete: console.log
    })
  }
})

run(sources => {
  const input: xstream$Stream<string> = sources.input
  return {
    // $ExpectError
    output: input.map(x => x * 2)
  }
}, drivers)

run(sources => {
  // ok!
  const input: xstream$Stream<number> = sources.input
  return {
    output: input.map(x => x * 2)
  }
}, drivers)
