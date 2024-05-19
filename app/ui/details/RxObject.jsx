export default function RxObject({ Rx }) {
  return Object.entries(Rx).map(([key, value], index) => (
    <ul className="list-disc" key={index}>
      <li className="list-item">
        {key}:{" "}
        <ol>
          {typeof value === "string" ? (
            <li>{value}</li>
          ) : (
            value.map((mdc, index) => (
              <li key={index}>
                💊 {mdc.name}{" "}
                {mdc.dosage &&
                  (typeof mdc.dosage === "string"
                    ? ` - ${mdc.dosage}`
                    : mdc.dosage.map((dsg, index) =>
                        index === 0 ? ` - ${dsg}` : ` | ${dsg}`
                      ))}
                {mdc.quantity && `- ${mdc.quantity}`}
                {mdc.instructions &&
                  (Array.isArray(mdc.instructions) ? (
                    <>
                      {mdc.instructions.map((inst, index) => (
                        <p key={index} className="ml-5 opacity-90">
                          - {inst}
                        </p>
                      ))}
                    </>
                  ) : (
                    <p>{mdc.instructions}</p>
                  ))}
                {mdc.Instructions &&
                  (Array.isArray(mdc.Instructions) ? (
                    <>
                      {mdc.Instructions.map((Inst, index) => (
                        <p key={index} className="ml-5 opacity-90">
                          - {Inst}
                        </p>
                      ))}
                    </>
                  ) : (
                    <p>{mdc.Instructions}</p>
                  ))}
              </li>
            ))
          )}
        </ol>
      </li>
    </ul>
  ));
}
