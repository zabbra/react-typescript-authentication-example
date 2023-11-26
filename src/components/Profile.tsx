import React from "react";
import AuthService from "../services/auth.service";

import profile from "../assets/admin/img/profile-img.jpg";

const Profile: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
              <img src={profile} alt="Profile" className="rounded-circle" />
              <h2>
                <strong>{currentUser.username}</strong> Profile
              </h2>
              <h3>Web Designer</h3>
              
              <div className="col-lg-12">
                <p>
                  <strong>Token:</strong>{" "}
                  {currentUser.accessToken.substring(0, 20)}..{" "}
                  {currentUser.accessToken.substr(
                    currentUser.accessToken.length - 20
                  )}
                </p>
              </div>

              <div className="col-lg-12">
                <p>
                  <strong>Id:</strong> {currentUser.id}
                </p>
              </div>

              <div className="col-lg-12">
                <strong>Authorities:</strong>
                <ul>
                  {currentUser.roles &&
                    currentUser.roles.map((role: string, index: number) => (
                      <li key={index}>{role}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
