import * as React from 'react'
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent } from '../layout/collapsible'
import { cn } from '../../lib/utils'

// File tree data structure
export interface FileTreeItem {
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileTreeItem[]
}

interface FileBrowserProps {
  /** File tree data structure */
  data: FileTreeItem[]
  /** Whether folders are collapsible (default: true) */
  collapsible?: boolean
  /** Whether to show all folders expanded by default (default: false) */
  defaultExpanded?: boolean
  /** String prefix to add before file names */
  prefix?: string
  /** Callback when a file is clicked */
  onFileSelect?: (filePath: string) => void
  /** Custom class name */
  className?: string
}

const FileBrowser = React.forwardRef<
  HTMLDivElement,
  FileBrowserProps
>(({
  data,
  collapsible = true,
  defaultExpanded = false,
  prefix = '',
  onFileSelect,
  className
}, ref) => {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set(defaultExpanded ? getAllFolderPaths(data) : [])
  )

  // Get all folder paths for default expansion
  function getAllFolderPaths(items: FileTreeItem[]): string[] {
    const paths: string[] = []
    items.forEach(item => {
      if (item.type === 'folder' && item.children) {
        paths.push(item.path)
        paths.push(...getAllFolderPaths(item.children))
      }
    })
    return paths
  }

  const toggleFolder = React.useCallback((path: string) => {
    if (!collapsible) return
    
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }, [collapsible])

  const handleFileClick = React.useCallback((filePath: string) => {
    onFileSelect?.(filePath)
  }, [onFileSelect])

  const renderTreeItem = React.useCallback((item: FileTreeItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(item.path)
    const indent = level * 16

    if (item.type === 'folder') {
      const hasChildren = item.children && item.children.length > 0
      const showExpandIcon = collapsible && hasChildren
      
      return (
        <div key={item.path}>
          <div
            data-slot="file-browser-folder"
            className={cn(
              "flex items-center gap-2 py-1.5 px-2 hover:bg-accent/50 rounded-md cursor-pointer transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            style={{ paddingLeft: `${indent + 8}px` }}
            onClick={() => toggleFolder(item.path)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleFolder(item.path)
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} folder ${item.name}`}
          >
            {showExpandIcon && (
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
            )}
            <Folder className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-sm font-medium text-foreground truncate">
              {prefix}{item.name}
            </span>
          </div>
          
          {hasChildren && (
            <Collapsible open={isExpanded || !collapsible}>
              <CollapsibleContent>
                <div className="space-y-0">
                  {item.children!.map(child => renderTreeItem(child, level + 1))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      )
    }

    // File item
    return (
      <div
        key={item.path}
        data-slot="file-browser-file"
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 hover:bg-accent/50 rounded-md cursor-pointer transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
        style={{ paddingLeft: `${indent + 24}px` }}
        onClick={() => handleFileClick(item.path)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleFileClick(item.path)
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Select file ${item.name}`}
      >
        <File className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-foreground truncate">
          {prefix}{item.name}
        </span>
      </div>
    )
  }, [expandedFolders, collapsible, prefix, toggleFolder, handleFileClick])

  return (
    <div
      ref={ref}
      data-slot="file-browser"
      className={cn(
        "w-full space-y-0",
        className
      )}
    >
      {data.map(item => renderTreeItem(item))}
    </div>
  )
})
FileBrowser.displayName = "FileBrowser"

export { FileBrowser }