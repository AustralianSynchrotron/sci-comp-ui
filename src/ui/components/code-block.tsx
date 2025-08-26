import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "../../lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../elements/tooltip"

import { useEffect, useRef } from 'react';
import Prism from 'prismjs';

import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';

import 'prismjs/themes/prism.css';

interface CodeHighlightProps {
  code: string;
  language: 'javascript' | 'typescript' | 'python' | 'bash' | 'jsx' | 'tsx';
  className?: string;
}

export function CodeHighlight({ code, language, className = '' }: CodeHighlightProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <pre className={`language-${language} ${className}`}>
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
}

// Supported languages for syntax highlighting
const SUPPORTED_LANGUAGES = ['javascript', 'typescript', 'python', 'bash', 'jsx', 'tsx'] as const

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language, showLineNumbers = false, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)
    
    // Check if syntax highlighting should be applied
    const shouldHighlight = language && SUPPORTED_LANGUAGES.includes(language as any)
    const highlightLanguage = shouldHighlight ? language as typeof SUPPORTED_LANGUAGES[number] : undefined

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    }

    const lines = code.split("\n")

    return (
      <div ref={ref} className={cn("relative rounded-lg border bg-muted/50 font-mono text-sm", className)} {...props}>
        {/* Language label */}
        {language && (
          <div className="flex items-center justify-between border-b px-4 py-2 relative">
            <span className="text-xs font-medium text-muted-foreground uppercase">{language}</span>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-muted h-6 w-6"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}

        {!language && (
          <div className="absolute right-2 top-2 z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-muted h-8 w-8"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy code"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Code content */}
        <div className="overflow-x-auto">
          {shouldHighlight ? (
            <div className="p-4">
              {showLineNumbers ? (
                <div className="relative">
                  {/* Line numbers overlay */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-border/50 bg-muted/30">
                    {lines.map((_, index) => (
                      <div key={index} className="h-6 flex items-center justify-end pr-3 text-xs text-muted-foreground select-none">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  {/* Code with left padding to make room for line numbers */}
                  <div className="pl-12">
                    <CodeHighlight 
                      code={code} 
                      language={highlightLanguage!} 
                      className="!bg-transparent !p-0 !m-0"
                    />
                  </div>
                </div>
              ) : (
                <CodeHighlight 
                  code={code} 
                  language={highlightLanguage!} 
                  className="!bg-transparent !p-0 !m-0"
                />
              )}
            </div>
          ) : (
            <pre className={cn("p-4", language ? "pr-4" : "pr-12")}>
              <code className="text-sm">
                {showLineNumbers ? (
                  <div className="table w-full">
                    {lines.map((line, index) => (
                      <div key={index} className="table-row">
                        <span className="table-cell pr-4 text-right text-muted-foreground select-none">{index + 1}</span>
                        <span className="table-cell">{line}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  code
                )}
              </code>
            </pre>
          )}
        </div>
      </div>
    )
  },
)

CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
