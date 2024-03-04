export default function RxArray({ Rx }) {
  return (
    <ul>
      {Rx.map((mdc, index) => (
        <li key={index}>
          💊{" "}
          {mdc.name
            ? mdc.name
            : Object.values(mdc).slice(0, Object.values(mdc).length - 1)}{" "}
          {mdc.dosage && `- ${mdc.dosage}`}{" "}
          {mdc.quantity && `- ${mdc.quantity}`}
        </li>
      ))}
    </ul>
  );
}
