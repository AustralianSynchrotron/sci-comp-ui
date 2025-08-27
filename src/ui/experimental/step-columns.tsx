import { useState } from 'react';

import { cn } from '../../lib/utils';

interface StepColumnsProps {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

export function StepColumns({ className, disabled = false, readOnly = false }: StepColumnsProps) {
    const [stepList, setStepList] = useState<Array<number | undefined>>([]);
    const [rowCount, setRowCount] = useState<number>(10);

    /**
     * Formats and returns pasted numerical spreadsheet rows/columns from clipboard, as arrays of column values (tested with Excel and Google Sheets).
     *
     * If empty cells or entirely empty rows/cols were pasted, they will be retained as empty (undefined) items, so it's exactly as it was copy-pasted by the user.
     *
     * @param {string} clipboard Pasted rows/cols
     * @return {(number | undefined)[][]} Array of column value arrays
     */
    const getPastedCols = (clipboard: string): (number | undefined)[][] => {
        // Get rows by splitting on newline character
        const pastedRows = clipboard.split(/[\n]/);
        const pastedCols: (number | undefined)[][] = [];

        pastedRows?.forEach((r) => {
            // Get columns by number of tab chars
            const cols = (r.match(/\t/g) || []).length + 1;

            // Add any missing cols to col array
            if (pastedCols.length < cols) {
                const delta = cols - pastedCols.length;
                let i = pastedCols.length;

                Array.from({ length: delta }, () => {
                    pastedCols[i] = [];
                    i++;
                });
            }

            // Get columns by splitting on tab character
            const v = r.split(/[\t]/);

            // For each value in the row, convert string to float or undefined, and push it to the column it belongs to
            v.forEach((val, col) => {
                // Trim to remove any carriage return char returned by Excel spreadsheets
                const f = parseFloat(val.trim());
                pastedCols[col].push(isNaN(f) ? undefined : f);
            });
        });

        return pastedCols;
    };

    // When user pastes into an input, replace/insert pasted values into steps
    const handleOnPasteSteps = (index: number, clipboard: string) => {
        const pastedCols = getPastedCols(clipboard);
        if (pastedCols.length < 1) return;

        const tempSteps: Array<number | undefined> = pastedCols[0];

        // Splice pasted steps in from step index that triggered Paste event
        const newSteps = [...stepList];
        newSteps.splice(index, tempSteps.length, ...tempSteps);

        // If spliced step count > row count, increase row count to match new steps count
        if (newSteps.length > rowCount) setRowCount(newSteps.length);

        // Update step list
        setStepList(newSteps);
    };

    return (
        <table className={cn('w-full', className)}>
            <thead>
                <tr>
                    <th>
                        <span className="flex h-[26px] w-full justify-end xl:h-7" id="step_controls-label">
                            Steps (mm)
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: rowCount }, (_, index) => (
                    <tr key={`step_controls-row_${index}`} className="h-[26px] p-0 xl:h-7">
                        <td
                            className={cn(
                                'pb-0 pl-0 pr-0',
                                index > 0 ? 'pt-1' : 'pt-0',
                                index % 2 ? '[&_input]:bg-white/50' : ''
                            )}
                            width={100}
                        >
                            <input
                                className={cn(
                                    'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                                    index % 2 ? 'bg-black/50' : ''
                                )}
                                id={`step_controls-row_${index}-input`}
                                aria-labelledby="step_controls-label"
                                title="Step Value"
                                placeholder="0"
                                type="number"
                                value={(stepList[index] as unknown as string) ?? ''}
                                onChange={(e) => {
                                    // Convert string to float or undefined
                                    const f = parseFloat(e.target.value);
                                    const a = isNaN(f) ? undefined : f;

                                    // Set updated list value to step list atom to manage flat array
                                    const list = [...stepList];
                                    list[index] = a;
                                    setStepList(list);
                                }}
                                onPaste={(e) => {
                                    // Prevent default to stop onChange also triggering
                                    e.preventDefault();
                                    handleOnPasteSteps(index, e.clipboardData.getData('Text'));
                                }}
                                readOnly={readOnly}
                                disabled={disabled}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
