import { assets } from "@/data/assets";

export function MenuBackground() {
  return (
    <>
      <div
        className="menu-bg pointer-events-none absolute inset-[-12px] hidden md:block"
        style={{
          backgroundImage: `url('${assets.menuBackground}')`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div
        className="menu-bg-mobile pointer-events-none absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url('${assets.mobileMenuBackground}')`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </>
  );
}
