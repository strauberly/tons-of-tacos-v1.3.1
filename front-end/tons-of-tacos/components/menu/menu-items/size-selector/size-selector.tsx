import RadioButton from "@/components/ui/buttons/radio-buttons/radio-button";
import classes from "@/components/menu/menu-items/size-selector/size-selector.module.css";

export default function SizeSelector(props: {
  sizes: string[];
  sizeSetter: (selectedSize: string) => void;
  sizeAvailable: boolean;
}) {
  return (
    <section
      className={`${classes.selectorGroup} ${
        props.sizeAvailable === false ? classes.notShowing : " "
      }`}
    >
      {props.sizes.map((size: string) => (
        <RadioButton key={size} size={size} sizeSetter={props.sizeSetter} />
      ))}
    </section>
  );
}
