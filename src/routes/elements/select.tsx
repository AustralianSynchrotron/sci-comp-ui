import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from "../../docs/components/page-header"
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "../../ui/elements/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

export const Route = createFileRoute('/elements/select')({
  component: SelectPage,
})

/* DEMO_START */
function BasicSelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select beamline" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Beamlines</SelectLabel>
          <SelectItem value="1.1">Beamline 1.1 (XAS)</SelectItem>
          <SelectItem value="1.2">Beamline 1.2 (SAXS)</SelectItem>
          <SelectItem value="1.3">Beamline 1.3 (XFM)</SelectItem>
          <SelectItem value="1.4">Beamline 1.4 (MEX)</SelectItem>
          <SelectItem value="1.5">Beamline 1.5 (Crystallography)</SelectItem>
          <SelectItem value="1.6">Beamline 1.6 (Powder Diffraction)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
/* DEMO_END */

const basicSelectSource = __SOURCE__

function SelectPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Elements", href: "/elements" }, { title: "Select" }]}
        pageHeading="Select"
        pageSubheading="A form control that allows users to choose from a list of options."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Select</CardTitle>
              <CardDescription>Simple selection from a list of options</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<BasicSelectDemo />}
                source={basicSelectSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
