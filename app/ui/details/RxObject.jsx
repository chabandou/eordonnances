export default function RxObject({ Rx }) {
  return Object.entries(Rx[0]).map(([key, value], index) =>
    index === 0 ? null : (
      <ul className="list-disc">
        <li className="list-item" key={index}>
          {key}:{" "}
          <ol>
            {typeof value === "string" ? (
              <li>{value}</li>
            ) : (
              value.map((mdc, index) => (
                <li key={index}>
                  💊 {mdc.name} {mdc.dosage && `- ${mdc.dosage}`}{" "}
                  {mdc.quantity && `- ${mdc.quantity}`}
                </li>
              ))
            )}
          </ol>
        </li>
      </ul>
    )
  );
}
