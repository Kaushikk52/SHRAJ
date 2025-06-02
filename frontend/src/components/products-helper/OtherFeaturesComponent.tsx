import { OvenOtherFeaturesType } from "@/constants/constant";
import { ScrollArea } from "../ui/scroll-area";

type otherFeaturesType = {
  otherFeatures: OvenOtherFeaturesType;
};

export default function OtherFeaturesComponent({
  otherFeatures,
}: otherFeaturesType) {
  return (
    <ScrollArea className="h-[40vh]">
      <div className="flex flex-col gap-10">
        {Object.entries(otherFeatures).map(([key, featureBlock]) => (
          <div key={key} className="flex flex-col gap-5">
            <h1 className="font-semibold text-xl">{featureBlock.title}</h1>

            {featureBlock.description && (
              <p className="text-sm text-slate-700">
                {featureBlock.description}
              </p>
            )}

            {featureBlock.features && featureBlock.features.length > 0 && (
              <div className="flex flex-col gap-2">
                {featureBlock.features.map((feature, index) => (
                  <div className="flex items-start gap-2" key={index}>
                    <span>•</span>
                    <p className="text-sm w-[70%] text-slate-700">{feature}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
