import Medication from "../../../models/medicationModel";
import { connectToMongoDB } from "../../../app/libs/mongodb";
import clsx from "clsx";

export default async function RxArray({ Rx }) {
  async function getMedication(name) {
    // const response = await fetch(
    //   `http://localhost:3000/api/medications/${name}`
    // );
    await connectToMongoDB("getMadication");
    if (name.includes("|")) {
      const preName = name.split("|");
      // const preName2 = preName[0].split(" ")[0]+`${preName[1]}`;
      const mdcNameArray = preName[0].split(" ");
      // const mdcNameArray2 = preName2?.split(" ");
      const q =
        mdcNameArray[0] === "srp"
          ? "sirop"
          : mdcNameArray[0] === "cp"
          ? "comprimé"
          : mdcNameArray[0];
      const query = { nom: { $regex: `${q}`, $options: "i" } };
      await connectToMongoDB("getMadication");
      const foundMdc = await Medication.find(query).limit(1);
      return console.log(foundMdc);
    } else {
      const mdcNameArray = name.split(" ");
      const query = {
        $and: mdcNameArray.map((q) =>
          q === "srp"
            ? { nom: { $regex: `sirop`, $options: "i" } }
            : q === "cp"
            ? { nom: { $regex: `comprimé`, $options: "i" } }
            : { nom: { $regex: `${q}`, $options: "i" } }
        ),
      };
      
      await connectToMongoDB("getMadication");
      const foundMdc = await Medication.find(query).limit(1);
      if (foundMdc) {
        return console.log(foundMdc);
      }
    }
  }
  return (
    <div className="Rx-content w-full min-h-full flex justify-center mt-[5rem] mb-8">
      <ul className="w-[97%] space-y-6 text-lg text-gray-900/90 pb-8">
      {/* // list medications */}

        {Rx.map((mdc, index) => (
          <li className="w-full flex flex-col items-center" key={index}>
            {/* // Display medication name and quantity */}
            <div className="flex items-start justify-between w-full gap-x-2">
              <span className={clsx("text-lg lg:text-lg font-bold lg:leading-snug", (!mdc.quantity && !mdc.dosage) ? "max-w-full" : "max-w-[33.33%]")}><span className=" hidden md:inline">💊 </span>{mdc.name ? mdc.name : mdc}</span>
              {mdc.dosage && <span className="h-[2px] mt-[calc(1.75rem/2)] bg-gray-900/90 w-fit grow"/>}
              {/* {mdc.name && getMedication(mdc.name)} //TODO: add getMedication function */}
              <span className={clsx(mdc.quantity?.length > 5 ? "w-1/3" : "w-fit", "md:w-max text-md lg:text-lg lg:leading-normal")}>{mdc.quantity && mdc.quantity}</span>
            </div>

            {/* // Display medication dosage and instructions */}
            <span className="text-md max-w-xs ms-2 -translate-y-1 lg:text-lg lg:leading-relaxed">
              {mdc.dosage &&
                (typeof mdc.dosage === "string"
                  ? mdc.dosage
                  : mdc.dosage.map((dsg, index) =>
                      index === 0 ? dsg : ` | ${dsg}`
                    ))}
            </span>
            <span className="text-sm max-w-sm ms-2 lg:text-md lg:leading-relaxed">
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
            </span>
            <span>
              {mdc.alternative &&
                (Array.isArray(mdc.alternative) ? (
                  <AlternativeArr alt={mdc.alternative} />
                ) : (
                  <AlternativeObj alt={mdc.alternative} />
                ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
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
