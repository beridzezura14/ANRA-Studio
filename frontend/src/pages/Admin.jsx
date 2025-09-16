import { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import HeroForm from "../components/HeroForm";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="pt-40">
      {!isLoggedIn ? (
        <AdminLogin onSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <HeroForm />
      )}
    </div>
  );
}
