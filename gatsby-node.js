const Vibrant = require('node-vibrant')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

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
          return await createRemoteFileNode({
            url: encodeURI(source.url),
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          })
        }
      },
      colors: {
        type: 'Vibrant',
        async resolve(source) {
          const palette = await Vibrant.from(encodeURI(source.url)).getPalette()

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
            light: palette.LightMuted ? palette.LightMuted.getHex() : undefined
          }

          return { muted, vibrant }
        }
      }
    }
  })
}
