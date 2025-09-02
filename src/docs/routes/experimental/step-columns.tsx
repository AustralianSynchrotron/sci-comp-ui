import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '../../components/page-header';
import { StepColumns } from '../../../ui/experimental/step-columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/layout/card';
import { DemoContainer } from '../../components/demo-container';

export const Route = createFileRoute('/experimental/step-columns')({
    component: StepColumnsPage,
});

/* DEMO_START */
function StepColumnsDemo() {
    return (
        <div className="space-y-6">
            <h4 className="font-medium mb-3">Step Column</h4>
            <StepColumns />
        </div>
    );
}
/* DEMO_END */

const stepColumnsSource = __SOURCE__;

function StepColumnsPage() {
    return (
        <>
            <PageHeader
                breadcrumbs={[{ title: 'Experimental', href: '/experimental' }, { title: 'Step Columns' }]}
                pageHeading="Step Columns"
                pageSubheading="A column of steps input values that supports copy-pasting columns of values from Google Spreadsheets and Microsoft Excel."
            />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Copy-paste Supported Column</CardTitle>
                            <CardDescription>Description will go here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DemoContainer demo={<StepColumnsDemo />} source={stepColumnsSource} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
