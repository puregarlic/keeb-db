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
import Fuse from 'fuse.js'

function filterGroupBuys(groupBuys, category) {
  return groupBuys.filter(groupBuy => groupBuy.category === category)
}

export async function sortGroupBuys(groupBuys, category) {
  const filteredGroupBuys = category
    ? filterGroupBuys(groupBuys, category)
    : groupBuys
  const [open, closed, upcoming, planned, cancelled] = [[], [], [], [], []]

  for (const groupBuy of filteredGroupBuys) {
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

  return { open, closed, upcoming, cancelled, planned }
}

const fuseOptions = {
  keys: ['name', 'links.label'],
  threshold: 0.3
}

export async function searchGroupBuys(query, groupBuys, category) {
  let results = groupBuys

  if (query) {
    const filteredGroupBuys = category
      ? filterGroupBuys(groupBuys, category)
      : groupBuys
    const fuse = new Fuse(filteredGroupBuys, fuseOptions)
    results = fuse.search(query)
  }

  return sortGroupBuys(results)
}
