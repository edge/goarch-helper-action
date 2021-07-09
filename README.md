# GOARCH Helper Action

This simple Github Action takes `os` and `arch` inputs [conformant with containerd platform specifiers](https://github.com/containerd/containerd/blob/v1.2.6/platforms/platforms.go#L63-L96) and outputs useful variations to help with multi-arch Go building and packaging.

## Inputs

| Input | Description | Example |
|:------|:------------|:--------|
| arch | Target architecture | `arm/v7` |
| os | Target OS | `linux` |

The example values above reflect the platform specifier `linux/arm/v7` but you should check `docker buildx ls` to see what platforms are supported on your build machine.

Generally GOARCH and GOOS values also correspond to arch/os inputs but check documentation to be sure.

## Outputs

| Output | Description | Example |
|:------|:------------|:--------|
| GOARCH | Target architecture for Go compiler | `arm` |
| GOARM | Target ARM variant for Go compiler | `7` |
| GOOS | Target OS for Go compiler | `linux` |
| alpine_platform | Alpine platform specifier | `arm32v7` (i.e. [arm32v7/alpine](https://hub.docker.com/r/arm32v7/alpine/))
| artifact_suffix | Arbitrary filename-safe string | `linux-arm-v7` |
| deb_arch | Debian architecture flag | `armhf` |
| docker_buildx_platform | Docker [Buildx](https://github.com/docker/buildx) platform specifier | `linux/arm/v7` |
| docker_go_buildargs | Build arguments to pass to Go builder Docker image | `-e GOARCH=arm -e GOARM=7 -e GOOS=linux` |

These outputs and their formats are used in Edge CI. If you need different outputs, please feel free to fork this project or roll your own.

## Example usage

```yaml
jobs:
  myjob:
    steps:
      - name: Facilitate multi-arch build
        id: goarch
        uses: edge/goarch-helper-action@v1
        with:
          os: ${{ matrix.os }}
          arch: ${{ matrix.arch }}

      - name: Print buildargs for whatever reason
        run: echo ${{ steps.goarch.outputs.docker_go_buildargs }}
```

## Development

This is a very simple JS package with one meaningful script, [arch-normalize.js](./arch-normalize.js) describing the entire process. Before committing your changes, run `npm run build` to ensure the distributable file is rebuilt. And that's it!
