export function Rtif({boolean, ...props}) {
    const { children } = props;
    if (boolean)
        return (
            {...children}
        );
    return null;
}