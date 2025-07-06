import { i18n } from '@/plugins/i18n'
import { LngLat, LngLatBounds, type LngLatLike } from 'maplibre-gl'

export const normalizeUrl = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

export const formatHTMLForSheetView = (rawHTML: string): string => {
  if (!rawHTML) return ''
  if (rawHTML === '<p></p>') return ''
  return rawHTML.replace(/<p><\/p>/g, '<br />')
}

export const uniqueArray = (array: any[], key = 'id') => {
  return array.filter((obj1, i, arr) => arr.findIndex((obj2) => obj2[key] === obj1[key]) === i)
}

export const reduceText = (text: string, length: number) => {
  if (text.length > length && text != null) {
    return text.slice(0, length) + '...'
  }
  return text
}

export const debounce = (func: any, wait = 500) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function getNestedObjectValue(obj: any, propStr = '') {
  const keys = propStr.split('.')
  return (
    keys.reduce((acc, key) => {
      if (!acc || !(key in acc)) return null
      return acc[key]
    }, obj) || null
  )
}

// duplicated: src/services/api/ApiPlatformService.ts:1
export function transformSymfonyRelationToIRIs<T>(entity: any): T {
  for (const key in entity) {
    if (Array.isArray(entity[key])) {
      entity[key] = transformSymfonyRelationToIRIs(entity[key])
    } else if (
      typeof entity[key] === 'object' &&
      !Array.isArray(entity[key]) &&
      entity[key] !== null &&
      '@id' in entity[key]
    ) {
      entity[key] = entity[key]['@id']
    }
  }
  return entity
}

export function localizeDate(
  date: string | Date,
  format: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
) {
  date = new Date(date)
  return date.toLocaleDateString('fr-FR', format)
}

export function localizeTime(
  date: string | Date,
  format: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' }
) {
  date = new Date(date)
  return date.toLocaleTimeString('fr-FR', format)
}

export function getDateRangeLabel(startAt: string | Date | null, endAt: string | Date | null) {
  if (!startAt) return ''
  startAt = new Date(startAt)
  startAt.setHours(0, 0, 0, 0)

  if (!endAt || isSameDay(startAt, endAt))
    return localizeDate(startAt, { year: 'numeric', month: 'long', day: 'numeric' })

  endAt = new Date(endAt)
  endAt.setHours(0, 0, 0, 0)

  const showStartAtMonth = startAt.getMonth() !== endAt.getMonth()
  const showStartAtYear = startAt.getFullYear() !== endAt.getFullYear()
  const localizedStartAt = localizeDate(startAt, {
    year: showStartAtYear ? 'numeric' : undefined,
    month: showStartAtMonth ? 'long' : undefined,
    day: 'numeric'
  })
  const localizedEndAt = localizeDate(endAt, { year: 'numeric', month: 'long', day: 'numeric' })
  return i18n.t('date.dateRangeLabel', { startAt: localizedStartAt, endAt: localizedEndAt })
}

export function getDateDiff(date1: string | Date, date2: string | Date): number {
  date1 = new Date(date1)
  date1.setHours(0, 0, 0, 0)
  date2 = new Date(date2)
  date2.setHours(0, 0, 0, 0)
  return date1.getTime() - date2.getTime()
}

export function isSameDay(date1: string | Date, date2: string | Date) {
  return getDateDiff(date1, date2) === 0
}

export function downloadJson(data: any, fileName: string) {
  if (!data.features || !data.features.length) return
  for (const feature of data.features) {
    feature.type = 'Feature'
  }
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${fileName}.geojson`
  link.click()
}

export async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return null
    }
    const blob = await response.blob()

    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error fetching image as base64:', error)
    return null
  }
}

export function getBboxFromPointsGroup(pointsGroup: LngLatLike[]): LngLatBounds {
  if (pointsGroup.length === 0) {
    return new LngLatBounds()
  }
  let minLat = Infinity,
    maxLat = -Infinity
  let minLng = Infinity,
    maxLng = -Infinity

  for (const { lat, lng } of pointsGroup as LngLat[]) {
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
  }

  return new LngLatBounds({ lng: minLng, lat: minLat }, { lng: maxLng, lat: maxLat })
}
