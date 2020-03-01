import React, { useRef, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from 'react-use'
import { parseISO, format } from 'date-fns'
import styled from '@emotion/styled'
import { Input } from '@rebass/forms'

import Wide from '../layouts/wide'
import SEO from '../components/seo'
import Loading from '../components/loading'
import GroupBuy from '../components/group-buy'
import SortingWorker from '../utils/workers/sort-group-buys.worker'

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: 200px 948px;
  gap: 48px;
  justify-content: center;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 0 48px;
    gap: 36px;
  }
`

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media screen and (max-width: 956px) {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }

  @media screen and (max-width: 676px) {
    grid-template-columns: 1fr;
  }
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
  box-shadow: 8px 8px 0 aquamarine;
  transition: 0.1s ease-in-out;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 6px 6px 0 aquamarine;
  }

  &:active {
    transform: translate(8px, 4px);
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
    translate(8px, 8px);
    box-shadow: none;
  }
`

const categories = [
  { label: 'Keycaps', value: 'CAPS' },
  { label: 'Keyboards', value: 'KEYBOARD' },
  { label: 'Switches', value: 'SWITCH' },
  { label: 'Miscellaneous', value: 'MISC' }
]

const listVariants = {
  hidden: {
    transition: {
      when: 'afterChildren'
    }
  },
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05
    }
  }
}

const IndexPage = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState('')
  const [groupBuys, setGroupBuys] = useState()
  const [searchEngine, setSearchEngine] = useState()
  const [query, setQuery] = useState('')
  const worker = useRef(null)

  function getServiceWorker() {
    if (!worker.current && typeof window !== undefined) {
      worker.current = new SortingWorker()
    }
    return worker.current
  }

  useEffect(() => {
    if (!query && worker.current) {
      getServiceWorker
        .sortGroupBuys(data.fauna.allGroupBuys.data, activeCategory)
        .then(result => setGroupBuys(result))
    }
  }, [query, activeCategory, data.fauna.allGroupBuys.data, worker.current])

  useDebounce(
    () => {
      if (query && groupBuys && worker.current) {
        getServiceWorker
          .searchGroupBuys(query, data.fauna.allGroupBuys.data, activeCategory)
          .then(res => setGroupBuys(res))
      }
    },
    50,
    [query]
  )

  return (
    <Wide>
      <SEO
        title="Group Buys"
        description="Browse and ogle at open, upcoming, and closed group buys."
      />
      <GridContainer>
        <div>
          <div style={{ position: 'sticky', top: '24px' }}>
            <h5
              style={{
                margin: 0,
                marginLeft: '4px',
                marginBottom: '12px',
                fontVariant: 'small-caps'
              }}>
              search
            </h5>
            <Input
              mb={4}
              onChange={e => setQuery(e.currentTarget.value)}
              placeholder="KAT Example..."
            />
            <h5
              style={{
                margin: 0,
                marginLeft: '4px',
                marginBottom: '12px',
                fontVariant: 'small-caps'
              }}>
              category
            </h5>
            {categories.map(category => (
              <CategoryToggle
                key={category.value}
                className={category.value === activeCategory ? 'active' : ''}
                onClick={() => {
                  setGroupBuys(undefined)
                  setActiveCategory(current =>
                    category.value === activeCategory ? '' : category.value
                  )
                }}>
                {category.label}
              </CategoryToggle>
            ))}
          </div>
        </div>
        {groupBuys ? (
          Object.values(groupBuys).every(list => list.length === 0) ? (
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
          ) : (
            <div>
              {groupBuys.open.length > 0 && (
                <>
                  <h1 style={{ marginTop: 0 }}>Open</h1>
                  <Grid
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}>
                    {groupBuys.open.map(groupBuy => (
                      <GroupBuy
                        key={`${groupBuy.name}-${groupBuy.end}`}
                        {...groupBuy}
                        date={{
                          label: 'ends',
                          time: format(
                            parseISO(groupBuy.status.end),
                            'MMM do, yyyy'
                          )
                        }}
                      />
                    ))}
                  </Grid>
                </>
              )}
              {groupBuys.upcoming.length > 0 && (
                <>
                  <h1 style={{ marginTop: '64px' }}>Upcoming</h1>
                  <Grid
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}>
                    {groupBuys.upcoming.map(groupBuy => (
                      <GroupBuy
                        key={`${groupBuy.name}-${groupBuy.end}`}
                        {...groupBuy}
                        date={{
                          label: 'starts',
                          time: format(
                            parseISO(groupBuy.status.start),
                            'MMM do, yyyy'
                          )
                        }}
                      />
                    ))}
                  </Grid>
                </>
              )}
              {groupBuys.planned.length > 0 && (
                <>
                  <h1 style={{ marginTop: '64px' }}>Planned</h1>
                  <Grid
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}>
                    {groupBuys.planned.map(groupBuy => (
                      <GroupBuy
                        key={`${groupBuy.name}-${groupBuy.end}`}
                        {...groupBuy}
                        date={{
                          label: 'estimated',
                          time: groupBuy.status.eta
                        }}
                      />
                    ))}
                  </Grid>
                </>
              )}
              {groupBuys.closed.length > 0 && (
                <>
                  <h1 style={{ marginTop: '64px' }}>Closed</h1>
                  <Grid
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}>
                    {groupBuys.closed.map(groupBuy => (
                      <GroupBuy
                        key={`${groupBuy.name}-${groupBuy.end}`}
                        {...groupBuy}
                        date={{
                          label: 'ended',
                          time: format(
                            parseISO(groupBuy.status.end),
                            'MMM do, yyyy'
                          )
                        }}
                      />
                    ))}
                  </Grid>
                </>
              )}
              {groupBuys.cancelled.length > 0 && (
                <>
                  <h1 style={{ marginTop: '64px' }}>Cancelled</h1>
                  <Grid
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}>
                    {groupBuys.cancelled.map(groupBuy => (
                      <GroupBuy
                        key={`${groupBuy.name}-${groupBuy.end}`}
                        {...groupBuy}
                      />
                    ))}
                  </Grid>
                </>
              )}
            </div>
          )
        ) : (
          <Loading />
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
          coverImage {
            url
            caption
            colors {
              vibrant {
                light
              }
              muted {
                light
              }
            }
            file {
              childImageSharp {
                fixed(
                  width: 294
                  height: 174
                  quality: 100
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          name
          status {
            start
            end
            eta
            state
          }
          images {
            url
            caption
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
