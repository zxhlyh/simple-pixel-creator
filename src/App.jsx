import s from "./app.module.scss";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./views/home";
import Gallery from "./views/gallery";
import DrawingContextProvider from './context/drawing-context';
import Feature from "./views/feature";

const routes = [
    {
        path: '/',
        name: 'Home',
        element: (
            <DrawingContextProvider>
                <Home />
            </DrawingContextProvider>
        ),
    },
    {
        path: '/gallery',
        name: 'Gallery',
        element: <Gallery />,
    },
    {
        path: '/feature',
        name: 'Feature',
        element: <Feature />,
    }
]

const App = () => {

    return (
        <div className={s.app}>
            <div className={s.header}>
                <div className={s.headerLogo}>SimplePixelCreator</div>
                <div className={s.headerRight}>
                    {
                        routes.map(route => (
                            <NavLink 
                                key={route.path}
                                className={({ isActive }) => isActive ? s.active : ''}
                                to={route.path}
                            >
                                {route.name}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <div className={s.body}>
                <Routes>
                    {
                        routes.map(route => (
                            <Route 
                                key={route.path}
                                path={route.path} 
                                element={route.element} />
                        ))
                    }
                </Routes>
            </div>
        </div>
    );
};

export default App;
