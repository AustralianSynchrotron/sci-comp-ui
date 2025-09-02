import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../../components/page-header'
import { Calendar } from '../../../ui/components/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/layout/card'
import { DemoContainer } from '@/docs/components/demo-container'

export const Route = createFileRoute('/components/calendar')({
  component: CalendarPage,
})

/* DEMO_START */
function BasicCalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      {date && <p className="text-sm text-muted-foreground mt-4">Selected: {date.toLocaleDateString()}</p>}
    </div>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicCalendarSource = __SOURCE__

function CalendarPage() {

  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Calendar" }]}
        pageHeading="Calendar"
        pageSubheading="A date field component that allows users to enter and edit date."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Calendar</CardTitle>
              <CardDescription>A simple calendar for date selection</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicCalendarDemo />}
                source={basicCalendarSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
