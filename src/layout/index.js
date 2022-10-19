import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Navbar from './navbar';
import Footer from './footer';

import { routes } from './routes';

function BasicLayout(props) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Navbar />}
      <div>
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames="fade" timeout={10000}>
            <Routes location={location}>
              {routes.map((route) => {
                const { path, component: Component, routes, name } = route;
                return (
                  <Route key={name} path={path} element={<Component {...props} path={path} location={location} routes={routes} />} />
                );
              })}
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
      {!isHomePage && <Footer />}
    </>
  );
}

export default BasicLayout;
