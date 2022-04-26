import { useContext, useState } from "react";
import s from "./app.module.scss";
import { DrawingContext } from "./context/drawing-context";
import ExportModal from "./components/export-modal";
import CreateModal from "./components/create-modal";
import { OPERATE_TYPE } from "./constants";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import Gallery from "./views/gallery";

const App = () => {
    const { operate } = useContext(DrawingContext);

    return (
        <div className={s.app}>
            <div className={s.header}>
                <Link className={s.headerLogo} to="/">
                </Link>
                <div className={s.headerRight}>
                    <Link to="/gallery">Gallery</Link>
                </div>
            </div>
            <div className={s.body}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                </Routes>
            </div>
            {operate === OPERATE_TYPE.EXPORT && <ExportModal />}
            {operate === OPERATE_TYPE.NEW && <CreateModal />}
        </div>
    );
};

export default App;
