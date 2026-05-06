import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../lib/utils';

function CustomSlider({
    customClasses,
    customClassesTrack,
    customClassesRange,
    customClassesThumb,
    customClassesTooltip,
    id = '',
    name,
    labelledBy = '',
    describedBy,
    readOnly = false,
    disabled = false,
    warning = false,
    alert = false,
    defaultValue,
    value,
    min = 0,
    max = 100,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
    customClasses?: string;
    customClassesTrack?: string;
    customClassesRange?: string;
    customClassesThumb?: string;
    customClassesTooltip?: string;
    id?: string;
    name?: string;
    labelledBy?: string;
    describedBy?: string;
    readOnly?: boolean;
    warning?: boolean;
    alert?: boolean;
}) {
    const sortedValues = React.useMemo(() => {
        // Default behavior: sort values in ascending order
        const values = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max];
        return values.sort((a, b) => a - b);
    }, [value, defaultValue, min, max]);

    return (
        <SliderPrimitive.Root
            id={id}
            name={name}
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            disabled={disabled || readOnly}
            aria-readonly={readOnly}
            className={cn(
                'group/root relative flex w-full cursor-pointer touch-none items-center select-none data-disabled:cursor-default data-[orientation=horizontal]:my-0.5 data-[orientation=horizontal]:h-6 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-6 data-[orientation=vertical]:flex-col',
                customClasses,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                    'bg-disabled-light/70 relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
                    customClassesTrack,
                )}
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn(
                        'absolute rounded-full transition-colors duration-(--duration-short) data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
                        !warning &&
                            !alert &&
                            !disabled &&
                            'bg-gradient group-[:not([data-disabled]):hover]/root:bg-gradient-light group-[:not([data-disabled]):focus]/root:bg-gradient-light',
                        warning &&
                            'bg-warning-dark group-[:not([data-disabled]):hover]/root:bg-warning group-[:not([data-disabled]):focus]/root:bg-warning',
                        alert &&
                            'bg-alert-dark group-[:not([data-disabled]):hover]/root:bg-alert group-[:not([data-disabled]):focus]/root:bg-alert',
                        disabled && 'data-disabled:bg-disabled',
                        customClassesRange,
                    )}
                />
            </SliderPrimitive.Track>
            {Array.from(sortedValues, (val, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    aria-labelledby={labelledBy}
                    aria-describedby={describedBy}
                    className={cn(
                        'group/thumb relative block size-6 shrink-0 rounded-full transition-colors duration-(--duration-short) focus:outline-none',
                        !warning &&
                            !alert &&
                            !disabled &&
                            'bg-gradient group-[:not([data-disabled]):hover]/root:bg-gradient-light group-[:not([data-disabled]):focus]/root:bg-gradient-light',
                        warning &&
                            'bg-warning-dark group-[:not([data-disabled]):hover]/root:bg-warning group-[:not([data-disabled]):focus]/root:bg-warning',
                        alert &&
                            'bg-alert-dark group-[:not([data-disabled]):hover]/root:bg-alert group-[:not([data-disabled]):focus]/root:bg-alert',
                        disabled && 'data-disabled:bg-disabled',
                        customClassesThumb,
                    )}
                >
                    <span
                        className={cn(
                            'type-meta invisible absolute bottom-[calc(100%+4px)] left-1/2 hidden transform-[translateX(-50%)] rounded-xs px-0.5 font-normal text-white transition-opacity transition-discrete duration-(--duration-short) group-hover/thumb:visible group-hover/thumb:block before:absolute before:top-full before:left-1/2 before:block before:transform-[translateX(-50%)] before:border-t-4 before:border-r-4 before:border-l-4 before:border-r-transparent before:border-l-transparent before:content-[""] starting:opacity-0',
                            !warning &&
                                !alert &&
                                !disabled &&
                                'bg-gradient-light before:border-t-gradient-light group-aria-readonly/root:bg-gradient group-aria-readonly/root:before:border-t-gradient',
                            warning &&
                                !disabled &&
                                'bg-warning before:border-t-warning group-aria-readonly/root:bg-warning-dark group-aria-readonly/root:before:border-t-warning-dark',
                            alert &&
                                !disabled &&
                                'bg-alert before:border-t-alert group-aria-readonly/root:bg-alert-dark group-aria-readonly/root:before:border-t-alert-dark',
                            disabled && 'bg-disabled before:border-t-disabled',
                            customClassesTooltip,
                        )}
                    >
                        {val}
                    </span>
                </SliderPrimitive.Thumb>
            ))}
        </SliderPrimitive.Root>
    );
}

export { CustomSlider };
