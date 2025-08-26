import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { PageHeader } from "../../docs/components/page-header"
import { TextLog } from '../../ui/experimental/text-log'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/experimental/text-log')({
  component: TextLogPage,
})

// Generate realistic Python-style log data
const generatePythonLogData = () => {
  const logLevels = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']
  const modules = ['data_processor', 'auth_service', 'db_manager', 'api_handler', 'file_manager', 'cache_system', 'scheduler']
  const functions = ['process_request', 'validate_user', 'execute_query', 'handle_response', 'load_config', 'cleanup_temp', 'send_notification']
  
  const logMessages = [
    'Starting application initialization',
    'Database connection established successfully',
    'Loading configuration from environment variables',
    'User authentication successful for user_id: {user_id}',
    'Processing batch job with {count} items',
    'Cache miss for key: {key}',
    'API request received: {method} {endpoint}',
    'File upload completed: {filename} ({size} bytes)',
    'Database query executed in {time}ms',
    'Memory usage: {memory}MB, CPU: {cpu}%',
    'Scheduled task executed successfully',
    'Session expired for user: {user}',
    'Rate limit exceeded for IP: {ip}',
    'Failed to connect to external service',
    'Retrying operation (attempt {attempt}/3)',
    'Background task completed',
    'Invalid request parameter: {param}',
    'Security alert: suspicious activity detected',
    'Data validation failed for field: {field}',
    'System health check passed'
  ]

  const logs: string[] = []
  const startTime = new Date()
  startTime.setHours(startTime.getHours() - 2) // Start 2 hours ago

  for (let i = 0; i < 150; i++) {
    const timestamp = new Date(startTime.getTime() + i * 30000) // Every 30 seconds
    const level = logLevels[Math.floor(Math.random() * logLevels.length)]
    const module = modules[Math.floor(Math.random() * modules.length)]
    const func = functions[Math.floor(Math.random() * functions.length)]
    const message = logMessages[Math.floor(Math.random() * logMessages.length)]
    
    // Replace placeholders with realistic values
    const processedMessage = message
      .replace('{user_id}', `usr_${Math.floor(Math.random() * 10000)}`)
      .replace('{count}', Math.floor(Math.random() * 1000).toString())
      .replace('{key}', `cache_${Math.random().toString(36).substring(7)}`)
      .replace('{method}', ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)])
      .replace('{endpoint}', ['/api/users', '/api/data', '/api/auth', '/api/files'][Math.floor(Math.random() * 4)])
      .replace('{filename}', `document_${Math.random().toString(36).substring(7)}.pdf`)
      .replace('{size}', (Math.floor(Math.random() * 5000000)).toLocaleString())
      .replace('{time}', Math.floor(Math.random() * 500).toString())
      .replace('{memory}', Math.floor(Math.random() * 2048).toString())
      .replace('{cpu}', Math.floor(Math.random() * 100).toString())
      .replace('{user}', `user_${Math.floor(Math.random() * 100)}`)
      .replace('{ip}', `192.168.1.${Math.floor(Math.random() * 255)}`)
      .replace('{attempt}', Math.floor(Math.random() * 3 + 1).toString())
      .replace('{param}', ['limit', 'offset', 'filter', 'sort'][Math.floor(Math.random() * 4)])
      .replace('{field}', ['email', 'username', 'password', 'phone'][Math.floor(Math.random() * 4)])

    const timeStr = timestamp.toISOString().replace('T', ' ').substring(0, 23)
    const logLine = `${timeStr} [${level.padEnd(8)}] ${module}.${func}: ${processedMessage}`
    
    logs.push(logLine)
  }

  return logs
}

/* DEMO_START */
function PythonLogDemo() {
  const [logData] = useState(() => generatePythonLogData())

  return (
    <div className="space-y-4">
      <TextLog
        title="Application Logs"
        content={logData}
        initialItemsPerPage={25}
        className="h-[500px]"
      />
    </div>
  )
}
/* DEMO_END */

const pythonLogSource = __SOURCE__

function TextLogPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Text Log" }]}
        pageHeading="Text Log"
        pageSubheading="A text log viewer with search, pagination, and export capabilities."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Python Application Logs</CardTitle>
              <CardDescription>
                Log viewer featuring search, pagination, and export functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<PythonLogDemo />}
                source={pythonLogSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
