export default function RxArray({ Rx }) {
  console.log();
  return (
    <ul>
      {Rx.map((mdc, index) => (
        <li key={index}>
          💊
          {mdc.name ? mdc.name : mdc}
          {mdc.dosage &&
            (typeof mdc.dosage === "string"
              ? ` - ${mdc.dosage}`
              : mdc.dosage.map((dsg, index) =>
                  index === 0 ? ` - ${dsg}` : ` | ${dsg}`
                ))}
          {mdc.quantity && ` - ${mdc.quantity}`}
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
          {mdc.alternative &&
            (Array.isArray(mdc.alternative) ? (
              <AlternativeArr alt={mdc.alternative} />
            ) : (
              <AlternativeObj alt={mdc.alternative} />
            ))}
        </li>
      ))}
    </ul>
  );
}

// : Object.values(mdc).slice(0, Object.values(mdc).length - 1)}

function AlternativeArr({ alt }) {
  return (
    <ul>
      {alt.map((mdc, index) => (
        <li key={index} className="altMdc opacity-80">
          <span>🔃 Ou: </span>
          {mdc.name ? mdc.name : mdc}
          {mdc.dosage && typeof mdc.dosage === "string"
            ? ` - ${mdc.dosage}`
            : mdc.dosage.map((dsg, index) =>
                index === 0 ? ` - ${dsg}` : ` | ${dsg}`
              )}
          {mdc.quantity && ` - ${mdc.quantity}`}
          {mdc.Instructions && <p>{mdc.Instructions}</p>}
        </li>
      ))}
    </ul>
  );
}

function AlternativeObj({ alt }) {
  return (
    <p className="altMdc opacity-80">
      <span>🔃 Ou: </span>
      {alt.name ? alt.name : alt}
      {alt.dosage && typeof alt.dosage === "string"
        ? ` - ${alt.dosage}`
        : alt.dosage.map((dsg, index) =>
            index === 0 ? `- ${dsg}` : ` | ${dsg}`
          )}
      {alt.quantity && ` - ${alt.quantity}`}
      {alt.Instructions && <p>{alt.Instructions}</p>}
    </p>
  );
}
