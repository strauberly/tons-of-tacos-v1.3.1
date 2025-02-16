import classes from "@/components/menu/menu-items/size-selector/size-selector.module.css";
import SizeButton from "@/components/ui/buttons/radio-buttons/size-button";

export default function SizeSelector(props: {
  sizes: string[];
  sizeAvailable: boolean;
}) {
  return (
    <section
      className={`${classes.selectorGroup} ${
        props.sizeAvailable === false ? classes.notShowing : " "
      }`}
    >
      {props.sizes.map((size: string) => (
        <SizeButton key={size} size={size} />
      ))}
    </section>
  );
}
