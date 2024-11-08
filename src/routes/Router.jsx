import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";
import OfficialPage from "../Pages/OfficialPage";
import OnlyOfficialOrSecondary from "../components/onlyOfficialOrSecondary";
import NotAllowed from "../Pages/NotAllowed";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [{
            path: "/",
            element: <App />
        }, {
            path: "/admin",
            element: <OnlyOfficialOrSecondary><OfficialPage /></OnlyOfficialOrSecondary>
        }, {
            path: "/notallow",
            element: <NotAllowed />
        }]
    },
]);

export default router;