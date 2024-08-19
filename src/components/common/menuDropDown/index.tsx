import React, { useState } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { AvatarDropdownProps } from "../../../utilities/interfacesOrtype";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import "./menuDropDown.css";
import { IsAuthenticated } from "../../../Authentication/useAuth";

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  username,
  dropDown,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch(); // for Dispatch redux functions.
  const navigate = useNavigate();
  const [{ accessOfMasters }] = IsAuthenticated();

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  const handleRouting = (path: string) => {
    navigate(path);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="app" onClick={toggleDropdown}>
      <div className="avatar" onClick={toggleDropdown}>
        <span className="avatarText">{"Menu"}</span>
      </div>
      {dropdownOpen && (
        <div className="dropdown-content">
          {accessOfMasters[0]?.Department !== "Education" && (
            dropDown.map((obj, i) => (
              <>
                <a key={i+1} onClick={() => handleRouting(String(obj.routePath))}>
                  {obj.routeName}
                </a>
              </>
            ))
          )}
          <a onClick={handleLogout}>Log Out</a>
        </div>
      )}
    </div>
  );
};
