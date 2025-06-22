"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaSortDown, FaUser } from "react-icons/fa";
import "./UserProfileCard.css";

function UserProfileCard() {
  const router = useRouter();

  return (
    <div className="user-profile-body">
      <FaUser/>
      <div className="user-profile-content">
        <div className="user-profile-name">Moisés Fernández Muiña</div>
        <div className="user-profile-role">Administrador</div>
      </div>
      <FaSortDown
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/mi-cuenta")}
      />
    </div>
  );
}

export default UserProfileCard;
