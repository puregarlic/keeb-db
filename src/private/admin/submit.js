import React from 'react'
import styled from '@emotion/styled'
import { X as XIcon } from 'react-feather'
import { addDays, formatISO } from 'date-fns'
import { object, array, string, date } from 'yup'
import { useMutation } from 'urql'
import { Persist } from 'formik-persist'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { Flex, Heading, Box, Button, Image } from 'rebass'
import { Input, Select, Label } from '@rebass/forms'

import Narrow from '../../layouts/narrow'
import Announcement from '../../components/announcement'
import SEO from '../../components/seo'
import withURQL from '../../utils/hocs/with-urql'
import Loading from '../../components/loading'

const initialValues = {
  name: '',
  status: {
    start: '',
    end: '',
    eta: '',
    state: ''
  },
  coverImage: {
    url: '',
    caption: ''
  },
  category: 'CAPS',
  links: [
    // {
    //   label: '',
    //   region: '',
    //   url: ''
    // }
  ],
  images: [
    /*{ url: '', caption: '' } */
  ]
}

const validationSchema = object({
  name: string().required('Your group buy needs a name!'),
  status: object().shape({
    start: string(),
    end: string(),
    eta: string(),
    state: string()
      .oneOf(['PLANNED', 'SCHEDULED', 'CANCELLED'])
      .required('Choose a status')
  }),
  coverImage: object().shape({
    url: string()
      .url()
      .required('You need a URL for the cover image'),
    caption: string()
  }),
  category: string()
    .oneOf(['KEYBOARD', 'SWITCH', 'CAPS', 'MISC'])
    .required('You must select a category'),
  links: array().of(
    object({
      label: string(),
      region: string(),
      url: string().url()
      // .required('Your link needs a URL')
    })
  ),
  images: array().of(
    object({
      url: string().url(),
      // .required('Your image needs a URL'),
      caption: string()
    })
  )
})

const mutation = `
  mutation CreateGroupBuy($input: GroupBuyInput!) {
    createGroupBuy(data: $input) {
      name
    }
  }
`

const DataInput = () => {
  const [addGroupBuyResult, addGroupBuy] = useMutation(mutation)

  async function onSubmit(values, actions) {
    const input = {
      ...values,
      status: {
        start: values.status.start || null,
        end: values.status.end || null,
        eta: values.status.eta || null,
        state: values.status.state
      }
    }

    try {
      const res = await addGroupBuy({
        input
      })
      if (res.errors) throw new Error()
      actions.resetForm()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <SEO title="Submit" />
      <Announcement marquee>
        <b>
          Warning: This page is intended for administration purposes only, and
          will not be published during build.
        </b>
      </Announcement>
      <Narrow>
        <Heading fontSize={5} mb={4}>
          Submit
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {fieldVals => (
            <Form>
              <Persist name="submission-form" />
              <Heading fontSize={3} mb={3}>
                Details
              </Heading>
              <Flex mb={4}>
                <Label mr={3}>
                  Name
                  <Field
                    name="name"
                    type="text"
                    as={Input}
                    placeholder="KAT Example"
                  />
                  <ErrorMessage name="name" />
                </Label>
                <Label ml={3}>
                  Category
                  <Field name="category" as={Select}>
                    <option value="KEYBOARD">Keyboards</option>
                    <option value="CAPS">Keycaps</option>
                    <option value="SWITCH">Switches</option>
                    <option value="MISC">Miscellaneous</option>
                  </Field>
                  <ErrorMessage name="category" />
                </Label>
              </Flex>
              <Label>
                Status
                <Field name="status.state" as={Select}>
                  <option hidden disabled value="">
                    Select a status...
                  </option>
                  <option value="PLANNED">Planned</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="CANCELLED">Cancelled</option>
                </Field>
                <ErrorMessage name="status.state" />
              </Label>
              <Flex mb={5}>
                {fieldVals.values.status.state === 'SCHEDULED' && (
                  <Flex mt={4} width={1}>
                    <Label mr={3}>
                      Start
                      <Field name="status.start" type="date" as={Input} />
                      <ErrorMessage name="status.start" />
                    </Label>
                    <Label ml={3}>
                      End
                      <Field name="status.end" type="date" as={Input} />
                      <ErrorMessage name="status.end" />
                    </Label>
                  </Flex>
                )}
                {fieldVals.values.status.state === 'PLANNED' && (
                  <Label mt={4}>
                    ETA
                    <Field
                      name="status.eta"
                      type="text"
                      as={Input}
                      placeholder="Q2 2020"
                    />
                    <ErrorMessage name="status.eta" />
                  </Label>
                )}
              </Flex>
              <Heading fontSize={3} mb={3}>
                Cover Image
              </Heading>
              <Box>
                {fieldVals.values.coverImage.url && (
                  <Image
                    mb={3}
                    src={fieldVals.values.coverImage.url}
                    alt={fieldVals.values.coverImage.caption}
                  />
                )}
                <Flex mb={5}>
                  <Label mr={3}>
                    URL
                    <Field
                      name="coverImage.url"
                      type="url"
                      as={Input}
                      placeholder="https://placehold.it/300x180"
                    />
                    <ErrorMessage name="coverImage.url" />
                  </Label>
                  <Label ml={3}>
                    Caption
                    <Field
                      name="coverImage.caption"
                      type="text"
                      as={Input}
                      placeholder="KAT Example on a Pain27"
                    />
                    <ErrorMessage name="coverImage.caption" />
                  </Label>
                </Flex>
              </Box>
              <Heading fontSize={3} mb={3}>
                Gallery Images
              </Heading>
              <FieldArray name="images">
                {helpers => (
                  <>
                    {fieldVals.values.images.map((image, index) => (
                      <Box key={index} mb={4}>
                        {image.url && (
                          <Image src={image.url} alt={image.caption} />
                        )}
                        <Flex width={1} mb={4}>
                          <Label mr={3}>
                            URL
                            <Field
                              name={`images[${index}].url`}
                              type="url"
                              as={Input}
                            />
                          </Label>
                          <Label ml={3}>
                            Caption
                            <Field
                              name={`images[${index}].caption`}
                              type="text"
                              as={Input}
                            />
                          </Label>
                        </Flex>
                        <Button
                          mb={5}
                          width={1}
                          type="button"
                          variant="danger"
                          onClick={() => helpers.remove(index)}>
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      width={1}
                      mb={5}
                      type="button"
                      onClick={() => helpers.push({ url: '', caption: '' })}>
                      Add image
                    </Button>
                  </>
                )}
              </FieldArray>
              <Heading fontSize={3} mb={3}>
                Links
              </Heading>
              <FieldArray name="links">
                {helpers => (
                  <>
                    {fieldVals.values.links.map((image, index) => (
                      <Box key={index}>
                        <Flex mb={4}>
                          <Label mr={3}>
                            Region (optional)
                            <Field
                              name={`links[${index}].region`}
                              type="text"
                              placeholder="NA"
                              as={Input}
                            />
                          </Label>
                          <Label ml={3}>
                            Label
                            <Field
                              name={`links[${index}].label`}
                              type="text"
                              placeholder="Geekhack IC"
                              as={Input}
                            />
                          </Label>
                        </Flex>
                        <Label mb={4}>
                          URL
                          <Field
                            name={`links[${index}].url`}
                            type="url"
                            placeholder="https://example.com"
                            as={Input}
                          />
                        </Label>
                        <Button
                          mb={5}
                          width={1}
                          type="button"
                          variant="danger"
                          onClick={() => helpers.remove(index)}>
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      mb={6}
                      width={1}
                      type="button"
                      onClick={() =>
                        helpers.push({ url: '', region: '', label: '' })
                      }>
                      Add link
                    </Button>
                  </>
                )}
              </FieldArray>
              {fieldVals.isSubmitting ? (
                <Flex width={1} justifyContent="center">
                  <Loading />
                </Flex>
              ) : (
                <Button type="submit" width={1} variant="confirm">
                  Submit
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Narrow>
    </>
  )
}

export default withURQL(DataInput)
