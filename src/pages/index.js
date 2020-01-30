import React, { useMemo, useState } from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
import styled from '@emotion/styled'

import Wide from '../layouts/wide'
import SEO from '../components/seo'
import GroupBuy from '../components/group-buy'

const GridContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 948px;
  gap: 48px;
  justify-content: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

const CategoryToggle = styled.button`
  appearance: none;
  width: 100%;
  font-family: inherit;
  border: 3px solid #333;
  outline: none;
  border-radius: 0;
  margin-bottom: 12px;
  background: #fff;
  color: #333;
  font-weight: 700;
  padding: 12px;
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 aquamarine;
  transition: 0.1s ease-in-out;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 aquamarine;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }

  &.active {
    color: #fff;
    background: #333;
  }

  &.active:hover {
    box-shadow: 6px 6px 0 aquamarine;
  }

  &.active:active {
    translate(4px, 4px);
    box-shadow: none;
  }
`

const categories = [
  { label: 'Keycaps', value: 'CAPS' },
  { label: 'Keyboards', value: 'KEYBOARD' },
  { label: 'Switches', value: 'SWITCH' },
  { label: 'Miscellaneous', value: 'MISC' }
]

const IndexPage = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState('CAPS')
  const filteredGroupBuys = useMemo(() => {
    return data.fauna.allGroupBuys.data.filter(
      groupBuy => groupBuy.category === activeCategory
    )
  }, [activeCategory, data.fauna.allGroupBuys.data])

  return (
    <Wide>
      <SEO title="Group Buys" />
      <GridContainer>
        <div>
          <div style={{ position: 'sticky', top: '24px' }}>
            <h5
              style={{
                margin: 0,
                marginBottom: '12px',
                fontVariant: 'small-caps'
              }}>
              category
            </h5>
            {categories.map(category => (
              <CategoryToggle
                key={category.value}
                className={category.value === activeCategory ? 'active' : ''}
                onClick={() => setActiveCategory(category.value)}>
                {category.label}
              </CategoryToggle>
            ))}
          </div>
        </div>
        {filteredGroupBuys.length > 0 ? (
          <Grid>
            {filteredGroupBuys.map(groupBuy => (
              <GroupBuy
                key={groupBuy.name}
                name={groupBuy.name}
                links={groupBuy.links}
                date={format(
                  new Date(
                    ...groupBuy.end
                      .split('-')
                      .map((n, i) => (i === 1 ? n - 1 : n))
                  ),
                  'LLL do, Y'
                )}
                images={groupBuy.images}
              />
            ))}
          </Grid>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <h1 style={{ marginTop: 0 }}>No results</h1>
            <p>Haha, oops</p>
          </div>
        )}
      </GridContainer>
    </Wide>
  )
}

export const query = graphql`
  query GroupBuyQuery {
    fauna {
      allGroupBuys {
        data {
          category
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
