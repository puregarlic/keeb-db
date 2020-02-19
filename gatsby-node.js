const axios = require('axios')
const Vibrant = require('node-vibrant')
const { createFileNodeFromBuffer } = require('gatsby-source-filesystem')

exports.createSchemaCustomization = async ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    schema.buildObjectType({
      name: 'Vibrant',
      fields: {
        muted: 'Palette',
        vibrant: 'Palette'
      }
    }),
    schema.buildObjectType({
      name: 'Palette',
      fields: {
        normal: 'String',
        dark: 'String',
        light: 'String'
      }
    })
  ]

  createTypes(typeDefs)
}

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const { createNode } = actions

  await createResolvers({
    Fauna_Image: {
      file: {
        type: 'File',
        async resolve(source) {
          const response = await axios({
            method: 'get',
            url: source.url,
            responseType: 'arraybuffer'
          })
          return await createFileNodeFromBuffer({
            buffer: response.data,
            store,
            cache,
            createNode,
            createNodeId
          })
        }
      },
      colors: {
        type: 'Vibrant',
        async resolve(source) {
          try {
            const response = await axios({
              method: 'get',
              url: source.url,
              responseType: 'arraybuffer'
            })
            const palette = await Vibrant.from(response.data).getPalette()

            const vibrant = {
              normal: palette.Vibrant ? palette.Vibrant.getHex() : undefined,
              dark: palette.DarkVibrant
                ? palette.DarkVibrant.getHex()
                : undefined,
              light: palette.LightVibrant
                ? palette.LightVibrant.getHex()
                : undefined
            }

            const muted = {
              normal: palette.Muted ? palette.Muted.getHex() : undefined,
              dark: palette.DarkMuted ? palette.DarkMuted.getHex() : undefined,
              light: palette.LightMuted
                ? palette.LightMuted.getHex()
                : undefined
            }

            return { muted, vibrant }
          } catch (error) {
            console.error(error)
            return {
              vibrant: null,
              muted: null
            }
          }
        }
      }
    }
  })
}
