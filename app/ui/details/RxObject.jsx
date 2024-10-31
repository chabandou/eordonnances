export default function RxObject({ Rx }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-black/90 my-20">
      <ul className="list-disc w-[85%] translate-x-[2%] space-y-4">
        {Object.entries(Rx).map(([key, value], index) => (
          <li className="list-item" key={index}>
            <span className="font-bold text-lg mb-4">{key}:</span>
            <ol>
              {typeof value === "string" ? (
                <li>{value}</li>
              ) : (
                value.map((mdc, index) => (
                  <li className="w-full flex flex-col items-center" key={index}>
                    <div className="flex items-center justify-between w-full gap-x-2">
                      <span className="font-bold">
                        💊 {mdc.name ? mdc.name : mdc}
                      </span>
                      {mdc.dosage && (
                        <span className="h-[2px] bg-gray-900/90 w-fit grow" />
                      )}
                      {/* {mdc.name && getMedication(mdc.name)} //TODO: add getMedication function */}
                      <span>{mdc.quantity && mdc.quantity}</span>
                    </div>
                    <span>
                      {mdc.dosage &&
                        (typeof mdc.dosage === "string"
                          ? mdc.dosage
                          : mdc.dosage.map((dsg, index) =>
                              index === 0 ? dsg : ` | ${dsg}`
                            ))}
                    </span>
                    <span>
                      {mdc.instructions &&
                        (Array.isArray(mdc.instructions) ? (
                          <>
                            {mdc.instructions.map((inst, index) => (
                              <p key={index} className="ml-5 opacity-90">
                                {inst}
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
                                {Inst}
                              </p>
                            ))}
                          </>
                        ) : (
                          <p>{mdc.Instructions}</p>
                        ))}
                    </span>
                  </li>
                ))
              )}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
}
