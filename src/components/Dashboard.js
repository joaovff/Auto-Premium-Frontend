import React from "react";

function Dashboard() {
  return (
    <div>
      <div className="container-dashboard">
        <nav className="navbar-dashboard">
          <div className="nav_icon" onclick="toggleSidebar()">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div className="navbar__right"></div>
        </nav>

        <main>
          <div className="main__container">
            <div className="main__title">
              <img src="/images/hello.svg" alt="" />
              <div className="main__greeting">
                <h1>Hello username!</h1>
                <p>Welcome to your management dashboard!</p>
              </div>
            </div>
            <div className="main__cards"></div>
          </div>
        </main>

        <div id="sidebar">
          <div className="sidebar__title">
            <div className="sidebar__img">
              <p>image</p>
              <h1>username</h1>
            </div>
            <i
              onclick="closeSidebar()"
              className="fa fa-times"
              id="sidebarIcon"
              aria-hidden="true"
            ></i>
          </div>

          <div className="sidebar__menu">
            <div className="sidebar__link active_menu_link">
              <i className="fa fa-home"></i>
            </div>
            <hr style="color: white;" />
            <h2>
              <a href="/manager" style="text-decoration: none; color: white">
                Management Area
              </a>
            </h2>
            <div className="sidebar-link">
              <i className="fa fa-user-secret" aria-hidden="true"></i>
              <a href="/manager/ratings-average">Ratings Average</a>
            </div>
            <div className="sidebar-link">
              <i className="fa fa-building-o"></i>
              <a href="/manager/create">Create a dish</a>
            </div>
            <div className="sidebar-link">
              <i className="fa fa-wrench"></i>
              <a href="/manager/edit">Edit a dish</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
