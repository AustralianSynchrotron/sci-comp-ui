import { createFileRoute } from "@tanstack/react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { PageHeader } from "../../docs/components/page-header"
import { Button } from "../../ui/elements/button"
import { Input } from "../../ui/elements/input"
import { Textarea } from "../../ui/elements/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/elements/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/layout/card"
import { DemoContainer } from "@/docs/components/demo-container"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/components/form"
import { toast } from "sonner"

export const Route = createFileRoute("/components/form")({
  component: FormPage,
})

/* DEMO_START */
const sampleFormSchema = z.object({
  sampleId: z.string().min(3, "Sample ID must be at least 3 characters"),
  researcher: z.string().min(2, "Researcher name must be at least 2 characters"),
  temperature: z.number().min(-273.15, "Temperature cannot be below absolute zero").max(1000, "Temperature cannot exceed 1000°C"),
  notes: z.string().optional(),
})

type SampleFormData = z.infer<typeof sampleFormSchema>

function SampleDataForm() {
  const form = useForm<SampleFormData>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      sampleId: "",
      researcher: "",
      temperature: 0,
      notes: "",
    },
  })

  function onSubmit(values: SampleFormData) {
    toast.success("Sample data submitted successfully!", {
      description: `Sample ${values.sampleId} recorded by ${values.researcher}`,
    })
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sampleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sample ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., SA-001" {...field} />
              </FormControl>
              <FormDescription>
                Unique identifier for this sample.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="researcher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Researcher</FormLabel>
              <FormControl>
                <Input placeholder="Dr. Jane Smith" {...field} />
              </FormControl>
              <FormDescription>
                Name of the researcher conducting the experiment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature (°C)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="25.0" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                />
              </FormControl>
              <FormDescription>
                Sample temperature in Celsius (-273.15 to 1000°C).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional observations or comments..." 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Optional notes about the sample or experiment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Sample Data</Button>
      </form>
    </Form>
  )
}
/* DEMO_END */

// This gets replaced at build time with the actual source code
const basicFormSource = __SOURCE__

/* DEMO_START */
const experimentFormSchema = z.object({
  experimentId: z.string().min(5, "Experiment ID must be at least 5 characters").regex(/^EXP-\d{3}$/, "Format must be EXP-XXX"),
  hypothesis: z.string().min(10, "Hypothesis must be at least 10 characters"),
  substance: z.enum(["water", "ethanol", "acetone", "benzene", "other"]),
  concentration: z.number().min(0, "Concentration must be positive").max(100, "Concentration cannot exceed 100%"),
  pH: z.number().min(0, "pH cannot be negative").max(14, "pH cannot exceed 14"),
  duration: z.number().min(1, "Duration must be at least 1 minute").max(1440, "Duration cannot exceed 24 hours"),
  safetyChecked: z.boolean().refine((val) => val === true, {
    message: "Safety protocols must be acknowledged",
  }),
})

type ExperimentFormData = z.infer<typeof experimentFormSchema>

function ExperimentForm() {
  const form = useForm<ExperimentFormData>({
    resolver: zodResolver(experimentFormSchema),
    defaultValues: {
      experimentId: "",
      hypothesis: "",
      substance: undefined,
      concentration: 0,
      pH: 7,
      duration: 60,
      safetyChecked: false,
    },
  })

  function onSubmit(values: ExperimentFormData) {
    toast.success("Experiment logged successfully!", {
      description: `${values.experimentId} - ${values.substance} at ${values.concentration}% concentration`,
    })
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="experimentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experiment ID</FormLabel>
                <FormControl>
                  <Input placeholder="EXP-001" {...field} />
                </FormControl>
                <FormDescription>
                  Format: EXP-XXX (e.g., EXP-123)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="substance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Substance</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select substance..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="ethanol">Ethanol</SelectItem>
                      <SelectItem value="acetone">Acetone</SelectItem>
                      <SelectItem value="benzene">Benzene</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>&nbsp;</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="hypothesis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hypothesis</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="State your hypothesis for this experiment..." 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Describe what you expect to observe or measure.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="concentration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concentration (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.1"
                    placeholder="50.0" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pH"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pH Level</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.1"
                    placeholder="7.0" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 7)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (min)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="60" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 60)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="safetyChecked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Safety protocols acknowledged
                </FormLabel>
                <FormDescription>
                  I confirm that all safety measures have been reviewed and proper PPE will be used.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Start Experiment</Button>
        </div>
      </form>
    </Form>
  )
}
/* DEMO_END */

const formLayoutSource = __SOURCE__

function FormPage() {
  return (
    <>
      <PageHeader 
        breadcrumbs={[{ title: "Components", href: "/components" }, { title: "Form" }]}
        pageHeading="Form"
        pageSubheading="A form component with validation and layout options."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Simple Validation Form</CardTitle>
              <CardDescription>A basic form</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<SampleDataForm />}
                source={basicFormSource}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation Form with Multiple Rules</CardTitle>
              <CardDescription>A form with multiple validation rules</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoContainer
                demo={<ExperimentForm />}
                source={formLayoutSource}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

