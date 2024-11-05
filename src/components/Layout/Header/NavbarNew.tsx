import NavbarBrandLogo from "@/components/Layout/Header/ui/navbar-brand-logo";
import { Suspense } from "react";
import Navbaroptions from "@/components/Layout/Header/ui/navbaroptions";

const NavbarNew = () => {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Suspense>
            <NavbarBrandLogo />
          </Suspense>
          <Suspense>
            <Navbaroptions />
          </Suspense>
        </div>
      </nav>
    </div>
  );
};
export default NavbarNew;
