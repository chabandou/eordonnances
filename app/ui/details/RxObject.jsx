import clsx from "clsx";

export default function RxObject({ Rx }) {
  return (
    <div className="w-full min-h-full flex flex-col justify-center items-center text-black/90 mt-[5rem] mb-8">
      <ul className="list-disc w-[97%] space-y-4 text-lg text-gray-900/90 pb-8">
        {Object.entries(Rx).map(([key, value], index) => (
          <li className="list-item" key={index}>
            <span className="font-bold text-lg mb-4">{key}:</span>
            <ol>
              {typeof value === "string" ? (
                <li>{value}</li>
              ) : (
                value.map((mdc, index) => (
                  <li className="w-full flex flex-col items-center" key={index}>
                    <div className="flex items-start justify-between w-full gap-x-2">
                      <span className={clsx("text-lg lg:text-lg font-bold lg:leading-snug", (!mdc.quantity) ? "max-w-full" : "max-w-[33.33%]")}>
                        💊 {mdc.name ? mdc.name : mdc}
                      </span>
                      {mdc.dosage && (
                        <span className="h-[2px] mt-[calc(1.75rem/2)] bg-gray-900/90 w-fit grow" />
                      )}
                      {/* {mdc.name && getMedication(mdc.name)} //TODO: add getMedication function */}
                      <span className={clsx(mdc.quantity?.length > 5 ? "w-1/3" : "w-fit", "md:w-max text-md lg:text-lg lg:leading-normal")}>{mdc.quantity && mdc.quantity}</span>
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
