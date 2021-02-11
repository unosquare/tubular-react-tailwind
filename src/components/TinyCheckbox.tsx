import * as React from 'react';

type TinyCheckboxProps = Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'className' | 'ref'
> & { isIndeterminate?: boolean };
export const TinyCheckbox: React.FunctionComponent<TinyCheckboxProps> = (props: TinyCheckboxProps) => {
    const ref = React.useRef<any>();

    const { isIndeterminate, ...rest } = props;

    React.useEffect(() => {
        if (ref && ref.current) {
            ref.current.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);

    return (
        <input
            {...rest}
            ref={ref}
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
    );
};
