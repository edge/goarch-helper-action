const core = require('@actions/core')

const safe = str => str.replace(/[^A-z\d]+/, '-')

const input = {
  arch: core.getInput('arch'),
  os: core.getInput('os')
}

const output = {
  GOARCH: input.arch,
  GOARM: null,
  GOOS: input.os,
  alpine_platform: () => {
    if (output.GOARCH === 'arm') {
      if (output.GOARM === '6') return 'arm32v6'
      if (output.GOARM === '7') return 'arm32v7'
    }
    if (output.GOARCH === 'arm64') return 'arm64v8'
    return output.GOARCH
  },
  artifact_suffix: () => `${input.os}-${safe(input.arch)}`,
  docker_buildx_platform: () => `${input.os}/${input.arch}`,
  docker_go_buildargs: () => [
    `-e GOARCH=${output.GOARCH}`,
    output.GOARM && `-e GOARM=${output.GOARM}`,
    `-e GOOS=${output.GOOS}`
  ].filter(a => a).join(' ')
}

if (/^arm\/v\d/.test(input.arch)) {
  output.GOARCH = 'arm'
  output.GOARM = input.arch.match(/v(\d)/)[1]
}

Object.getOwnPropertyNames(output).map(prop => {
  let value = output[prop]
  if (value instanceof Function) value = value()
  core.setOutput(prop, value)
})
