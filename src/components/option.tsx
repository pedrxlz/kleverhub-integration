import { twMerge } from "tailwind-merge";

export type OptionType = {
  name: string;
  icon: string;
};

interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  option: OptionType;
  className?: string;
}

const Option: React.FC<OptionProps> = ({
  option,
  className,
  ...props
}: OptionProps) => (
  <div className={twMerge("flex items-center", className)} {...props}>
    {option.icon && (
      <img
        src={`/${option.icon}`}
        alt={`${option.name} icon`}
        className="mr-2 w-5 h-5 rounded-full"
      />
    )}
    <span>{option.name}</span>
  </div>
);

export default Option;
