import { useEffect, useRef, useState } from "react"
import { Button } from "../elements/button"
import { Input } from "../elements/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../elements/select"
import { ScrollArea } from "../layout/scroll-area"
import { Badge } from "../elements/badge"
import {
  Search,
  Download,
  ChevronsUp,
  ChevronsDown,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

import { cn } from "../../lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../layout/card"

interface TextLogProps {
  title?: string
  content: string[]
  className?: string
  initialItemsPerPage?: number
  itemsPerPageOptions?: number[]
  onRefresh?: () => void
}

export function TextLog({
  title,
  content,
  className,
  initialItemsPerPage = 50,
  itemsPerPageOptions = [10, 25, 50, 100, 250],
  onRefresh,
}: TextLogProps) {
  // Refs
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)



  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{ index: number; line: string }>>([])
  const [currentMatch, setCurrentMatch] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Calculate total pages
  const totalPages = Math.ceil(content.length / itemsPerPage)

  // Calculate current visible entries
  const startEntry = (currentPage - 1) * itemsPerPage + 1
  const endEntry = Math.min(currentPage * itemsPerPage, content.length)

  // Basic text search function
  const performSearch = (query: string, content: string[]) => {
    if (query.trim() === "") {
      return []
    }

    const results: Array<{ index: number; line: string }> = []
    const searchTerm = query.toLowerCase()

    content.forEach((line, index) => {
      if (line.toLowerCase().includes(searchTerm)) {
        results.push({ index, line })
      }
    })

    return results
  }

  // Handle search
  useEffect(() => {
    const results = performSearch(searchQuery, content)
    setSearchResults(results)
    setCurrentMatch(0)

    // If we have results, navigate to the first match
    if (results.length > 0) {
      navigateToLine(results[0].index)
    }
  }, [searchQuery, content])



  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+F for search
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault()
        setIsSearchOpen(true)
        document.getElementById("log-search-input")?.focus()
      }

      // Ctrl+Home for jump to top
      if (e.ctrlKey && e.key === "Home") {
        e.preventDefault()
        jumpToTop()
      }

      // Ctrl+End for jump to bottom
      if (e.ctrlKey && e.key === "End") {
        e.preventDefault()
        jumpToBottom()
      }

      // F3 or Enter in search to navigate to next match
      if (e.key === "F3" || (isSearchOpen && e.key === "Enter" && !e.shiftKey)) {
        e.preventDefault()
        navigateToNextMatch()
      }

      // Shift+F3 or Shift+Enter in search to navigate to previous match
      if ((e.key === "F3" && e.shiftKey) || (isSearchOpen && e.key === "Enter" && e.shiftKey)) {
        e.preventDefault()
        navigateToPrevMatch()
      }

      // Escape to close search
      if (e.key === "Escape" && isSearchOpen) {
        e.preventDefault()
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearchOpen, searchResults, currentMatch])

  // Navigation functions
  const jumpToTop = () => {
    const vp = viewportRef.current
    if (!vp) return
    vp.scrollTo({ top: 0, behavior: "smooth" })
  }

  const jumpToBottom = () => {
    const vp = viewportRef.current
    if (!vp) return
    // More robust in Safari: clamp to max (scrollHeight - clientHeight)
    const maxTop = Math.max(0, vp.scrollHeight - vp.clientHeight)
    vp.scrollTo({ top: maxTop, behavior: "smooth" })
  }



  const navigateToLine = (lineIndex: number) => {
    // Calculate which page this line is on
    const page = Math.floor(lineIndex / itemsPerPage) + 1
    setCurrentPage(page)

    // Scroll to the line if it's visible
    const lineElement = document.getElementById(`log-line-${lineIndex}`)
    if (lineElement) {
      lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const navigateToNextMatch = () => {
    if (searchResults.length === 0) return

    const nextMatch = (currentMatch + 1) % searchResults.length
    setCurrentMatch(nextMatch)
    navigateToLine(searchResults[nextMatch].index)
  }

  const navigateToPrevMatch = () => {
    if (searchResults.length === 0) return

    const prevMatch = (currentMatch - 1 + searchResults.length) % searchResults.length
    setCurrentMatch(prevMatch)
    navigateToLine(searchResults[prevMatch].index)
  }

  // Pagination functions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = Number.parseInt(value)
    setItemsPerPage(newItemsPerPage)

    // Adjust current page to keep the same starting entry visible
    const newTotalPages = Math.ceil(content.length / newItemsPerPage)
    const newPage = Math.min(Math.ceil(startEntry / newItemsPerPage), newTotalPages)
    setCurrentPage(newPage)
  }

  // Save log as text file
  const saveAsTextFile = () => {
    const text = content.join("\n")
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${title || "log"}-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Handle manual refresh
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
    }
  }

  // Get current page content
  const getCurrentPageContent = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, content.length)
    return content.slice(startIndex, endIndex).map((line, index) => ({
      line,
      originalIndex: startIndex + index
    }))
  }

  // Render a line with highlighting for search matches
  const renderLine = (line: string, index: number) => {
    if (searchQuery.trim() === "") {
      return line
    }

    // Check if this line is a search match
    const isMatch = searchResults.some((result) => result.index === index)
    const isCurrentMatch = searchResults[currentMatch]?.index === index

    if (!isMatch) {
      return line
    }

    // Simple highlighting for matched text - escape regex special characters
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, "gi")
    const parts = line.split(regex)

    return (
      <span className={cn(isCurrentMatch && "bg-yellow-200 dark:bg-yellow-800")}>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="bg-yellow-100 dark:bg-yellow-900">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    )
  }

  // Render a log line
  const renderLogLine = (line: string, originalIndex: number) => {
    const isMatch = searchResults.some((result) => result.index === originalIndex)
    const isCurrentMatch = searchResults[currentMatch]?.index === originalIndex

    return (
      <div
        key={originalIndex}
        id={`log-line-${originalIndex}`}
        className={cn(
          "flex items-start font-mono text-xs py-1 border-b border-gray-100 dark:border-gray-800",
          isMatch && "bg-yellow-50 dark:bg-yellow-950/30",
          isCurrentMatch && "bg-yellow-100 dark:bg-yellow-900/30",
        )}
      >
        <div className="w-12 flex-shrink-0 text-right pr-4 text-gray-500 select-none">{originalIndex + 1}</div>
        <div className="flex-1 overflow-hidden">{renderLine(line, originalIndex)}</div>
      </div>
    )
  }

  return (
    <Card className={cn(className)}>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {title && <CardTitle>{title}</CardTitle>}
        <div className="flex items-center gap-2 ml-auto">
          {isSearchOpen && (
            <div className="flex items-center gap-2">
              <Input
                id="log-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search logs..."
                className="w-64"
              />

              {searchResults.length > 0 && (
                <>
                  <Badge variant="secondary">
                    {currentMatch + 1}/{searchResults.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={navigateToPrevMatch}
                    disabled={searchResults.length === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={navigateToNextMatch}
                    disabled={searchResults.length === 0}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          )}

          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search logs">
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={saveAsTextFile} aria-label="Download logs">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Log content */}
      <CardContent className="p-0 bg-muted/50">
        <div className="relative flex-1 min-h-[300px]">
          <ScrollArea className="h-[300px]" viewportRef={viewportRef}>
            <div ref={contentRef} className="p-2">
              {getCurrentPageContent().map(({ line, originalIndex }) =>
                renderLogLine(line, originalIndex)
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between p-2 border-t">
        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            First
          </Button>
          <Button variant="outline" size="icon" onClick={goToPrevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button variant="outline" size="icon" onClick={goToNextPage} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>

          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status information */}
        <div className="text-sm text-center text-muted-foreground">
          Showing entries {startEntry}-{endEntry} of {content.length}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={jumpToTop} aria-label="Jump to top">
            <ChevronsUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={jumpToBottom} aria-label="Jump to bottom">
            <ChevronsDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            aria-label="Refresh logs"
            disabled={!onRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
