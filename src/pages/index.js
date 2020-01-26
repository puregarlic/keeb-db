import React from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
import styled from '@emotion/styled'

import Layout from '../components/layout'
import SEO from '../components/seo'
import GroupBuy from '../components/group-buy'

const GridContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 48px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Group Buys" />
    <GridContainer>
      <div style={{ position: 'sticky', top: '48px' }}>
        <h5
          style={{ margin: 0, marginBottom: '4px', fontVariant: 'small-caps' }}>
          filter by category
        </h5>
        <div
          style={{
            width: '100%',
            padding: '12px',
            border: '3px solid #333',
            marginBottom: '4px'
          }}>
          Keycaps
        </div>
        <div
          style={{
            width: '100%',
            padding: '12px',
            border: '3px solid #333',
            marginBottom: '4px'
          }}>
          Keyboard
        </div>
        <div
          style={{
            width: '100%',
            padding: '12px',
            border: '3px solid #333',
            marginBottom: '4px'
          }}>
          Switches
        </div>
        <div
          style={{
            width: '100%',
            padding: '12px',
            border: '3px solid #333',
            marginBottom: '4px'
          }}>
          Miscellaneous
        </div>
      </div>
      <Grid>
        {data.fauna.allGroupBuys.data.map(groupBuy => (
          <GroupBuy
            key={groupBuy.name}
            name={groupBuy.name}
            date={format(
              new Date(
                ...groupBuy.end.split('-').map((n, i) => (i === 1 ? n - 1 : n))
              ),
              'LLL do, Y'
            )}
            images={groupBuy.images}
          />
        ))}
      </Grid>
    </GridContainer>
  </Layout>
)

export const query = graphql`
  query GroupBuyQuery {
    fauna {
      allGroupBuys {
        data {
          name
          end
          images {
            url
          }
          links {
            url
            label
            region
          }
        }
      }
    }
  }
`

export default IndexPage
