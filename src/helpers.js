export default function makeValidatorForRange(a, b) {
    return (n) => (a <= n && n <= b);
}
