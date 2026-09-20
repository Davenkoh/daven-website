import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import type { Topic } from '@/data/types'
import { entriesByTopic, filterEntries } from '@/data'
import { SITE, TOPIC_LABEL } from '@/config/site.config'
import { useSiteStore } from '@/store/useSiteStore'
import { useAudioStore } from '@/store/useAudioStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useWheelFlip } from '@/hooks/useWheelFlip'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Icon } from '@/components/Icon'
import { buildBook, currentForPage } from './buildPages'
import { FilterBar } from './FilterBar'
import { FlipBook } from './FlipBook'
import { PageStack } from './PageStack'

/** Full-screen dialog holding one topic's flip-book. */
export default function BookOverlay({ topic }: { topic: Topic }) {
  const navigate = useNavigate()
  const filters = useSiteStore((s) => s.filters)
  const playForTopic = useAudioStore((s) => s.playForTopic)
  const entries = useMemo(() => filterEntries(entriesByTopic[topic], filters), [topic, filters])
  const book = useMemo(() => buildBook(topic, entries), [topic, entries])
  const single = useMediaQuery('(max-width: 767px), (orientation: portrait)')
  useDocumentTitle(`${TOPIC_LABEL[topic]} · ${SITE.name}`)

  // spread state = leaves turned; single-page state = page index. Every book opens on its cover.
  const [current, setCurrent] = useState(0)
  const [page, setPage] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const filtersKey = filters.join(',')
  const lastFilters = useRef(filtersKey)

  // filters changed → back to the contents page (ref comparison survives StrictMode's double effects)
  useEffect(() => {
    if (lastFilters.current === filtersKey) return
    lastFilters.current = filtersKey
    setCurrent(1)
    setPage(book.tocPageIndex)
  }, [filtersKey, book.tocPageIndex])

  // keep both cursors in range when filters shrink the book
  const safeCurrent = Math.min(current, book.leaves.length)
  const safePage = Math.min(page, book.pages.length - 1)

  useEffect(() => {
    playForTopic(topic)
  }, [topic, playForTopic])

  const close = useCallback(() => navigate('/'), [navigate])
  useFocusTrap(stageRef)

  const goToPage = useCallback(
    (pageIndex: number) => {
      setPage(pageIndex)
      setCurrent(currentForPage(pageIndex))
    },
    [],
  )
  const next = useCallback(() => {
    if (single) setPage((p) => Math.min(book.pages.length - 1, p + 1))
    else setCurrent((c) => Math.min(book.leaves.length, c + 1))
  }, [single, book])
  const prev = useCallback(() => {
    if (single) setPage((p) => Math.max(0, p - 1))
    else setCurrent((c) => Math.max(0, c - 1))
  }, [single])

  useWheelFlip(stageRef, { next, prev, enabled: !single })

  const onKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement
    if (/^(INPUT|TEXTAREA)$/.test(target.tagName)) return
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault()
        next()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        prev()
        break
      case 'Home':
        e.preventDefault()
        goToPage(book.tocPageIndex)
        break
      case 'End':
        e.preventDefault()
        goToPage(book.pages.length - 1)
        break
      case 'Escape':
        e.preventDefault()
        close()
        break
    }
  }

  const showTags = topic !== 'events'
  const ctx = useMemo(() => ({ topic, goToPage, showTags }), [topic, goToPage, showTags])

  return (
    <div className="book-overlay" role="dialog" aria-modal="true" aria-label={`${TOPIC_LABEL[topic]} book`}>
      <div className="book-backdrop" onClick={close} />
      <div
        className="book-stage"
        ref={stageRef}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <button type="button" className="book-close glass" onClick={close} aria-label="Close the book">
          <Icon name="close" size={18} />
        </button>
        <div className="book-top">
          <button type="button" className="book-cta" onClick={() => goToPage(book.tocPageIndex)}>
            Back to Content Page
          </button>
          {showTags && <FilterBar tone="dark" />}
        </div>
        {single ? (
          <PageStack book={book} page={safePage} onPageChange={setPage} ctx={ctx} />
        ) : (
          <FlipBook book={book} current={safeCurrent} onCurrentChange={setCurrent} ctx={ctx} />
        )}
        {!single && (
          <p className="book-hint">
            Click, scroll or use <kbd>←</kbd> <kbd>→</kbd>
          </p>
        )}
      </div>
    </div>
  )
}
