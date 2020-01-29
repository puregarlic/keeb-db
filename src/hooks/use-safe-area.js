import { useCallback } from 'react'
import { useWindowSize } from 'react-use'
import useDimensions from 'react-use-dimensions'

export default function useSafeArea() {
  const { width: screenWidth, height: screenHeight } = useWindowSize()
  const [ref, dimensions] = useDimensions()

  const calculateArea = useCallback(
    (onlyX = true) => {
      const xAreas = [
        { area: 'left', distance: dimensions.x },
        {
          area: 'right',
          distance: screenWidth - (dimensions.x + dimensions.width)
        }
      ]

      let yAreas = []
      if (!onlyX) {
        yAreas = [
          { area: 'top', distance: dimensions.y },
          {
            area: 'bottom',
            distance: screenHeight - (dimensions.y + dimensions.height)
          }
        ]
      }

      const max = Math.max(
        ...xAreas.map(area => area.distance),
        ...yAreas.map(area => area.distance)
      )
      return [...xAreas, ...yAreas].find(area => area.distance === max).area
    },
    [dimensions, screenWidth, screenHeight]
  )

  return [ref, calculateArea, dimensions]
}
