interface DescriptionProps {
  overallDescription: string;
  mainFeatures: string[];
}

export default function DescriptionComponent({
  mainFeatures,
  overallDescription,
}: DescriptionProps) {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-sm text-slate-700">{overallDescription}</p>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-xl">Main Features</h1>
        <div className="flex flex-col gap-2">
          {mainFeatures.map((feature) => (
            <div className="flex items-center gap-2" key={feature}>
              <span>•</span>{" "}
              <p className="text-sm w-[70%] text-slate-700">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
