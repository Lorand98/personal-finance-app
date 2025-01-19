import { SelectContent, SelectItem } from "@/components/ui/select";
import { THEMES } from "@/lib/constants";

interface ThemeSelectContentProps {
  availableColors: string[];
}

export default function ThemeSelectContent({ availableColors }: ThemeSelectContentProps) {
  return (
    <SelectContent>
      {Array.from(THEMES.entries())
        .sort(([colorA], [colorB]) => {
          const inColorsA = availableColors.includes(colorA);
          const inColorsB = availableColors.includes(colorB);
          return inColorsA === inColorsB ? 0 : inColorsA ? -1 : 1;
        })
        .map(([color, label]) => {
          const isDisabled = !availableColors.includes(color);
          return (
            <SelectItem key={color} value={color} disabled={isDisabled}>
              <div className="flex items-center gap-2 w-full">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="flex-1">{label ?? color}</span>
                {isDisabled && (
                  <span className="text-sm text-grey-500">Already Used</span>
                )}
              </div>
            </SelectItem>
          );
        })}
    </SelectContent>
  );
}