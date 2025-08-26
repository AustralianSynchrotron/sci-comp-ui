import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "../../docs/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/layout/card"
import { Button } from "../../ui/elements/button"
import { Badge } from "../../ui/elements/badge"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute("/layout/card")({
  component: CardPage,
})

/* DEMO_START */
function BasicCardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicCardSource = __SOURCE__

/* DEMO_START */
function CardVariantsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Content Card</CardTitle>
            <Badge>Featured</Badge>
          </div>
          <CardDescription>A content showcase card</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-md mb-4"></div>
          <p className="text-sm">This is a content description with an image placeholder above.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">Last updated: Today</span>
          <Button size="sm">View Details</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Metrics Card</CardTitle>
          <CardDescription>Display key information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+20.1% from previous period</p>
        </CardContent>
      </Card>
    </div>
  )
}
/* DEMO_END */

const cardVariantsSource = __SOURCE__

/* DEMO_START */
function CardGridDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Feature 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Description of the first feature.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Feature 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Description of the second feature.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Feature 3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Description of the third feature.</p>
        </CardContent>
      </Card>
    </div>
  )
}
/* DEMO_END */

const cardGridSource = __SOURCE__

function CardPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Layout", href: "/layout" }, { title: "Card" }]}
        pageHeading="Card"
        pageSubheading="Displays a card with header, content, and footer."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card with header, content, and footer</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicCardDemo />}
                source={basicCardSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Variants</CardTitle>
              <CardDescription>Different card styles and layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CardVariantsDemo />}
                source={cardVariantsSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Grid</CardTitle>
              <CardDescription>Multiple cards in a responsive grid</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<CardGridDemo />}
                source={cardGridSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
