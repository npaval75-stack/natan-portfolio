import { assets } from "@/data/assets";

export function MenuBackground() {
  return (
    <div
      className="menu-bg pointer-events-none absolute inset-[-12px]"
      style={{
        backgroundImage: `url('${assets.menuBackground}')`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  );
}
