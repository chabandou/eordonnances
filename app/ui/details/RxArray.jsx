export default function RxArray({Rx}) {
    return (
        <ul>
          {Rx.map((mdc, index) => (
            <li key={index}>
              💊 {mdc.name} {mdc.dosage && `- ${mdc.dosage}`} {mdc.quantity && `- ${mdc.quantity}`}
            </li>
          ))}
        </ul>
    );
}