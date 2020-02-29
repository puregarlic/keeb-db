import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'
import {
  compareAsc,
  parseISO,
  isPast,
  isFuture,
  isToday,
  parse,
  format,
  compareDesc,
  getQuarter
} from 'date-fns'
import styled from '@emotion/styled'

import Wide from '../layouts/wide'
import SEO from '../components/seo'
import Loading from '../components/loading'
import GroupBuy from '../components/group-buy'

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
  const [activeCategory, setActiveCategory] = useState('CAPS')
  const [groupBuys, setGroupBuys] = useState()

  useEffect(() => {
    const selectedGroupBuys = data.fauna.allGroupBuys.data.filter(
      groupBuy => groupBuy.category === activeCategory
    )
    selectedGroupBuys.sort((groupBuyA, groupBuyB) =>
      compareAsc(parseISO(groupBuyA.status.end), parseISO(groupBuyB.status.end))
    )

    const [open, closed, upcoming, planned, cancelled] = [[], [], [], [], []]

    for (const groupBuy of selectedGroupBuys) {
      switch (groupBuy.status.state) {
        case 'PLANNED':
          planned.push(groupBuy)
          break
        case 'CANCELLED':
          cancelled.push(groupBuy)
          break
        default:
          const {
            status: { start, end }
          } = groupBuy
          if (start && isFuture(parseISO(start))) upcoming.push(groupBuy)
          else if (
            start &&
            (isPast(parseISO(start)) || isToday(parseISO(start))) &&
            end &&
            (isFuture(parseISO(end)) || isToday(parseISO(end)))
          )
            open.push(groupBuy)
          else if (end && isPast(parseISO(end))) closed.push(groupBuy)
      }
    }

    open.sort((a, b) =>
      compareAsc(parseISO(a.status.end), parseISO(b.status.end))
    )
    closed.sort((a, b) =>
      compareDesc(parseISO(a.status.end), parseISO(b.status.end))
    )
    upcoming.sort((a, b) =>
      compareAsc(parseISO(a.status.start), parseISO(b.status.start))
    )
    cancelled.sort((a, b) => {
      const aText = a.name
      const bText = b.name
      return aText < bText ? -1 : aText > bText ? 1 : 0
    })
    planned.sort((a, b) => {
      let aDate, bDate, aMonth, bMonth
      try {
        aDate = parse(a.status.eta, 'LLLL yyyy')
        aMonth = true
      } catch (error) {
        aDate = parse(a.status.eta, 'qqq yyyy', new Date())
      }

      try {
        bDate = parse(b.status.eta, 'LLLL yyyy')
        bMonth = true
      } catch (error) {
        bDate = parse(b.status.eta, 'qqq yyyy', new Date())
      }

      let sortModifier = 1
      if ((aMonth || bMonth) && getQuarter(aDate) === getQuarter(bDate)) {
        sortModifier = -1
      }
      return compareAsc(aDate, bDate) * sortModifier
    })

    setGroupBuys({
      open,
      closed,
      upcoming,
      planned,
      cancelled
    })
  }, [activeCategory, data.fauna.allGroupBuys.data])

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
                  setActiveCategory(category.value)
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
